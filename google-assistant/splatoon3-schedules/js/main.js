import { Action } from './action.js'
import { Scene } from './scene.js'
window.addEventListener('load', () => {
    window.scene = new Scene()
    window.scene.action = new Action(scene)
    window.scene.action.setCallbacks()
})