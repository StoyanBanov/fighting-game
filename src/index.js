import { Attack, Player } from './classes.js'

const ctx = document.querySelector('canvas').getContext('2d')

ctx.canvas.width = 1024
ctx.canvas.height = 576

const player1 = new Player(50, 100, { x: 0, y: 0 })
player1.attacks['highKick'] = new Attack({ x: -60, y: 0 }, 60, 80)

const player2 = new Player(50, 100, { x: ctx.canvas.width - 50, y: 0 })
player2.attacks['highKick'] = new Attack({ x: 70, y: 0 }, 60, 80)

const intervalId = setInterval(() => window.requestAnimationFrame(() => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    player1.draw(ctx)
    player2.draw(ctx)
}), 16)

const keyAssocArr = {}

addEventListener('keydown', handleKeyEvents)
addEventListener('keyup', handleKeyEvents)

function handleKeyEvents(e) {
    keyAssocArr[e.key] = e.type == 'keydown'
    if (keyAssocArr['d']) {
        player1.move('right')
    } else if (keyAssocArr['a']) {
        player1.move('left')
    } else if (!keyAssocArr['a'] && !keyAssocArr['d']) {
        player1.stop()
    }
    if (keyAssocArr['w']) {
        player1.jump()
    }
    if (keyAssocArr[' ']) {
        player1.drawAttack('highKick')
    }

    if (keyAssocArr['ArrowRight']) {
        player2.move('right')
    } else if (keyAssocArr['ArrowLeft']) {
        player2.move('left')
    } else if (!keyAssocArr['ArrowRight'] && !keyAssocArr['ArrowLeft']) {
        player2.stop()
    }
    if (keyAssocArr['ArrowUp']) {
        player2.jump()
    }
    if (keyAssocArr['0']) {
        player2.drawAttack('highKick')
    }
}