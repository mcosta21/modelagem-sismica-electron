
function mostrarCadastro(){
    let cadastro = document.getElementById("cadastro")
    cadastro.classList.remove("hidden")
    cadastro.classList.add("show")
  }

function ocultarCadastro(){
    let cadastro = document.getElementById("cadastro")
    cadastro.classList.remove("show")
    cadastro.classList.add("hidden")
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
                animation: {
                    duration: 300 * 1.5,
                    easing: 'linear'
                  },
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

async function voltarParaCadastro(){
    const dialogAlert = {title: "Erro", type: 'question', buttons: ['Confirmar', 'Cancelar'], message: "Tem certeza de que deseja voltar?"}
    let response = await dialog.showMessageBox(dialogAlert).then(function(value){
      return value.response
    })
    if(response == 1){
      //0 - confirmar e 1 - cancelar
      return
    } 
    mostrarCadastro()
    ocultarGrafico()
}

function limparListas(){
    arrayPontos = []
    let lista = document.getElementById("listaPontos")
    lista.innerHTML = ''
    let painelTotais = document.getElementById("panelResultTotals")
    painelTotais.innerHTML = ''
    myChart.data.labels = []
    myChart.data.datasets = []
    window.myChart.update()
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
    
    let painelTotais = document.getElementById("panelResultTotals")
    painelTotais.innerHTML = ''

    let material = document.getElementById("material").value = '' 
    let slider = document.getElementById("myRange");
    slider.min = '';
    slider.max = '';
    slider.value = '';
    let valueRange = document.getElementById("valueRange");  
    valueRange.innerHTML = '';
    let pointFones = document.getElementById("pointFones").value = ''
    let distancia = document.getElementById("distancia").value = ''
    let alturaInicial = document.getElementById("altura").value = ''
    let angulo = document.getElementById("angulo").value = ''
    myChart.data.labels = []
    myChart.data.datasets = []
    window.myChart.update()
}

function backAllProcess(){
    myChart.data.datasets = []
    window.myChart.update()
  }
  
  function backOneProcess(){
    myChart.data.datasets.pop()
    window.myChart.update()
  }
  
  function PlayAllProcess(){
    renderChart();
  }
  
  async function nextAllProcess(){
    let i = myChart.data.datasets.length-2
    while(i != arrayPontos.length){
      nextOneProcess()
      i++;
    }
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