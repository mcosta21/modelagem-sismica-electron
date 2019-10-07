

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
}


function renderChart() {
    
    let dataDistancia = []
    let dataAltura = []
    for(i=0; i < arrayPontos.length; i++){
        dataDistancia.push(Number(arrayPontos[i].distancia))
        dataAltura.push(Number(arrayPontos[i].altura))
    }
    let data = [100, -1];
    let labels =  ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataDistancia,
            datasets: [{
                label: 'Distância',
                data: dataAltura
            }]
        },
    });
}
