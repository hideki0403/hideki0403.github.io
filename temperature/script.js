const timezone = 9

var chart = new ApexCharts(document.querySelector('#graph'), {
    chart: {
        type: 'area',
        height: '100%',
        width: '100%',
        dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5
        }
    },
    colors: ['#81A1C1'],
    title: {
        text: '読み込み中',
        style: {
            color: '#E5E9F0'
        }
    },
    series: [{
        name: '室温',
        data: []
    }],
    stroke: {
        curve: 'smooth',
        width: 2
    },
    fill: {
        type: 'gradient',
        gradient: {
            enabled: true,
            opacityFrom: 0.55,
            opacityTo: 0
        }
    },
    tooltip: {
        theme: 'dark',
        x: {
            format: 'yyyy/MM/dd HH:mm',
        },
        y: {
            formatter: (value) => { return value.toFixed(1) + '℃' }
        }
    },
    xaxis: {
        type: 'datetime',
        tooltip: {
            enabled: false
        },
        labels: {
            style: {
                colors: '#D8DEE9'
            }
        }
    },
    yaxis: {
        labels: {
            formatter: (value) => {return value.toFixed(0) + '℃'},
            style: {
                colors: '#D8DEE9'
            }
        }
    },
    annotations: {
        yaxis: [
            {
                y: 18.5,
                borderColor: '#5E81AC',
                label: {
                    borderColor: '#5E81AC',
                    style: {
                        color: '#D8DEE9',
                        background: '#5E81AC'
                    },
                    text: 'さむい'
                }
            }, {
                y: 28.5,
                borderColor: '#BF616A',
                label: {
                    borderColor: '#BF616A',
                    style: {
                        color: '#D8DEE9',
                        background: '#BF616A'
                    },
                    text: 'あつい'
                }
            }
        ]
    },
    dataLabels: {
        enabled: false
    },
})

chart.render()

async function update() {
    var data = (await superagent.get('https://api.yukineko.me/temperature/v1/get')).body

    var datasets = []
    var total = 0

    data.forEach(content => {
        datasets.push({
            x: (content.unix * 1000) + (timezone * 3600 * 1000),
            y: content.temperature * 1
        })

        total += content.temperature * 1
    })

    chart.updateOptions({
        title: {
            text: `現在の室温: ${(data[data.length - 1].temperature * 1).toFixed(1)}℃ (最終更新: ${dayjs.unix(data[data.length - 1].unix).format('HH:mm')})`
        },
        colors: [getMainColor(total / data.length)]
    })

    chart.updateSeries([{data: datasets}], true)

    document.title = `${(data[data.length - 1].temperature * 1).toFixed(1)}℃ - ${dayjs.unix(data[data.length - 1].unix).format('HH:mm')}`
}

function getMainColor(temp) {
    switch(temp) {
        case temp <= 18.5 && temp: {
            return '#81A1C1'
        }

        case (28.5 >= temp && temp > 18.5) && temp: {
            return '#A3BE8C'
        }

        case temp > 28.5 && temp: {
            return '#BA5E67'
        }

        default: {
            return '#ECEFF4'
        }
    }
}

update()

var currentTime = dayjs()
var delay = (60 - currentTime.second()) + ((4 - (currentTime.minute() % 5)) * 60) + 30

console.log('UpdateDelay: ' + delay + 'sec')
setTimeout(function() {
    setInterval(function() {update()}, 1000 * 300)
}, delay * 1000)