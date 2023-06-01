import { startGame } from "../src/game.js";
import { controlsView } from "./controls.js";
import { gameView } from "./game.js";
import { settingsView } from "./settings.js";

export const menuView = () =>
    `<div class="menuContainer" onclick="onPlayClick(event)">
        <a href="javascript:void(0)">Play</a>
        <a href="javascript:void(0)">Controls</a>
        <a href="javascript:void(0)">Settings</a>
    </div>`

const section = document.querySelector('section')
document.getElementById("backgroundTheme").volume = 0.7

window.onPlayClick = (e) => {
    if (e.target.tagName != 'A') return
    if (e.target.textContent == 'Play') {
        document.getElementById('backgroundTheme').play()
        section.innerHTML = gameView()
        startGame()
    } else if (e.target.textContent == 'Controls') {
        section.innerHTML = controlsView()
    } else if (e.target.textContent == 'Settings') {
        section.innerHTML = settingsView()
    }
}