var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
const {dialog} = require('electron').remote

let arrayPontos = []

async function gerar(){
    
    let hidrofones = document.getElementById("hidrofones").value
    if(hidrofones.length == 0){
        const dialogAlert = {title: "Erro", type: 'info', buttons: ['OK'], message: "A quantidade de hidrofones não foi informada."}
        dialog.showMessageBox(dialogAlert, (i) => console.log(i))
        return
    }
    
    let distancia = document.getElementById("distancia").value
    if(distancia.length == 0){
        const dialogAlert = {title: "Erro", type: 'info', buttons: ['OK'], message: "A distância total não foi informada."}
        dialog.showMessageBox(dialogAlert, (i) => console.log(i))
        return
    }

    let alturaInicial = document.getElementById("altura").value
    if(alturaInicial.length == 0){
        const dialogAlert = {title: "Erro", type: 'info', buttons: ['OK'], message: "O altura inicial não foi informada."}
        dialog.showMessageBox(dialogAlert, (i) => console.log(i))
        return
    }

    let angulo = document.getElementById("angulo").value
    if(angulo.length == 0){
        const dialogAlert = {title: "Erro", type: 'info', buttons: ['OK'], message: "O ângulo não foi informado."}
        dialog.showMessageBox(dialogAlert, (i) => console.log(i))
        return
    }
    
    let material = document.getElementById("material").value
    if(material == 0){
      const dialogAlert = {title: "Erro", type: 'info', buttons: ['OK'], message: "A velocidade não foi informada."}
      dialog.showMessageBox(dialogAlert, (i) => console.log(i))
      return
    }    

    let velocidade = document.getElementById("myRange").value

    if(arrayPontos != 0){
      const dialogAlert = {title: "Erro", type: 'question', buttons: ['Confirmar', 'Cancelar'], message: "Tem certeza de que deseja gerar novamente?"}
      let response = await dialog.showMessageBox(dialogAlert).then(function(value){
        return value.response
      })
      if(response == 0){
        //0 - confirmar e 1 - cancelar
        limparListas()
      } 
      else{
        return
      }     
    } 
    
    let altura = 0;
    let lista = document.getElementById("listaPontos")
    let hidrofone = 0
    let distanciaEntreHidrofones = (Number.parseFloat(distancia)) / (Number.parseInt(hidrofones))
    
    let radianos = (Math.PI/180) * Number.parseFloat(angulo);
    let tangente = Math.tan(radianos);
    let alturaMedia = 0

    for(i = 0; i < Number.parseInt(hidrofones); i++){
        hidrofone = hidrofone + distanciaEntreHidrofones
        altura = hidrofone * tangente + Number.parseFloat(alturaInicial)
        alturaMedia = ((hidrofone/2) * tangente + Number.parseFloat(alturaInicial))

        let tempo = (2 * alturaMedia / Number.parseFloat(velocidade)) * (Math.sqrt( 1 + ( ( Math.pow(hidrofone, 2) + 4 * alturaMedia * hidrofone *  Math.sin(radianos) ) / (4 * Math.pow(alturaMedia, 2)) ) )) 
        let pontoJson = {
            "sequencia": arrayPontos.length+1, 
            "hidrofone": hidrofone / 1000,
            "altura": altura.toFixed(3),
            "velocidade": velocidade, 
            "tempo": tempo.toFixed(3),
            "alturaInicial": alturaInicial,
            "alturaMedia": alturaMedia.toFixed(3)
        }
        myConsole.log()
        arrayPontos.push(pontoJson)
        lista.innerHTML += gerarPontoNaLista(pontoJson.sequencia, pontoJson.hidrofone, pontoJson.alturaMedia, pontoJson.velocidade, pontoJson.tempo)
    } 
    calcular()                
}

function gerarPontoNaLista(sequencia, hidrofone, altura, velocidade, tempo){
  let ponto =  
    "<ul class='ponto'>" 
  + "   <li class='sequencia'><div class='dot2'></div><strong> N° " + sequencia + " </strong></li> "
  + "   <li class='separador'></li> "
  + "   <li class='linha'> Hidrofone: <strong>" + hidrofone + " km</strong> </li> "
  + "   <li class='linha'> Altura: <strong>" + altura + " m</strong> </li> "
  + "   <li class='linha'> Velocidade: <strong>" + velocidade + " km s-¹</strong></li> "
  + "   <li class='linha'> Tempo: <strong>" + tempo + " s</strong></li> "
  + "</ul>"
  return ponto
}

