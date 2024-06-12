document.addEventListener('DOMContentLoaded', (event) => {

    var cartaoMaquina = document.getElementById("machineCard");
    var textoStatus = document.getElementById("statusText");
    var icone = document.getElementById("icon");
    var tempoOperacaoTexto = document.getElementById("operacaoTempo");
    var resetButton = document.getElementById("resetButton");

    var tempoOperacao = parseInt(localStorage.getItem('tempoOperacao')) || 0;
    var operationInterval;

    // Gráfico de Área
    var ctx1 = document.getElementById('areaChart').getContext('2d');
    var areaChart = new Chart(ctx1, {
        type: 'pie',
        data: {
            labels: ['Lote 1', 'Lote 2', 'Lote 3'],
            datasets: [{
                label: 'Quantidade de Peça',
                data: [65, 59, 80],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)', // Melhorando a cor de destaque
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true, // Ajuste adequado para manter a proporção
            plugins: {
                legend: {
                    position: 'top' // Colocando a legenda no topo para melhor visualização
                },
                tooltip: {
                    backgroundColor: '#000', // Cor de fundo do tooltip
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#333',
                    borderWidth: 1
                }
            }
        }
    });

    // Gráfico de Barras
    var ctx2 = document.getElementById('chartBar').getContext('2d');
    var chartBar = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Pequena', 'Média', 'Grande'],
            datasets: [{
                label: 'Quantidade de Peças',
                data: [31, 8, 5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', // Melhorando a cor de destaque
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true, // Ajuste adequado para manter a proporção
            plugins: {
                legend: {
                    position: 'top' // Colocando a legenda no topo para melhor visualização
                },
                tooltip: {
                    backgroundColor: '#000', // Cor de fundo do tooltip
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#333',
                    borderWidth: 1
                }
            }
        }
    });

    // Função para calcular o total de peças
    function calcularTotalPecas(data) {
        return data.reduce((total, num) => total + num, 0);
    }

    // Função para atualizar o card com o total de peças
    function atualizarTotalPecas(total) {
        document.getElementById('totalPecas').innerText = total;
    }

    // Calcular e atualizar o total de peças inicialmente
    const totalPecas = calcularTotalPecas(chartBar.data.datasets[0].data);
    atualizarTotalPecas(totalPecas);

    // Monitorar mudanças nos dados do gráfico e atualizar o card
    chartBar.update();

    function calcularTotalLote(data) {
        return data.reduce((total, num) => total + num, 0);
    }

    // Função para atualizar o card com o total de peças
    function atualizarTotalLotes(total) {
        document.getElementById('lotesTotais').innerText = total;
    }

    // Calcular e atualizar o total de peças inicialmente
    const totalLotes = calcularTotalLote(areaChart.data.datasets[0].data);
    atualizarTotalLotes(totalLotes);

    // Monitorar mudanças nos dados do gráfico e atualizar o card
    areaChart.update();

    var datas_inicio = ["2024-05-01 08:00:00", "2024-05-01 09:30:00"];
    var datas_fim = ["2024-05-01 09:30:00", "2024-05-01 13:00:00"];

    // Função para converter as strings de data para objetos Moment.js
    function converterParaMoment(dataHoraString) {
        return moment(dataHoraString, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
    }

    // Convertendo as strings de data para objetos Moment.js
    var datasFormatadas = datas_inicio.map(function (data_inicio, index) {
        return converterParaMoment(data_inicio) + ' - ' + converterParaMoment(datas_fim[index]);
    });

    // Gráfico de Linhas
    var ctx3 = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: datasFormatadas,
            datasets: [{
                label: 'Processo',
                data: Array.from({ length: datas_inicio.length }, (_, i) => i),
                borderColor: 'black', // Cor de destaque mais suave
                backgroundColor: 'transparent',
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Processo'
                    },
                    ticks: {
                        autoSkip: false // Exibe todos os labels
                    }
                }],
                yAxes: [{
                    type: 'time',
                    time: {
                        unit: 'minute',
                        displayFormats: {
                            minute: 'DD/MM/YYYY HH:mm:ss'
                        }
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Data e Hora'
                    }
                }],
            },
            plugins: {
                legend: {
                    display: true, // Exibe a legenda
                    position: 'top' // Coloca a legenda no topo
                },
                tooltip: {
                    backgroundColor: 'black', // Cor de fundo do tooltip
                    titleColor: 'black',
                    bodyColor: 'black',
                    borderColor: 'black',
                    borderWidth: 1
                }
            },
            responsive: true,
            maintainAspectRatio: true, // Ajuste adequado para manter a proporção
            title: {
                display: true,
                text: 'Início e Fim do Processo'
            }
        }
    });

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
        }
    }
     // Adiciona um evento para o botão de reset
     resetButton.addEventListener('click', () => {
        tempoOperacao = 0; // Zera o contador
        tempoOperacaoTexto.textContent = '00:00:00'; // Atualiza o texto do contador
    });

    cartaoMaquina.addEventListener('click', alternarStatusMaquina);
});
