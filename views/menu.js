import { html, render } from "lit-html";
import { startGame } from "../src/game.js";
import { gameView } from "./game.js";

export const homeView = () => html`<div @click=${onPlayClick}>
    <a href="javascript:void(0)">Play</a>
    <a href="javascript:void(0)">Controls</a>
    <a href="javascript:void(0)">Settings</a>
</div>`

function onPlayClick(e) {
    if (e.target.tagName != 'A') return
    if (e.target.textContent == 'Play') {
        render(gameView(), document.body)
        startGame()
    }
}