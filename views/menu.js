import { startGame } from "../src/game.js";
import { controlsView } from "./controls.js";
import { gameView } from "./game.js";

export const menuView = () => `<div onclick="onPlayClick(event)">
    <a href="javascript:void(0)">Play</a>
    <a href="javascript:void(0)">Controls</a>
    <a href="javascript:void(0)">Settings</a>
</div>`

window.onPlayClick = (e) => {
    if (e.target.tagName != 'A') return
    if (e.target.textContent == 'Play') {
        document.body.innerHTML = gameView()
        startGame()
    } else if (e.target.textContent == 'Controls') {
        document.body.innerHTML = controlsView()
    }
}