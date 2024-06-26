'use strict';
let chart;
const ctx2d = document.getElementById('gamecanvas').getContext('2d');

function balanceChart() {
    chart = new Chart(ctx2d, {
    type: 'line',
    data: {
        labels: daylist,
        datasets: [
            {
                label: '鳩',
                data: changingOfDove,
                cubicInterpolationMode: 'monotone',
                borderColor: 'rgba(0, 188, 212, 1)',
                backgroundColor: 'rgba(0, 188, 212, 0.5)',
                stack: 1,
                fill: 'origin',
            },
            {
                label: '鷹',
                data: changingOfHawk,
                cubicInterpolationMode: 'monotone',
                borderColor: 'rgba(255, 193, 7, 1)',
                backgroundColor: 'rgba(255, 193, 7, 0.5)',
                stack: 1,
                fill: '-1',
            },
        ],
    },
    options: {
        responsive: true,
        scales: {
            x: {
                categoryPercentage: 0.5,
            },
            y: {
                type: 'linear',
            	min: 0,
                stacked: true,
            },
            
        },
        plugins: {
            filler: {
                propagate: true,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '匹匹';
                        }
                        return label;
                    },
                },
            },
        },
    },
  })
}




function updating(){
  chart.data.labels=daylist;
  chart.data.datasets[0].data = changingOfDove;
  chart.data.datasets[1].data = changingOfHawk;
  chart.update()
}
function x3Times(){
    xSpeed = 1;
}
function x2Times(){
    xSpeed = 5;
}
function x1Times(){
    xSpeed = 10;
}

