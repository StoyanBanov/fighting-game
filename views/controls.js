import { menuView } from "./menu.js"

export const controlsView = () => `<div>
    <button onclick="onBackClick(event)"><-</button>
    <p><strong>Movement</strong></p>
    <p>move left: d</p>
    <p>move right: a</p>
    <p>jump: w</p>
    <br>
    <p><strong>Attacks</strong></p>
    <p>high kick: space</p>
</div>`

window.onBackClick = e => {
    document.body.innerHTML = menuView()
}