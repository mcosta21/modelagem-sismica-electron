
function calcular(){
    let distancia = document.getElementById("distancia").value
    if(distancia.length == 0){
        return
    }
    let altura = document.getElementById("altura").value
    if(altura.length == 0){
        return
    }
    let v = document.getElementById("v").value
    if(v.length == 0){
        return
    }
    let tempo = Math.sqrt(Math.pow(Number.parseFloat(altura), 2) + (Math.pow(Number.parseFloat(distancia), 2) / 4)) / Number.parseFloat(v)
    resultado.innerHTML = tempo
}

