window.onload = () => {
    const interactiveCanvas = window.interactiveCanvas

    interactiveCanvas.ready({
        onUpdate(data) {
            console.log('onUpdate', data)
        }
    })

    interactiveCanvas.getHeaderHeightPx().then((height) => {
        document.body.style.paddingTop = `${height}px`
    })
}