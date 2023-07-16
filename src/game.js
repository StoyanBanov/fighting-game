import { menuView } from '../views/menu.js';
import { sounds } from '../views/settings.js';
import { Attack, Player, Sprite } from './classes.js'
import { settingsVariables } from './settings.js';
import { endGame } from './util.js';

window.startGame = startGame

export function startGame(e) {
    const resultDiv = document.querySelector('.result');
    const leftBar = document.getElementById('leftBar')
    const rightBar = document.getElementById('rightBar')

    if (sounds.music)
        document.getElementById("backgroundTheme").load()

    resultDiv.style.display = 'none'
    leftBar.style.width = '100%'
    rightBar.style.width = '100%'
    leftBar.style.background = 'green'
    rightBar.style.background = 'green'
    const ctx = document.querySelector('canvas').getContext('2d')

    ctx.canvas.width = 1024
    ctx.canvas.height = 576

    const background = new Sprite({ x: 0, y: 0 }, { x: 0, y: 0 }, '../img/background.png')

    const player1 = new Player({
        width: 50, height: 100, position: { x: 0, y: 376 }, offset: { x: 0, y: 0 }, health: 100, orientation: 'right', imageSrc: '../img/player1/idleR.png',
        sprites: {
            right: {
                'idle': {
                    imageSrc: '../img/player1/idleR.png',
                    framesCount: 5
                },
                'jump': {
                    imageSrc: '../img/player1/jumpR.png',
                    framesCount: 5
                },
                'fall': {
                    imageSrc: '../img/player1/fallR.png',
                    framesCount: 5
                },
                'run': {
                    imageSrc: '../img/player1/runR.png',
                    framesCount: 5
                },
                'kick': {
                    imageSrc: '../img/player1/kickR.png',
                    framesCount: 5
                }
            },
            left: {
                'idle': {
                    imageSrc: '../img/player1/idleL.png',
                    framesCount: 5
                },
                'jump': {
                    imageSrc: '../img/player1/jumpL.png',
                    framesCount: 5
                },
                'fall': {
                    imageSrc: '../img/player1/fallL.png',
                    framesCount: 5
                },
                'run': {
                    imageSrc: '../img/player1/runL.png',
                    framesCount: 5
                },
                'kick': {
                    imageSrc: '../img/player1/kickL.png',
                    framesCount: 5,
                    offset: { x: -50, y: 0 }
                }
            }
        }, healthBar: document.getElementById('leftBar'), framesCount: 5
    })
    player1.attacks.right.kick = new Attack({ x: 60, y: 0 }, 25, 25, 20)
    player1.attacks.left.kick = new Attack({ x: -35, y: 0 }, 25, 25, 20)

    const player2 = new Player({
        width: 50, height: 100, position: { x: ctx.canvas.width - 50, y: 376 }, offset: { x: 0, y: 0 }, health: 100, orientation: 'left', imageSrc: '../img/player2/idleL.png',
        sprites: {
            left: {
                'idle': {
                    imageSrc: '../img/player2/idleL.png',
                    framesCount: 5
                },
                'jump': {
                    imageSrc: '../img/player2/jumpL.png',
                    framesCount: 5
                },
                'fall': {
                    imageSrc: '../img/player2/fallL.png',
                    framesCount: 5
                },
                'run': {
                    imageSrc: '../img/player2/runL.png',
                    framesCount: 5
                },
                'kick': {
                    imageSrc: '../img/player2/kickL.png',
                    framesCount: 5,
                    offset: { x: -50, y: 0 }
                }
            },
            right: {
                'idle': {
                    imageSrc: '../img/player2/idleR.png',
                    framesCount: 5
                },
                'jump': {
                    imageSrc: '../img/player2/jumpR.png',
                    framesCount: 5
                },
                'fall': {
                    imageSrc: '../img/player2/fallR.png',
                    framesCount: 5
                },
                'run': {
                    imageSrc: '../img/player2/runR.png',
                    framesCount: 5
                },
                'kick': {
                    imageSrc: '../img/player2/kickR.png',
                    framesCount: 5
                }
            }

        }, healthBar: document.getElementById('rightBar'), framesCount: 5
    })
    player2.attacks.left.kick = new Attack({ x: -35, y: 0 }, 25, 25, 20)
    player2.attacks.right.kick = new Attack({ x: 60, y: 0 }, 25, 25, 20)

    player1.enemy = player2
    player2.enemy = player1

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
    }), 70)

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
            clearInterval(timerIntervalId)
            clearInterval(drawingIntervalId)
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