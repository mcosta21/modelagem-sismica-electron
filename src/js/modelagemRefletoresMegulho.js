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
    hidrofones = Number.parseInt(hidrofones)

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
    let hidrofone = 0
    let distanciaEntreHidrofones = distancia / hidrofones
    
    let radianos = (Math.PI/180) * angulo;
    let tangente = Math.tan(radianos);
    let alturaMedia = 0

    for(i = 0; i < hidrofones; i++){
        hidrofone = hidrofone + distanciaEntreHidrofones
        altura = hidrofone * tangente + alturaInicial
        
        let point = hidrofone / 2
        myConsole.log(hidrofone + " - " + point)

        alturaMedia = (hidrofone/2) * tangente + alturaInicial
        let tempo = (2 * alturaMedia / velocidade) * (Math.sqrt( 1 + ( ( Math.pow(hidrofone, 2) + 4 * alturaMedia * hidrofone *  Math.sin(radianos) ) / (4 * Math.pow(alturaMedia, 2)) ) )) 
        
        let pontoJson = {
            "sequencia": arrayPontos.length+1, 
            "hidrofone": hidrofone,
            "altura": altura,
            "velocidade": velocidade, 
            "tempo": tempo.toFixed(3),
            "alturaInicial": alturaInicial,
            "alturaMedia": alturaMedia.toFixed(3)
        }
        
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
    let panelResultTotals = document.getElementById("panelResultTotals")
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
                                +   "<td><h6>Tempo do último hidrofone</h6></td>"
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
        {x: ((arrayPontos[i].hidrofone)), y: ((arrayPontos[i].altura)*-1)},  
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



function createLine(){
  let alturaInicial = document.getElementById("altura").value
  alturaInicial = Number.parseFloat(alturaInicial) / 1000
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
}

function createStartPoint(){
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
}

function findPerfectAngle(){
  let hidrofones = document.getElementById("hidrofones").value
  let distancia = document.getElementById("distancia").value
  let alturaInicial = document.getElementById("altura").value
  let angulo = document.getElementById("angulo").value

  let hidrofone = 0
  let distanciaEntreHidrofones = (Number.parseFloat(distancia)) / (Number.parseInt(hidrofones))
    
  let radianos = (Math.PI/180) * Number.parseFloat(angulo);
  let tangente = Math.tan(radianos);
  let alturaMedia = 0
  for(i = 0; i < Number.parseInt(hidrofones); i++){
      hidrofone = hidrofone + distanciaEntreHidrofones
      altura = hidrofone * tangente + Number.parseFloat(alturaInicial)
      //myConsole.log(altura + "+++++++")
      for(j = 0; j <= hidrofone; j=j+1/1000){
        let anguloAlturaInicial = 180/Math.PI*Math.tan((alturaInicial/1000) / (j/1000))
        let anguloAlturaFinal = 180/Math.PI*Math.tan((altura/1000) / (j/1000))
        
        if(anguloAlturaInicial < 0)
          anguloAlturaInicial = anguloAlturaInicial*-1

        if(anguloAlturaFinal < 0)
          anguloAlturaFinal = anguloAlturaFinal*-1
        
        let resto = anguloAlturaInicial.toFixed(2) - anguloAlturaFinal.toFixed(2) 
        /*
        if(j < 2.5){
            myConsole.log(j + " = " + anguloAlturaInicial.toFixed(2) + " = " + anguloAlturaFinal.toFixed(2) + "++++++++++=")
            myConsole.log("resto = " + resto)
        }
        */
        let mediaX = 0
        if(j > 0.1 && anguloAlturaInicial.toFixed(1) == anguloAlturaFinal.toFixed(1) && (resto < 0.5)){
         // myConsole.log("YESSSSSSSSSSSSSSSSSS")
         // myConsole.log(anguloAlturaInicial.toFixed(3) + " = " + anguloAlturaFinal.toFixed(3) + "----------------")
          mediaX = ((anguloAlturaInicial + anguloAlturaFinal) / 2).toFixed(3)
          myConsole.log(j + " = " + mediaX)
          break
        }
        //myConsole.log(j/1000 + " - " + (alturaInicial) + " - " + 180/Math.PI*Math.tan(((alturaInicial/1000) / (j/1000))));
      }
      /*
      myConsole.log("------------------------------------------------")
      for(j = 0; j <= hidrofone; j=){
        myConsole.log(j/1000 + " - " + (altura) + " - " + 180/Math.PI*Math.tan(((altura/1000) / (j/1000))));
      }
      */
  }

}

function getPointX(hidrofone, altura, alturaInicial){

      for(j = 0; j <= hidrofone; j=j+1/1000){
        myConsole.log("running")
        let anguloAlturaInicial = 180/Math.PI*Math.tan((alturaInicial/1000) / (j/1000))
        let anguloAlturaFinal = 180/Math.PI*Math.tan((altura/1000) / (j/1000))
        
        if(anguloAlturaInicial < 0)
          anguloAlturaInicial = anguloAlturaInicial*-1

        if(anguloAlturaFinal < 0)
          anguloAlturaFinal = anguloAlturaFinal*-1
        
        let resto = anguloAlturaInicial.toFixed(2) - anguloAlturaFinal.toFixed(2) 
        let anguloX = 0
        let pointX = 0
        if(j > 0.1 && anguloAlturaInicial.toFixed(1) == anguloAlturaFinal.toFixed(1) && (resto < 0.5)){
         // myConsole.log("YESSSSSSSSSSSSSSSSSS")
         // myConsole.log(anguloAlturaInicial.toFixed(3) + " = " + anguloAlturaFinal.toFixed(3) + "----------------")
          anguloX = ((anguloAlturaInicial + anguloAlturaFinal) / 2).toFixed(3)
          pointX = j
          myConsole.log(j + " = " + anguloX)
          return {
            'anguloX': anguloX,
            'pointX': pointX
          }
        }
        
  }
}


