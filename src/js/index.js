var nodeConsole = require('console');
var myConsole = new nodeConsole.Console(process.stdout, process.stderr);

function calcular(){
    
    let distanciaTotal = 0
    let alturaTotal = 0
    let tempoTotal = 0
    for(i=0; i < arrayPontos.length; i++){
        distanciaTotal += Number(arrayPontos[i].distancia)
        alturaTotal += Number(arrayPontos[i].altura)
        tempoTotal += Number(arrayPontos[i].tempo)
    }
    resultado.innerHTML = "<ul> " 
                        + "<li> Distância Total: " + distanciaTotal + "cm </li>"
                        + "<li> Altura Total: " + alturaTotal + "cm </li>"
                        + "<li> Tempo Total: " + tempoTotal + "s </li>"
                        + "</div>"
    renderChart()
}

let arrayPontos = []

function adicionarPonto(){
    let distancia = document.getElementById("distancia").value
    if(distancia.length == 0){
        return
    }

    let altura = document.getElementById("altura").value
    if(altura.length == 0){
        return
    }

    let material = document.getElementById("material").value
    let velocidade = obterVelocidade(material)

    let tempo = (2 * Math.sqrt( Math.pow(Number.parseFloat(altura), 2) + (Math.pow(Number.parseFloat(distancia), 2) / 4) ) ) / Number.parseFloat(velocidade)

    let pontoJson = {
                        "sequencia": arrayPontos.length, 
                        "distancia": Number(distancia), 
                        "altura": altura, 
                        "velocidade": velocidade, 
                        "tempo": tempo
                    }

    arrayPontos.push(pontoJson)

    let ponto =   "<ul class='ponto'>" 
                + "   <li class='sequencia'> N° " + arrayPontos.length + "</li> "
                + "   <li class='separador'></li> "
                + "   <li class='linha'> Distância: <strong>" + distancia + "m</strong> </li> "
                + "   <li class='linha'> Altura: <strong>" + altura + "m</strong></li> "
                + "   <li class='linha'> Velocidade: <strong>" + velocidade + "m/s</strong></li> "
                + "   <li class='linha'> Tempo: <strong>" + tempo + "s</strong></li> "
                + "</ul>"

    let lista = document.getElementById("listaPontos")
    lista.innerHTML += ponto
    
    distancia = document.getElementById("distancia").value = ''
    altura = document.getElementById("altura").value = ''
}

function obterVelocidade(material){
    if(material == 'agua'){
        return 1500
    }
    else if(material == 'sal'){
        return 19
    }
    else{
        return null
    }
}

function limpar(){
    arrayPontos = []
    let lista = document.getElementById("listaPontos")
    lista.innerHTML = ''
    resultado.innerHTML = ''
    let distancia = document.getElementById("distancia").value = ''
	let altura = document.getElementById("altura").value = ''
	myChart.data.labels = []
	myChart.data.datasets = []
	window.myChart.update()
}


function renderChart() {
    myChart.data.datasets = []
    //let dataDistancia = []
	//let dataAltura = []
	let newDataset
    for(i=0; i < arrayPontos.length; i++){  
        //dataDistancia.push(0)    
        //dataAltura.push(0)
        //dataDistancia.push(arrayPontos[i].distancia / 2)
        //dataAltura.push(Number(arrayPontos[i].altura)*-1)
        //dataDistancia.push(arrayPontos[i].distancia)
		//dataAltura.push(0)    
		
		newDataset = {
			label: 'N' + (i+1),
			data: [{x: 0, y: 0}, {x: (arrayPontos[i].distancia / 2), y: (Number(arrayPontos[i].altura)*-1)}, {x: arrayPontos[i].distancia, y: 0}],
			lineTension: 0,
			backgroundColor: getRandomColor(),
			borderColor: getRandomColor(),
		};
		myChart.data.datasets.push(newDataset)
		window.myChart.update()
    }       

	/*
	let newLabels = ['0', '50', '100']
	
    let newDataset = {
        label: 'Dataset ' + 1,
        data: [(0, 0), (50, -60), (100, 0)],
        lineTension: 0,
        borderColor: getRandomColor()
	};
	
	let newDataset2 = {
        label: 'Dataset ' + 2 ,
        data: [0, -60, 0],
		lineTension: 0,
		backgroundColor: getRandomColor(),
        borderColor: getRandomColor()
	};
	
	
	myChart.data.labels.push('120')
	myChart.data.datasets.push(newDataset2)
	window.myChart.update()
	*/
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

