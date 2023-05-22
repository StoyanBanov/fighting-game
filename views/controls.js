import { menuView } from "./menu.js"

export const controlsView = () =>
    `<div>
        <a onmouseover="onReturnHover(event)" onmouseout="onReturnHover(event)" class="returnButton" onclick="onBackClick(event)" href="javascript:void(0)">
            <svg width=70px height=50px>
                <polygon points="30,0 0,25 30,50" class="returnArrow" />
                <rect y="10px" x="20px" width="50px" height="30px" class="returnArrow" />
            </svg>
        </a>
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

window.onReturnHover = e => {
    let className
    let oldClassName

    className = e.type == 'mouseover' ? 'returnArrowHover' : 'returnArrow'
    oldClassName = className == 'returnArrowHover' ? 'returnArrow' : 'returnArrowHover'

    e.currentTarget.querySelector('rect').classList.remove(oldClassName)
    e.currentTarget.querySelector('rect').classList.add(className)
    e.currentTarget.querySelector('polygon').classList.remove(oldClassName)
    e.currentTarget.querySelector('polygon').classList.add(className)
}