var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
const {dialog} = require('electron').remote

let arrayPontos = []

async function gerar(){
    
    let pointFones = document.getElementById("pointFones").value
    if(pointFones.length == 0){
        const dialogAlert = {title: "Erro", type: 'info', buttons: ['OK'], message: "A quantidade de geofones não foi informada."}
        dialog.showMessageBox(dialogAlert, (i) => console.log(i))
        return
    }
    
    let distancia = document.getElementById("distancia").value/1000
    if(distancia.length == 0){
        const dialogAlert = {title: "Erro", type: 'info', buttons: ['OK'], message: "A distância total não foi informada."}
        dialog.showMessageBox(dialogAlert, (i) => console.log(i))
        return
    }
    
    let altura = document.getElementById("altura").value/1000
    if(altura.length == 0){
        const dialogAlert = {title: "Erro", type: 'info', buttons: ['OK'], message: "A altura não foi informada."}
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
    let lista = document.getElementById("listaPontos")
    let pointFone = 0
    let distanciaEntreGeofones = (Number.parseFloat(distancia)) / (Number.parseInt(pointFones))
    for(i = 0; i < Number.parseInt(pointFones); i++){
        pointFone = pointFone + distanciaEntreGeofones;
        let tempo = (2 * Math.sqrt( Math.pow((Number.parseFloat(altura)), 2) + (Math.pow(Number.parseFloat(pointFone), 2) / 4) ) ) / Number.parseFloat(velocidade)
        
        let pontoJson = {
            "sequencia": arrayPontos.length+1, 
            "pointFone": Number(pointFone), 
            "altura": altura.toFixed(3), 
            "velocidade": velocidade, 
            "tempo": tempo.toFixed(3)
        }

        arrayPontos.push(pontoJson)

        lista.innerHTML += gerarPontoNaLista(pontoJson.sequencia, pontoJson.pointFone, pontoJson.altura, pontoJson.velocidade, pontoJson.tempo);

    } 
    calcular()                
}

function gerarPontoNaLista(sequencia, pointFone, altura, velocidade, tempo) {
  let ponto =  
      "<ul class='ponto'>"
    + "   <li class='sequencia'><div class='dot'></div><strong> N° " + sequencia + " </strong></li> "
    + "   <li class='separador'></li> "
    + "   <li class='linha'> Distância: <strong>" + pointFone.toFixed(3) + " km</strong> </li> "
    + "   <li class='linha'> Altura: <strong>" + altura + " km</strong></li> "
    + "   <li class='linha'> Velocidade: <strong>" + velocidade + " km s-¹</strong></li> "
    + "   <li class='linha'> Tempo: <strong>" + tempo + " s</strong></li> "
    + "</ul>";
    return ponto
}

function calcular(){
  
    let distancia = document.getElementById("distancia").value/1000
    let selectedMaterial = document.getElementById("material")
    let texto = selectedMaterial.options[selectedMaterial.selectedIndex].text
    let velocidade = document.getElementById("myRange").value
    let panelResultTotals = document.getElementById("panelResultTotals")
    let altura = document.getElementById("altura").value/1000
    let distanciaTotal = 0
    let alturaTotal = 0
    let tempoTotal = 0
    for(i=0; i < arrayPontos.length; i++){
        distanciaTotal += Number(arrayPontos[i].pointFone)
        alturaTotal += Number(arrayPontos[i].altura)
        if(i+1 == arrayPontos.length)
          tempoTotal = Number(arrayPontos[i].tempo)
    }
    
    panelResultTotals.innerHTML = "<tr>"
                                +   "<td><h6>Material</h6></td>"
                                +   "<td><h6>" + texto + "</h6></td>"
                                + "</tr>"   
                                + "<tr>"
                                +   "<td><h6>Posição do último pointFone</h6></td>"
                                +   "<td><h6>" + distancia + " km </h6></td>"
                                + "</tr>"  
                                + "<tr>"
                                +   "<td><h6>Altura</h6></td>"
                                +   "<td><h6'>" + alturaTotal + " km </h6></td>"
                                + "</tr>"  
                                + "<tr>"
                                +   "<td><h6>Tempo do último hidrofone</h6></td>"
                                +   "<td><h6'>" + tempoTotal + " s</h6></td>"
                                + "</tr>"  
                                + "<tr>"
                                +   "<td><h6>Velocidade</h6></td>"
                                +   "<td><h6'>" + velocidade + "km s-¹ </h6></td>"
                                + "</tr>"; 
    
    //renderChart()    
    
    ocultarCadastro()
    mostrarGrafico()
}

function renderChart() {
  myChart.data.datasets = []
  createStartPoint();
	let newDataset
    for(i=0; i < arrayPontos.length; i++){  		
		newDataset = {
			label: 'N' + (i+1),
			data: [{x: 0, y: 0}, {x: (arrayPontos[i].pointFone / 2), y: (Number(arrayPontos[i].altura)*-1)}, {x: arrayPontos[i].pointFone, y: 0}],
			lineTension: 0,
			backgroundColor: getRandomColor(),
			borderColor: getRandomColor(),
		};
		myChart.data.datasets.push(newDataset)
		window.myChart.update()
    }
}

function nextOneProcess(){

  if(myChart.data.datasets.length < 1){
    myChart.data.datasets = []
    createStartPoint();
    return;
  }

  let point = myChart.data.datasets.length-1
  let newDataset = {
    label: 'N' + (point+1),
    data: [{x: 0, y: 0}, 
      {x: ((arrayPontos[point].pointFone / 2)), y: ((arrayPontos[point].altura)*-1)},  
      {x: arrayPontos[point].pointFone, y: 0}],
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