function calcular(){
    let distancia = document.getElementById("distancia").value
    let selectedMaterial = document.getElementById("material")
    let texto = selectedMaterial.options[selectedMaterial.selectedIndex].text
    let velocidade = document.getElementById("myRange").value
    let painelTotais = document.getElementById("painelTotais")
    let angulo = document.getElementById("angulo").value
    
    let distanciaTotal = 0
    let alturaTotal = 0
    let tempoTotal = 0
    
    for(i=0; i < arrayPontos.length; i++){
        distanciaTotal += Number(arrayPontos[i].hidrofone)
        alturaTotal += Number(arrayPontos[i].alturaMedia)
        if(i+1 == arrayPontos.length)
          tempoTotal = Number(arrayPontos[i].tempo)
    }
    
    painelTotais.innerHTML = "<ul class='box_resultados'>" 
                          + "   <li><h4>Resultados</h4></li> "
                          + "   <li class='separador'></li> "
                          + "   <li class='linha'> Material: <strong>" + texto + "</strong> </li> "           
                          + "   <li class='linha'> Distância: <strong> " + distancia/1000 + " km </strong> </li> "
                          + "   <li class='linha'> Ângulo: <strong>" + angulo + "° </strong></li> "
                          + "   <li class='linha'> Altura: <strong>" + alturaTotal.toFixed(3) + " m </strong></li> "
                          + "   <li class='linha'> Tempo do último hidrofone: <strong>" + tempoTotal + " s </strong> </li> "
                          + "   <li class='linha'> Velocidade: <strong>" + velocidade + "km s-¹ </strong> </li> "
                          + "</ul>"
    
    renderChart()    
    ocultarCadastroHidrofones()
    mostrarGrafico()
}

async function limpar(){

    const dialogAlert = {title: "Erro", type: 'question', buttons: ['Confirmar', 'Cancelar'], message: "Tem certeza de que deseja limpar?"}
    let response = await dialog.showMessageBox(dialogAlert).then(function(value){
      return value.response
    })
    if(response == 1){
      //0 - confirmar e 1 - cancelar
      return
    } 
    
    arrayPontos = []
    
    let lista = document.getElementById("listaPontos")
    lista.innerHTML = ''
    
    let painelTotais = document.getElementById("painelTotais")
    painelTotais.innerHTML = ''

    let material = document.getElementById("material").value = '' 
    let slider = document.getElementById("myRange");
    slider.min = '';
    slider.max = '';
    slider.value = '';
    let valueRange = document.getElementById("valueRange");  
    valueRange.innerHTML = '';
    let hidrofones = document.getElementById("hidrofones").value = ''
    let distancia = document.getElementById("distancia").value = ''
    let alturaInicial = document.getElementById("altura").value = ''
    let angulo = document.getElementById("angulo").value = ''
    myChart.data.labels = []
    myChart.data.datasets = []
    window.myChart.update()
}

function limparListas(){
  arrayPontos = []
  let lista = document.getElementById("listaPontos")
  lista.innerHTML = ''
  let painelTotais = document.getElementById("painelTotais")
  painelTotais.innerHTML = ''
  myChart.data.labels = []
  myChart.data.datasets = []
  window.myChart.update()
}


