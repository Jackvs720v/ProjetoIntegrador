document.addEventListener('DOMContentLoaded', (event) => {

    var cartaoMaquina = document.getElementById("machineCard");
    var textoStatus = document.getElementById("statusText");
    var icone = document.getElementById("icon");
    var tempoOperacaoTexto = document.getElementById("operacaoTempo");
    var resetButton = document.getElementById("resetButton");

    var tempoOperacao = parseInt(localStorage.getItem('tempoOperacao')) || 0; // Obtém o tempo salvo ou define como 0
    var operationInterval;

    function salvarTempoOperacao() {
        localStorage.setItem('tempoOperacao', tempoOperacao.toString()); // Salva o tempo de operação no armazenamento local
    }

    // Atualiza o contador da operação
    function atualizarTempoOperacao() {
        tempoOperacao++;
        salvarTempoOperacao(); // Salva o tempo atualizado no armazenamento local
        var horas = Math.floor(tempoOperacao / 3600);
        var minutos = Math.floor((tempoOperacao % 3600) / 60);
        var segundos = tempoOperacao % 60;
        tempoOperacaoTexto.textContent =
            (horas < 10 ? '0' : '') + horas + ':' +
            (minutos < 10 ? '0' : '') + minutos + ':' +
            (segundos < 10 ? '0' : '') + segundos;
    }

    // Restaura o tempo de operação salvo ao carregar a página
    function restaurarTempoOperacao() {
        var savedTime = localStorage.getItem('tempoOperacao');
        if (savedTime !== null) {
            tempoOperacao = parseInt(savedTime);
            atualizarTempoOperacao();
        }
    }

    // Chama a função para restaurar o tempo de operação ao carregar a página
    restaurarTempoOperacao();

    function alternarStatusMaquina() {
        if (textoStatus.textContent === "Máquina Desligada") {
            textoStatus.textContent = "Máquina Ligada";
            icone.className = 'bx bx-cog';
            cartaoMaquina.classList.remove("desligada");
            cartaoMaquina.classList.add("ligada");
            operationInterval = setInterval(atualizarTempoOperacao, 1000);
        } else {
            textoStatus.textContent = "Máquina Desligada";
            icone.className = 'bx bx-power-off';
            cartaoMaquina.classList.remove("ligada");
            cartaoMaquina.classList.add("desligada");
            clearInterval(operationInterval);
            salvarTempoOperacao(); // Salva o tempo final ao desligar a máquina
        }
    }

    resetButton.addEventListener('click', () => {
        tempoOperacao = 0; // Zera o contador
        tempoOperacaoTexto.textContent = '00:00:00'; // Atualiza o texto do contador
        salvarTempoOperacao(); // Salva o tempo zerado
    });

    cartaoMaquina.addEventListener('click', alternarStatusMaquina);
});
