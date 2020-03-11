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
    
    let distancia = document.getElementById("distancia").value ///1000
    if(distancia.length == 0){
        const dialogAlert = {title: "Erro", type: 'info', buttons: ['OK'], message: "A distância total não foi informada."}
        dialog.showMessageBox(dialogAlert, (i) => console.log(i))
        return
    }
    
    let altura = document.getElementById("altura").value ///1000
    if(altura.length == 0){
        const dialogAlert = {title: "Erro", type: 'info', buttons: ['OK'], message: "A altura não foi informada."}
        dialog.showMessageBox(dialogAlert, (i) => console.log(i))
        return
    }
    
    let velocidade = document.getElementById("myRange").value
    if(velocidade.length == 0){
      const dialogAlert = {title: "Erro", type: 'info', buttons: ['OK'], message: "A velocidade não foi informada."}
      dialog.showMessageBox(dialogAlert, (i) => console.log(i))
      return
    }    
    
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

    let lista = document.getElementById("listaPontos")
    let hidrofone = 0
    let distanciaEntreHidrofones = (Number.parseFloat(distancia)) / (Number.parseInt(hidrofones))
    
    let seno = 0
    let x1 = 0
    let x2 = 0
    
    for(i = 0; i < Number.parseInt(hidrofones); i++){
        hidrofone = hidrofone + distanciaEntreHidrofones
        x2 = hidrofone
        seno = (x2 - x1) / distanciaEntreHidrofones
        myConsole.log("x1: " + x1 + " | x2: " + x2 + "| D: " + distanciaEntreHidrofones + " | Seno: " + seno)

        let tempo = (2 * Math.sqrt( Math.pow((Number.parseFloat(altura)), 2) + (Math.pow(Number.parseFloat(hidrofone), 2) / 4) ) ) / Number.parseFloat(velocidade)

        let pontoJson = {
            "sequencia": arrayPontos.length+1, 
            "pontoInicial": x1,
            "pontoFinal": x2, 
            "alturaInicial": Number.parseFloat(altura),
            "alturaFinal": Number.parseFloat(altura) + Number.parseFloat(seno),
            "velocidade": velocidade, 
            "tempo": tempo
        }

        arrayPontos.push(pontoJson)
        lista.innerHTML += gerarPontoNaLista(pontoJson.sequencia, pontoJson.pontoInicial, pontoJson.pontoFinal, pontoJson.alturaInicial, pontoJson.alturaFinal, pontoJson.velocidade, pontoJson.tempo)
        x1 = x2
        altura = Number.parseFloat(altura) + Number.parseFloat(seno)
    } 
    calcular()                
}

function gerarPontoNaLista(sequencia, pontoInicial, pontoFinal, alturaInicial, alturaFinal, velocidade, tempo){
  let ponto =  "<ul class='ponto'>" 
  + "   <li class='sequencia'><div class='dot2'></div><strong> N° " + sequencia + " </strong></li> "
  + "   <li class='separador'></li> "
  + "   <li class='linha'> Ponto Inicial: <strong>" + pontoInicial + " km</strong> </li> "
  + "   <li class='linha'> Ponto Final: <strong>" + pontoFinal + " km</strong> </li> "
  + "   <li class='linha'> Altura Inicial: <strong>" + alturaInicial + " km</strong></li> "
  + "   <li class='linha'> Altura Final: <strong>" + alturaFinal + " km</strong></li> "
  + "   <li class='linha'> Velocidade: <strong>" + velocidade + " km s-¹</strong></li> "
  + "   <li class='linha'> Tempo: <strong>" + tempo + " s</strong></li> "
  + "</ul>"
  return ponto
}

function calcular(){
    let distancia = document.getElementById("distancia").value/1000
    let selectedMaterial = document.getElementById("material")
    let texto = selectedMaterial.options[selectedMaterial.selectedIndex].text
    let velocidade = document.getElementById("myRange").value
    let painelTotais = document.getElementById("painelTotais")
    let altura = document.getElementById("altura").value/1000
    let distanciaTotal = 0
    let alturaTotal = 0
    let tempoTotal = 0
    
    for(i=0; i < arrayPontos.length; i++){
        distanciaTotal += Number(arrayPontos[i].pontoFinal)
        alturaTotal += Number(arrayPontos[i].altura)
        if(i+1 == arrayPontos.length)
          tempoTotal = Number(arrayPontos[i].tempo)
    }
    
    painelTotais.innerHTML = "<ul class='box_resultados'>" 
                          + "   <li><h4>Resultados</h4></li> "
                          + "   <li class='separador'></li> "
                          //+ "   <li class='linha'> Posição do último hidrofone: <strong> " + distancia + " km </strong> </li> "
                          + "   <li class='linha'> Altura: <strong>" + altura + " km </strong></li> "
                          + "   <li class='linha'> Tempo total: <strong>" + tempoTotal + " s </strong> </li> "
                          + "   <li class='linha'> Material: <strong>" + texto + "</strong> </li> "                          
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
    let altura = document.getElementById("altura").value = ''
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
  let newDataset
  let resto = 0
    for(i=0; i < arrayPontos.length; i++){  
      myConsole.log(arrayPontos[i])
      newDataset = {
        label: 'N' + (i+1),
        data: [{x: (arrayPontos[i].pontoInicial), y: 0}, 
              {x: ((arrayPontos[i].pontoFinal)/2 + resto), y: ((arrayPontos[i].alturaFinal/2)*-1)},  
              {x: arrayPontos[i].pontoFinal, y: 0}],
        lineTension: 0,
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
      };
      resto = (arrayPontos[i].pontoFinal/2)
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
    return "rgba(" + (Math.random() * 256) + ", " + (Math.random() * 256) + ", " + (Math.random() * 256) + ", 0.2)"    
}

var ctx
var myChart
window.onload = function() {
	myConsole.log( "Renderizando grafico.");
	ctx = document.getElementById("myChart").getContext('2d');
	myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
				datasets: []		
			  },
			  options: {
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
						text: 'PLOTAGEM',
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