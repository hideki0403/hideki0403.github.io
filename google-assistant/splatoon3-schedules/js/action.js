export class Action {
    /**
     * @param  {Phaser.Scene} scene which serves as a container of all visual
     * and audio elements.
     */
    constructor(scene) {
        this.canvas = window.interactiveCanvas
        this.gameScene = scene
        const that = this
        this.intents = {
            GUESS: function (params) {
                that.gameScene.guess(params)
            },
            DEFAULT: function () {
                // do nothing, when no command is found
            },
        }
    }

    /**
     * Register all callbacks used by the Interactive Canvas Action
     * executed during game creation time.
     */
    setCallbacks() {
        const that = this
        // Declare the Interactive Canvas action callbacks.
        const callbacks = {
            onUpdate(data) {
                const intent = data[0].google.intent
                that.intents[intent ? intent.name.toUpperCase() : 'DEFAULT'](intent.params)
            },
        }
        // Called by the Interactive Canvas web app once web app has loaded to
        // register callbacks.
        this.canvas.ready(callbacks)
    }
}
