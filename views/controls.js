import { menuView } from "./menu.js"
import { returnBtnView } from "./returnButton.js"

export const controlsView = () =>
    `<div>
        ${returnBtnView()}
        <div class="controlsContainer">
            <div class="controlsBox">
                <h1>Player1</h1>
                <p><strong>Movement</strong></p>
                <p>move left: d</p>
                <p>move right: a</p>
                <p>jump: w</p>
                <br>
                <p><strong>Attacks</strong></p>
                <p>high kick: space</p>
            </div>
            <div class="controlsBox">
                <h1>Player2</h1>
                <p><strong>Movement</strong></p>
                <p>move left: left arrow</p>
                <p>move right: right arrow</p>
                <p>jump: up arrow</p>
                <br>
                <p><strong>Attacks</strong></p>
                <p>high kick: 0(zero)</p>
            </div>
        </div>
    </div>`

window.onBackClick = e => {
    document.body.querySelector('section').innerHTML = menuView()
}