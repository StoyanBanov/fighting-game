import { html, render } from "lit-html.js";
import { startGame } from "../src/game.js";
import { homeView } from "./menu.js";

export const gameView = () => html`<div class="container">
        <div class="navigation">
            <div class="left">
                <div class="leftHealthBar"></div>
                <div id="leftBar" class="leftHelperBar"></div>
                <div class="label label-left">player1</div>
            </div>
            <div class="timer"></div>
            <div class="right">
                <div class="rightHealthBar"></div>
                <div id="rightBar" class="rightHelperBar"></div>
                <div class="label label-right">player2</div>
            </div>
        </div>
        <div class="result">
            <h1></h1>
            <button @click=${startGame}>Play again</button>
            <button @click=${onMenuClick}>Menu</button>
        </div>
        <canvas></canvas>
    </div>`

function onMenuClick(e) {
    render(homeView(), document.body)
}