function renderChart() {
  myChart.data.datasets = []

  let alturaInicial = document.getElementById("altura").value
  alturaInicial = Number.parseFloat(alturaInicial)
  let line = {
    label: "Linha",
    data: [{x: 0, y: alturaInicial*-1},
    {x: arrayPontos[arrayPontos.length-1].hidrofone, y: arrayPontos[arrayPontos.length-1].altura*-1}],
    lineTension: 0,
    backgroundColor: 'transparent',
    borderColor: '#007bff',
    pointRadius: 3,
    type: 'line'
  };
  myChart.data.datasets.push(line)
  window.myChart.update()
  
  let startPoint = { 
    label: 'Fonte',
    data: [ {x: 0.000000000000001, y: -0.000000000000001} ],
    backgroundColor: 'gray',
    borderColor: 'gray',
    pointBackgroundColor: this.borderColor,
    pointBorderColor: this.borderColor,
    pointBorderWidth: 8,
    pointStyle: 'rectRot',
  }
  myChart.data.datasets.push(startPoint)
  window.myChart.update()
  
  let newDataset
  for(i=0; i < arrayPontos.length; i++){  
    //myConsole.log(arrayPontos[i])
    newDataset = {
      label: 'N' + (i+1),
      data: [{x: 0, y: 0}, 
        {x: ((arrayPontos[i].hidrofone)/2), y: ((arrayPontos[i].alturaMedia)*-1)},  
        {x: arrayPontos[i].hidrofone, y: 0}],
      lineTension: 0,
      backgroundColor: getRandomColor(),
      borderColor: this.backgroundColor,
      pointBackgroundColor: this.backgroundColor,
      pointBorderColor: this.backgroundColor,
      pointBorderWidth: 4,
    };
    myChart.data.datasets.push(newDataset)
    window.myChart.update()
  }
}

async function voltarParaCadastroHidrofones(){
    const dialogAlert = {title: "Erro", type: 'question', buttons: ['Confirmar', 'Cancelar'], message: "Tem certeza de que deseja voltar?"}
    let response = await dialog.showMessageBox(dialogAlert).then(function(value){
      return value.response
    })
    if(response == 1){
      //0 - confirmar e 1 - cancelar
      return
    } 
    mostrarCadastroHidrofones()
    ocultarGrafico()
}

function mostrarCadastroHidrofones(){
  let cadastroHidrofones = document.getElementById("cadastroHidrofones")
  cadastroHidrofones.classList.remove("hidden")
  cadastroHidrofones.classList.add("show")
}

function ocultarCadastroHidrofones(){
  let cadastroHidrofones = document.getElementById("cadastroHidrofones")
  cadastroHidrofones.classList.remove("show")
  cadastroHidrofones.classList.add("hidden")
}

function mostrarGrafico(){
  let painelResultados = document.getElementById("painelResultados")
  painelResultados.classList.add("show")
}

function ocultarGrafico(){
  let painelResultados = document.getElementById("painelResultados")
  painelResultados.classList.remove("show")
}

function getRandomColor() {
    return "rgba(" + (Math.random() * 256) + ", " + (Math.random() * 256) + ", " + (Math.random() * 256) + ", 0.4)"    
}

var ctx
var myChart
window.onload = function() {
	//myConsole.log( "Renderizando grafico.");
	ctx = document.getElementById("myChart").getContext('2d');
	myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
				datasets: []		
			  },
			  options: {
        maintainAspectRatio: false,
        showLines: true,
				scales: {
					yAxes: [{
					  scaleLabel: {
						display: true,
						labelString: 'Altura',
						fontSize: 14
					  },
					}],
					xAxes: [{
					  scaleLabel: {
						display: true,
						labelString: 'Distância',
						fontSize: 14
					  }
					}],
				  },
				  title: {
						display: true,
						text: 'Modelagem',
						fontSize: 16
					}
			}
	});
}

