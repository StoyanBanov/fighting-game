import { attack } from "./util.js"

export class Sprite {
    constructor(position, offset, imageSrc, framesCount = 1) {
        this.position = position
        this.position.x
        this.position.y
        this.image = new Image()
        this.image.src = imageSrc
        this.image.offset = offset
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesCount = framesCount
    }

    drawSprite(ctx) {
        ctx.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesCount),
            0,
            this.image.width / this.framesCount,
            this.image.height,
            this.position.x + this.image.offset.x,
            this.position.y + this.image.offset.y,
            this.image.width / this.framesCount,
            this.image.height
        )
        this.framesElapsed++
        if (this.framesCurrent < this.framesCount - 1) this.framesCurrent++
        else this.framesCurrent = 0
    }
}

export class Player extends Sprite {
    constructor({ width, height, position, offset, health, orientation, imageSrc, sprites, healthBar, framesCount }) {
        super(position, offset, imageSrc, framesCount)
        this.width = width
        this.height = height
        this.health = health
        this.orientation = orientation
        this.velocity = { x: 0, y: 0 }
        this.state = {
            'fall': false,
            'attack': false,
            'move': false,
            'jump': false,
            'idle': true,
            'onGround': true
        }
        this.attacks = {
            left: {},
            right: {}
        }
        this.currentAttack
        this.sprites = sprites
        this.enemy
        this.healthBar = healthBar

        for (const key in this.sprites['left']) {
            this.sprites['left'][key].image = new Image()
            this.sprites['left'][key].image.src = this.sprites['left'][key].imageSrc
            this.sprites['left'][key].image.offset = this.sprites['left'][key].offset || { x: 0, y: 0 }

            this.sprites['right'][key].image = new Image()
            this.sprites['right'][key].image.src = this.sprites['right'][key].imageSrc
            this.sprites['right'][key].image.offset = this.sprites['right'][key].offset || { x: 0, y: 0 }
        }
    }

    draw(ctx) {
        this.drawSprite(ctx)
        //ctx.fillStyle = 'green'
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.orientation = (this.enemy && this.enemy.position.x <= this.position.x) ? 'left' : 'right'

        if (this.state.jump) {
            if (!this.velocity.y) {
                this.state.jump = false
                this.state.fall = true
                if (!this.state.attack) {
                    this.setImg('fall')
                    this.framesCurrent = 0
                }
            } else this.velocity.y += 10
        } else if (this.state.fall) {
            if (this.velocity.y / 10 == this.framesCount - 2) {
                this.state.fall = false
                this.velocity.y = 0
                this.state.onGround = true
                if (!this.state.attack) {
                    this.framesCurrent = 0
                    if (!this.state.move) this.stop()
                    else if (this.state.move) this.setImg('run')
                }
            } else this.velocity.y += 10
        }

        if (this.state.attack && this.framesCurrent == (this.framesCount - 1) / 2) {
            attack(this, this.enemy)
        }
        if (this.state.attack && this.framesCurrent == this.framesCount - 1) {
            this.state.attack = false
            this.framesCurrent = 0
            if (this.state.jump) this.setImg('jump')
            else if (this.state.fall) this.setImg('fall')
            else if (this.state.move) this.setImg('run')
            else if (!this.state.move) this.stop()
        }
    }

    drawAttack(name, enemy) {
        this.state.attack = true
        this.state.idle = false
        this.currentAttack = this.attacks[this.orientation][name]
        this.enemy = enemy
        this.framesCurrent = 0
        this.setImg(name)
    }

    move(direction) {
        if (!this.state['jump'] && !this.state['attack']) {
            this.setImg('run')
        }
        this.state['move'] = true
        this.state['idle'] = false
        this.velocity.x = direction == 'right' ? 15 : -15
    }

    stop() {
        this.state.move = false
        if (!this.state.jump && !this.state.attack && !this.state.fall) {
            this.setImg('idle')
        }
        this.velocity.x = 0
    }

    jump() {
        if (this.state.onGround == true) {
            this.framesCurrent = 0
            if (!this.state.attack)
                this.image = this.sprites[this.orientation].jump.image
            this.velocity.y = (this.framesCount - 2) * -10

            this.state.jump = true
            this.state.idle = false
            this.state.fall = false
            this.state.onGround = false
        }
    }

    setImg(key) {
        this.image = this.sprites[this.orientation][key].image
        this.framesCount = this.sprites[this.orientation][key].framesCount
    }
}

export class Attack {
    constructor(offset, width, height, damage) {
        this.width = width
        this.height = height
        this.offset = offset
        this.damage = damage
    }
}