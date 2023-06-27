import { menuView } from "./menu.js"

export const gameView = () => {
    document.querySelector('.soundSettingContainer').style.display = 'block'

    return `<div class="container">
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
            <button onclick="startGame(event)">Play again</button>
            <button onclick="onMenuClick(event)">Menu</button>
        </div>
        <canvas></canvas>
    </div>`
}

window.onMenuClick = (e) => {
    document.getElementById('backgroundTheme').pause()
    document.querySelector('section').innerHTML = menuView()
}