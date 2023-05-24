import { menuView } from '../views/menu.js';
import { Attack, Player, Sprite } from './classes.js'
import { settingsVariables } from './settings.js';
import { endGame } from './util.js';

window.startGame = startGame

export function startGame(e) {
    const resultDiv = document.querySelector('.result');
    const leftBar = document.getElementById('leftBar')
    const rightBar = document.getElementById('rightBar')

    resultDiv.style.display = 'none'
    leftBar.style.width = '100%'
    rightBar.style.width = '100%'
    leftBar.style.background = 'green'
    rightBar.style.background = 'green'
    const ctx = document.querySelector('canvas').getContext('2d')

    ctx.canvas.width = 1024
    ctx.canvas.height = 576

    const background = new Sprite({ x: 0, y: 0 }, { x: 0, y: 0 }, '../img/background.png')

    const player1 = new Player(40, 100, { x: 0, y: 0 }, { x: 0, y: 100 }, 100, 'right', '../img/player1/idle.png', 5, 3, 1, {
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
        },
        'kick': {
            imageSrc: '../img/player1/kick.png',
            framesCount: 5
        }
    }, document.getElementById('leftBar'))
    player1.attacks['kick'] = new Attack({ x: -60, y: 0 }, 25, 25, 20)

    const player2 = new Player(40, 100, { x: ctx.canvas.width - 50, y: 0 }, { x: 50, y: 100 }, 100, 'left', '../img/player2/idle.png', 5, 3, 1, {
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
        },
        'kick': {
            imageSrc: '../img/player2/kick.png',
            framesCount: 5
        }
    }, document.getElementById('rightBar'))
    player2.attacks['kick'] = new Attack({ x: 35, y: 0 }, 25, 25, 20)


    const drawingIntervalId = setInterval(() => window.requestAnimationFrame(() => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        background.drawSprite(ctx)
        player1.draw(ctx)
        player2.draw(ctx)
        if (player1.health == 0 || player2.health == 0) {
            clearInterval(timerIntervalId)
            clearInterval(drawingIntervalId)
            endGame(player1, player2)
        }
    }), 34)

    const timer = document.querySelector('.timer')
    let initialTime = settingsVariables.timerLimitSec
    const timerIntervalId = setInterval(() => window.requestAnimationFrame(() => {
        if (initialTime == 0) {
            clearInterval(timerIntervalId)
            clearInterval(drawingIntervalId)
            endGame(player1, player2)
        }
        timer.textContent = initialTime--
    }), 1000)

    const keyAssocArr = {}

    addEventListener('keydown', handleKeyEvents)
    addEventListener('keyup', handleKeyEvents)

    function handleKeyEvents(e) {
        if (e.key == 'Escape' && e.type == 'keyup') {
            document.querySelector('section').innerHTML = menuView()
            return
        }


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
        if (keyAssocArr[' '] && !player1.state.attack) {
            player1.drawAttack('kick', player2)
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
        if (keyAssocArr['0'] && !player2.state.attack) {
            player2.drawAttack('kick', player1)
        }
    }
}