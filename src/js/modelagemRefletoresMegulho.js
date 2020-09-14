var nodeConsole = require('console');
const { finished } = require('stream');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);
const {dialog} = require('electron').remote

let arrayPontos = []

async function gerar(){
    
    let pointFones = document.getElementById("pointFones").value
    if(pointFones.length == 0){
        const dialogAlert = {title: "Erro", type: 'info', buttons: ['OK'], message: "A quantidade de hidrofones não foi informada."}
        dialog.showMessageBox(dialogAlert, (i) => console.log(i))
        return
    }
    pointFones = Number.parseInt(pointFones)

    let distancia = document.getElementById("distancia").value
    if(distancia.length == 0){
        const dialogAlert = {title: "Erro", type: 'info', buttons: ['OK'], message: "A distância total não foi informada."}
        dialog.showMessageBox(dialogAlert, (i) => console.log(i))
        return
    }
    distancia = Number.parseFloat(distancia) / 1000

    let alturaInicial = document.getElementById("altura").value
    if(alturaInicial.length == 0){
        const dialogAlert = {title: "Erro", type: 'info', buttons: ['OK'], message: "O altura inicial não foi informada."}
        dialog.showMessageBox(dialogAlert, (i) => console.log(i))
        return
    }
    alturaInicial = Number.parseFloat(alturaInicial) / 1000

    let angulo = document.getElementById("angulo").value
    if(angulo.length == 0){
        const dialogAlert = {title: "Erro", type: 'info', buttons: ['OK'], message: "O ângulo não foi informado."}
        dialog.showMessageBox(dialogAlert, (i) => console.log(i))
        return
    }
    angulo = Number.parseFloat(angulo)

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
    velocidade = Number.parseFloat(velocidade)

    let altura = 0;
    let lista = document.getElementById("listaPontos")
    let pointFone = 0
    let distanciaEntreHidrofones = distancia / pointFones
    
    let radianos = (Math.PI/180) * angulo;
    let tangente = Math.tan(radianos);

    for(i = 0; i < pointFones; i++){
        pointFone = pointFone + distanciaEntreHidrofones
        altura = pointFone * tangente + alturaInicial
        
        let valueX = calculePointFone(pointFone, alturaInicial, altura, tangente, angulo);
        //myConsole.log(valueX)
        let tempo = (2 * altura / velocidade) * (Math.sqrt( 1 + ( ( Math.pow(pointFone, 2) + 4 * altura * pointFone *  Math.sin(radianos) ) / (4 * Math.pow(altura, 2)) ) )) 
        
        let pontoJson = {
            "sequencia": arrayPontos.length+1, 
            "pointFone": pointFone,
            "altura": altura,
            "velocidade": velocidade, 
            "tempo": tempo.toFixed(3),
            "alturaInicial": alturaInicial,
            "valueX": valueX
        }
        
        arrayPontos.push(pontoJson)
        lista.innerHTML += gerarPontoNaLista(pontoJson.sequencia, pontoJson.pointFone, pontoJson.altura, pontoJson.velocidade, pontoJson.tempo)
    } 
    calcular()                
}

function gerarPontoNaLista(sequencia, pointFone, altura, velocidade, tempo){
  let ponto =  
    "<ul class='ponto'>" 
  + "   <li class='sequencia'><div class='dot'></div><strong> N° " + sequencia + " </strong></li> "
  + "   <li class='separador'></li> "
  + "   <li class='linha'> Hidrofone: <strong>" + pointFone + " km</strong> </li> "
  + "   <li class='linha'> Altura: <strong>" + altura.toFixed(5) + " km</strong> </li> "
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
    let panelResultTotals = document.getElementById("panelResultTotals")
    let angulo = document.getElementById("angulo").value
    
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
                                +   "<td><h6>Distância</h6></td>"
                                +   "<td><h6'>" + distancia/1000 + " km</h6></td>"
                                + "</tr>"  
                                + "<tr>"
                                +   "<td><h6>Ângulo</h6></td>"
                                +   "<td><h6'>" + angulo + "°</h6></td>"
                                + "</tr>"  
                                + "<tr>"
                                +   "<td><h6>Altura</h6></td>"
                                +   "<td><h6'>" + alturaTotal.toFixed(3) + " m</h6></td>"
                                + "</tr>"  
                                + "<tr>"
                                +   "<td><h6>Tempo do último pointFone</h6></td>"
                                +   "<td><h6'>" + tempoTotal + " s</h6></td>"
                                + "</tr>"  
                                + "<tr>"
                                +   "<td><h6>Velocidade</h6></td>"
                                +   "<td><h6'>" + velocidade + "km s-¹ </h6></td>"
                                + "</tr>"  
 
    //renderChart()    
    ocultarCadastro()
    mostrarGrafico()
}

