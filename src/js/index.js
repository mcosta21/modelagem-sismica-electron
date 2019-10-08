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

    let tempo = Math.sqrt(Math.pow(Number.parseFloat(altura), 2) + (Math.pow(Number.parseFloat(distancia), 2) / 4)) / Number.parseFloat(velocidade)

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
        return 9
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
    let dataDistancia = []
	let dataAltura = []
	let newDataset
    for(i=0; i < arrayPontos.length; i++){  
        dataDistancia.push(0)    
        dataAltura.push(0)
        dataDistancia.push(arrayPontos[i].distancia / 2)
        dataAltura.push(Number(arrayPontos[i].altura)*-1)
        dataDistancia.push(arrayPontos[i].distancia)
		dataAltura.push(0)    
		
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
    return "rgba(" + (Math.random() * 256) + ", " + (Math.random() * 256) + ", " + (Math.random() * 256) + ", 0.4)"    
}

var ctx
var myChart
var myChart2
window.onload = function() {

	/*
	let newDataset = {
        label: 'Dataset ' + 1,
        data: [{x: 0, y: 0}, {x: 50, y: -30}, {x: 100, y: 0}],
		lineTension: 0,
		backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
	};

	let newDataset2 = {
        label: 'Dataset ' + 2,
        data: [{x: 0, y: 0}, {x: 70, y: -30}, {x: 120, y: 0}],
		lineTension: 0,
		backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
	};

	let newDataset3 = {
        label: 'Dataset ' + 2,
        data: [{x: 0, y: 0}, {x: 80, y: -30}, {x: 140, y: 0}],
		lineTension: 0,
		backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
	};
	*/

	myConsole.log( "Renderizando grafico.");
	ctx = document.getElementById("myChart").getContext('2d');
	myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
				datasets: []		
			  },
			  options: {
				showLines: true // disable for all datasets
			}
	});
}


//----------------------------------------


		var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var config = {
			type: 'line',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [{
					label: 'My First dataset',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor()
					],
					fill: false,
				}, {
					label: 'My Second dataset',
					fill: false,
					backgroundColor: window.chartColors.blue,
					borderColor: window.chartColors.blue,
					data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor()
					],
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Chart.js Line Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
		};

		window.onload = function() {
			var ctx = document.getElementById('canvas').getContext('2d');
			window.myLine = new Chart(ctx, config);
		};

		document.getElementById('randomizeData').addEventListener('click', function() {
			config.data.datasets.forEach(function(dataset) {
				dataset.data = dataset.data.map(function() {
					return randomScalingFactor();
				});

			});

			window.myLine.update();
		});

		var colorNames = Object.keys(window.chartColors);
		document.getElementById('addDataset').addEventListener('click', function() {
			var colorName = colorNames[config.data.datasets.length % colorNames.length];
			var newColor = window.chartColors[colorName];
			var newDataset = {
				label: 'Dataset ' + config.data.datasets.length,
				backgroundColor: newColor,
				borderColor: newColor,
				data: [],
				fill: false
			};

			for (var index = 0; index < config.data.labels.length; ++index) {
				newDataset.data.push(randomScalingFactor());
			}

			config.data.datasets.push(newDataset);
			window.myLine.update();
		});

		document.getElementById('addData').addEventListener('click', function() {
			if (config.data.datasets.length > 0) {
				var month = MONTHS[config.data.labels.length % MONTHS.length];
				config.data.labels.push(month);

				config.data.datasets.forEach(function(dataset) {
					dataset.data.push(randomScalingFactor());
				});

				window.myLine.update();
			}
		});

		document.getElementById('removeDataset').addEventListener('click', function() {
			config.data.datasets.splice(0, 1);
			window.myLine.update();
		});

		document.getElementById('removeData').addEventListener('click', function() {
			config.data.labels.splice(-1, 1); // remove the label first

			config.data.datasets.forEach(function(dataset) {
				dataset.data.pop();
			});

			window.myLine.update();
		});
