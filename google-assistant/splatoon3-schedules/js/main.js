window.onload = () => {
    const interactiveCanvas = window.interactiveCanvas

    interactiveCanvas.ready({
        onUpdate(data) {
            console.log('onUpdate', data)
        }
    })

    interactiveCanvas.getHeaderHeightPx().then((height) => {
        document.body.style.paddingTop = `${height}px`
        document.getElementById('iframe').style.height = `calc(100% - ${height}px)`
    })
}