function changeMaterial(){

  let material = document.getElementById("material").value
  var slider = document.getElementById("myRange");
  var valueRange = document.getElementById("valueRange");

  if(material == 'areiaseca'){   
      slider.min = Number.parseFloat(0.2)      
      slider.max = Number.parseFloat(1.0)
      slider.value = Number.parseFloat(0.4)
  }
  else if(material == 'areiasaturada'){   
    slider.min = Number.parseFloat(1.5)      
    slider.max = Number.parseFloat(2.0)
    slider.value = Number.parseFloat(1.7)
  }
  else if(material == 'argila'){   
    slider.min = Number.parseFloat(1.0)      
    slider.max = Number.parseFloat(2.5)
    slider.value = Number.parseFloat(1.7)
  }
  else if(material == 'tillglacial'){   
    slider.min = Number.parseFloat(1.5)      
    slider.max = Number.parseFloat(2.5)
    slider.value = Number.parseFloat(2.0)
  }
  else if(material == 'permafroste'){   
    slider.min = Number.parseFloat(3.5)      
    slider.max = Number.parseFloat(4.0)
    slider.value = Number.parseFloat(3.7)
  } 
  else if(material == 'arenitos'){   
    slider.min = Number.parseFloat(2.0)      
    slider.max = Number.parseFloat(6.0)
    slider.value = Number.parseFloat(4.0)
  }
  else if(material == 'arenitoterciario'){   
    slider.min = Number.parseFloat(2.0)      
    slider.max = Number.parseFloat(2.5)
    slider.value = Number.parseFloat(2.3)
  }
  else if(material == 'arenitopennant'){   
    slider.min = Number.parseFloat(4.0)      
    slider.max = Number.parseFloat(4.5)
    slider.value = Number.parseFloat(4.3)
  }
  else if(material == 'quartzitocambiano'){   
    slider.min = Number.parseFloat(5.5)      
    slider.max = Number.parseFloat(6.0)
    slider.value = Number.parseFloat(5.7)
  }
  else if(material == 'calcarios'){   
    slider.min = Number.parseFloat(2.0)      
    slider.max = Number.parseFloat(6.0)
    slider.value = Number.parseFloat(4.0)
  }
  else if(material == 'greda'){   
    slider.min = Number.parseFloat(2.0)      
    slider.max = Number.parseFloat(2.5)
    slider.value = Number.parseFloat(2.3)
  }
  else if(material == 'oolitos'){   
    slider.min = Number.parseFloat(3.0)      
    slider.max = Number.parseFloat(4.0)
    slider.value = Number.parseFloat(3.5)
  }
  else if(material == 'calcariocarbonifero'){   
    slider.min = Number.parseFloat(5.0)      
    slider.max = Number.parseFloat(5.5)
    slider.value = Number.parseFloat(5.3)
  }
  else if(material == 'dolomitos'){   
    slider.min = Number.parseFloat(2.5)      
    slider.max = Number.parseFloat(6.5)
    slider.value = Number.parseFloat(4.5)
  }
  else if(material == 'sal'){   
    slider.min = Number.parseFloat(4.5)      
    slider.max = Number.parseFloat(5.0)
    slider.value = Number.parseFloat(4.7)
  }
  else if(material == 'anidrita'){   
    slider.min = Number.parseFloat(4.5)      
    slider.max = Number.parseFloat(6.5)
    slider.value = Number.parseFloat(5.5)
  }
  else if(material == 'gripso'){   
    slider.min = Number.parseFloat(2.0)      
    slider.max = Number.parseFloat(3.5)
    slider.value = Number.parseFloat(2.7)
  }
  else if(material == 'granito'){   
    slider.min = Number.parseFloat(5.5)      
    slider.max = Number.parseFloat(6.0)
    slider.value = Number.parseFloat(5.7)
  }
  else if(material == 'gabro'){   
    slider.min = Number.parseFloat(6.5)      
    slider.max = Number.parseFloat(7.0)
    slider.value = Number.parseFloat(6.7)
  }
  else if(material == 'rochasultra'){   
    slider.min = Number.parseFloat(7.5)      
    slider.max = Number.parseFloat(8.5)
    slider.value = Number.parseFloat(8.0)
  }
  else if(material == 'serpentinito'){   
    slider.min = Number.parseFloat(5.5)      
    slider.max = Number.parseFloat(6.5)
    slider.value = Number.parseFloat(6.0)
  }
  else if(material == 'ar'){   
    slider.min = Number.parseFloat(0.3)      
    slider.max = Number.parseFloat(0.3)
    slider.value = Number.parseFloat(0.3)
  }
  else if(material == 'agua'){   
    slider.min = Number.parseFloat(1.4)      
    slider.max = Number.parseFloat(1.5)
    slider.value = Number.parseFloat(1.4)
  }
  else if(material == 'gelo'){   
    slider.min = Number.parseFloat(3.4)      
    slider.max = Number.parseFloat(3.4)
    slider.value = Number.parseFloat(3.4)
  }
  else if(material == 'petroleo'){   
    slider.min = Number.parseFloat(1.3)      
    slider.max = Number.parseFloat(1.4)
    slider.value = Number.parseFloat(1.3)
  }
  
  valueRange.innerHTML = slider.value;
  
  slider.oninput = function() {
    valueRange.innerHTML = this.value;
  }
}