function renderChart() {
  myChart.data.datasets = []
  let alturaInicial = document.getElementById("altura").value
  alturaInicial = Number.parseFloat(alturaInicial) / 1000
 
  createStartPoint();
  createLine();
  
  let newDataset
  for(i=0; i < arrayPontos.length; i++){  
    newDataset = {
      label: 'N' + (i+1),
      data: [{x: 0, y: 0}, 
        {x: ((arrayPontos[i].valueX.x)), y: ((arrayPontos[i].valueX.y)*-1)},  
        {x: arrayPontos[i].pointFone, y: 0}],
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

function createLine(){
  let alturaInicial = document.getElementById("altura").value
  alturaInicial = Number.parseFloat(alturaInicial) / 1000
  let line = {
    label: "Linha",
    data: [{x: 0, y: alturaInicial*-1},
    {x: arrayPontos[arrayPontos.length-1].pointFone, y: arrayPontos[arrayPontos.length-1].altura*-1}],
    lineTension: 0,
    backgroundColor: 'transparent',
    borderColor: '#007bff',
    pointRadius: 3,
    type: 'line'
  };
  myChart.data.datasets.push(line)
  window.myChart.update()
}

function nextOneProcess(){

  if(myChart.data.datasets.length < 2){
    myChart.data.datasets = []
    createStartPoint();
    createLine();
    return;
  }

  let point = myChart.data.datasets.length-2
  let newDataset = {
    label: 'N' + (point+1),
    data: [{x: 0, y: 0}, 
      {x: ((arrayPontos[point].valueX.x)), y: ((arrayPontos[point].valueX.y)*-1)},  
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

function calculePointFone(pointX, alturaInicial, altura, tangente, angle){
  let finished = false;
  let angleFirstPart = 0;
  let angleSecondPart = 0;
  let counter = 0;
  let point = pointX;
  let valueX = 0;
  let oldAngleFirst = 0;
  let oldAngleSecond = 0;
  do{
    
    if(angle == 0){
      valueX = {
        "x": pointX / 2,
        "y": altura
      }
      finished = true;
    }

    let x1 = point / 2;
    let y1 = x1 * tangente + alturaInicial
    angleFirstPart = Math.atan( y1 / x1 ) * (180/Math.PI) - angle;

    let x2 = pointX - x1;
    let y2 = x2 * tangente + alturaInicial;
    angleSecondPart = Math.atan( y2 / x2 ) * (180/Math.PI) + angle;

    let rest = (angleSecondPart) - (angleFirstPart);
    /*
    myConsole.log("X1: " + x1, angleFirstPart)
    myConsole.log("X2: " + x2, angleSecondPart);
    myConsole.log(rest);
    myConsole.log("")
    */
    if(rest < 0){
      valueX = {
        "x": x1,
        "y": y1
      }
      finished = true;
    }

    if(angleFirstPart === oldAngleFirst && angleSecondPart === oldAngleSecond){
      valueX = {
        "x": x1,
        "y": y1
      }
      finished = true;
    }

    if(rest > 0 && rest <= 3.8){
      valueX = {
                  "x": x1,
                  "y": y1
                }
      finished = true;
    }

    point = x1;   
    oldAngleFirst = angleFirstPart;
    oldAngleSecond = angleSecondPart;
  }
  while(!finished);
  return valueX;
}

