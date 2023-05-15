import { Attack, Player, Sprite } from './classes.js'
import { attack } from './util.js'

const ctx = document.querySelector('canvas').getContext('2d')

ctx.canvas.width = 1024
ctx.canvas.height = 576

const background = new Sprite({ x: 0, y: 0 }, { x: 0, y: 0 }, '../img/background.png')

const player1 = new Player(50, 100, { x: 0, y: 0 }, { x: 0, y: 100 }, 100, 'right', '../img/player1/idle.png', 5, 3, 1, {
    'idle': {
        imageSrc: '../img/player1/idle.png',
        framesCount: 5
    },
    'jump': {
        imageSrc: '../img/player1/jump.png',
        framesCount: 5
    },
    'fall': {
        imageSrc: '../img/player1/fall.png',
        framesCount: 5
    },
    'run': {
        imageSrc: '../img/player1/run.png',
        framesCount: 5
    }
})
player1.attacks['highKick'] = new Attack({ x: -60, y: 0 }, 60, 80, 20)

const player2 = new Player(50, 100, { x: ctx.canvas.width - 50, y: 0 }, { x: 0, y: 100 }, 100, 'left', '../img/player2/idle.png', 5, 3, 1, {
    'idle': {
        imageSrc: '../img/player2/idle.png',
        framesCount: 5
    },
    'jump': {
        imageSrc: '../img/player2/jump.png',
        framesCount: 5
    },
    'fall': {
        imageSrc: '../img/player2/fall.png',
        framesCount: 5
    },
    'run': {
        imageSrc: '../img/player2/run.png',
        framesCount: 5
    }
})
player2.attacks['highKick'] = new Attack({ x: 70, y: 0 }, 60, 80, 20)

const intervalId = setInterval(() => window.requestAnimationFrame(() => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    background.drawSprite(ctx)
    player1.draw(ctx)
    player2.draw(ctx)
}), 34)

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
        attack(player1, player2)
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
        attack(player2, player1)
    }
}