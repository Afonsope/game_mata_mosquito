// Variaveis globais
var altura = 0
var largura = 0
var vidas = 1
var tempo = 60

var criaMosquitoTempo = 1500 // 1,5s

// Recebe atributo do nivel pela URL
var nivel = window.location.search
 nivel = nivel.replace('?', '')

 // Dificuldade/tempo dos mosquitos
if(nivel === 'normal') {
    criaMosquistoTempo = 1500
}

else if(nivel === 'dificil') {
    criaMosquistoTempo = 1000
}

else if(nivel === 'chucknorris') {
    criaMosquistoTempo = 750
}

// Essa parte do codigo vai verificar o tamanho da tela
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {
    tempo -= 1

    if(tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href="wins.html"
    }

    else {
        document.getElementById('cronometro').innerHTML = tempo
    }
},1000)

function posicaoRandomica() {

    // remove o mosquito anterior caso exista
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if(vidas > 3) {
            window.location.href = 'game_over.html'
        }

        else {
        document.getElementById('vida' + vidas).src="./img/coracao_vazio.png"
        }

        vidas++
    }

    // Mosquito spawn aleatorio
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    // diminuindo probabilidades de cordenadas negativas
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    // Criar o elemento HTML
    var mosquito = document.createElement('img')
    mosquito.src = 'img/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.marginTop = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        this.remove()
    }

    document.body.appendChild(mosquito)
}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch(classe) {
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

// Mosquito voltado para direita ou esquerda
function ladoAleatorio() {
    var lado = Math.floor(Math.random() * 2)

    switch(lado) {
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'
    }
}