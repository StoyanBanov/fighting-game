export const returnBtnView = () =>
    `<a onmouseover="onReturnHover(event)" onmouseout="onReturnHover(event)" class="returnButton" onclick="onBackClick(event)" href="javascript:void(0)">
        <svg width=70px height=50px>
            <polygon points="30,0 0,25 30,50" class="returnArrow" />
            <rect y="10px" x="20px" width="50px" height="30px" class="returnArrow" />
        </svg>
    </a>`

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