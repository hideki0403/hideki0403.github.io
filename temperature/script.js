var ctx = document.getElementById('temp-graph').getContext('2d');
var gradientStroke = ctx.createLinearGradient(0, 0, 0, window.innerHeight)
gradientStroke.addColorStop(1, '#6eb7ff')
gradientStroke.addColorStop(0.5, '#f5c2ff')
gradientStroke.addColorStop(0, '#ff6e81')

var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            data: [],
            borderColor: gradientStroke,
            pointRadius: 0,
            borderWidth: 2,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {
                    color: 'rgba(255,255,255,0.7)'
                }
            },
            y: {
                ticks: {
                    color: 'rgba(255,255,255,0.7)'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Temperature: --.--℃ (LastUpdate: ----.--.-- --:--:--)',
                color: 'rgba(255,255,255,0.85)'
            }
        }
    }
})

async function update() {
    var data = (await superagent.get('https://api.yukineko.me/temperature/v1/get')).body

    var datasets = []
    var labels = []
    for(var i = 0; data.length > i; i++) {
        var content = data[i]
        var label = dayjs.unix(content.unix).format('HH:mm')
        datasets.push(content.temperature)
        labels.push(label)
    }

    chart.data.labels = labels
    chart.data.datasets[0].data = datasets
    chart.options.plugins.title.text = `Temperature: ${data[data.length - 1].temperature}℃ (LastUpdate: ${dayjs.unix(data[data.length - 1].unix).format('YYYY.MM.DD HH:mm:ss')})`

    chart.update()
    document.title = `${data[data.length - 1].temperature}℃ - ${dayjs.unix(data[data.length - 1].unix).format('HH:mm:ss')}`
}

update()

var currentTime = dayjs()
var delay = (60 - currentTime.second()) + ((4 - (currentTime.minute() % 5)) * 60) + 30

console.log('UpdateDelay: ' + delay + 'sec')
setTimeout(function() {
    setInterval(function() {update()}, 1000 * 300)
}, delay * 1000)