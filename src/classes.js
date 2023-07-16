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
                    this.image = this.sprites[this.orientation].fall.image
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
                    else if (this.state.move) this.image = this.sprites[this.orientation].run.image
                }
            } else this.velocity.y += 10
        }

        if (this.state.attack && this.framesCurrent == (this.framesCount - 1) / 2) {
            attack(this, this.enemy)
        }
        if (this.state.attack && this.framesCurrent == this.framesCount - 1) {
            this.state.attack = false
            this.framesCurrent = 0
            if (this.state.jump) this.image = this.sprites[this.orientation].jump.image
            else if (this.state.fall) this.image = this.sprites[this.orientation].fall.image
            else if (this.state.move) this.image = this.sprites[this.orientation].run.image
            else if (!this.state.move) this.stop()
        }
    }

    drawAttack(name, enemy) {
        this.state.attack = true
        this.state.idle = false
        this.currentAttack = this.attacks[this.orientation][name]
        this.enemy = enemy
        this.framesCurrent = 0
        this.image = this.sprites[this.orientation][name].image
    }

    move(direction) {
        if (!this.state['jump'] && !this.state['attack']) {
            this.image = this.sprites[this.orientation].run.image
        }
        this.state['move'] = true
        this.state['idle'] = false
        this.velocity.x = direction == 'right' ? 15 : -15
    }

    stop() {
        this.state.move = false
        if (!this.state.jump && !this.state.attack && !this.state.fall) {
            this.image = this.sprites[this.orientation].idle.image
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
}

export class Attack {
    constructor(offset, width, height, damage) {
        this.width = width
        this.height = height
        this.offset = offset
        this.damage = damage
    }
}




//old
export class PlayerOld extends Sprite {
    constructor(width, height, position, offset, health, orientation, imageSrc, framesCount = 1, framesDelay, scale, sprites, healthBar) {
        super(position, offset, imageSrc, framesCount, framesDelay, scale)
        this.width = width
        this.height = height
        this.health = health
        this.orientation = orientation
        this.velocity = { x: 0, y: 0 }
        this.state = {
            'fall': true,
            'attack': false,
            'move': false,
            'jump': false,
            'idle': false,
            'onGround': false
        }
        this.attacks = {}
        this.currentAttack
        this.sprites = sprites
        this.enemy
        this.healthBar = healthBar

        for (const key in this.sprites) {
            this.sprites[key].image = new Image()
            this.sprites[key].image.src = this.sprites[key].imageSrc
        }
    }

    draw(ctx) {
        this.drawSprite(ctx)
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if (this.state['attack']) {
            //ctx.fillStyle = 'red'
            //ctx.fillRect(this.position.x - this.currentAttack.offset.x, this.position.y - this.currentAttack.offset.y, this.currentAttack.width, this.currentAttack.height)
            if (this.framesCurrent == 3 && this.framesElapsed % this.framesDelay == 0) attack(this, this.enemy)
            if (this.framesCurrent == 4) {
                this.state['attack'] = false
                if (this.state.move) this.image = this.sprites.run.image
                if (this.state.jump) this.image = this.sprites.jump.image
                if (this.state.fall) this.image = this.sprites.fall.image
            }
        }

        if (this.position.y + this.height < ctx.canvas.height - this.offset.y) {
            this.state['idle'] = false
            if (!this.state['jump']) {
                this.state['fall'] = true
                if (!this.state['attack'])
                    this.image = this.sprites.fall.image
                this.fall(ctx)
            }
        } else {
            this.state['onGround'] = true
            this.state['fall'] = false
            if (this.state['move'] && !this.state.attack) {
                this.image = this.sprites.run.image
            }
            this.velocity.y = 0
            this.position.y = ctx.canvas.height - this.height - this.offset.y
        }
        if (this.state['jump'] && !this.state.fall) {
            this.state['idle'] = false
            if (this.velocity.y <= 0) {
                this.velocity.y += 3
            } else {
                this.state['jump'] = false
            }
        }
        if (Object.values(this.state).slice(0, -1).every(s => !s)) {
            this.image = this.sprites.idle.image
        }
    }

    drawAttack(name, enemy) {
        this.state.attack = true
        this.state.idle = false
        this.currentAttack = this.attacks[name]
        this.enemy = enemy
        this.framesCurrent = 0
        this.image = this.sprites[name].image
    }

    move(direction) {
        if (!this.state['jump'] && !this.state['attack']) {
            this.image = this.sprites.run.image
        }
        this.state['move'] = true
        this.state['idle'] = false
        this.velocity.x = direction == 'right' ? 12 : -12
    }

    stop() {
        this.state['move'] = false
        this.velocity.x = 0
    }

    jump() {
        if (this.state.onGround) {
            this.framesCurrent = 0
            if (!this.state.attack)
                this.image = this.sprites.jump.image
            this.state.jump = true
            this.state.idle = false
            this.state.fall = false
            this.state.onGround = false
            this.velocity.y = -27
        }
    }

    fall(ctx) {
        if (this.position.y + this.height + this.velocity.y <= ctx.canvas.height - this.offset.y) {
            this.velocity.y += 3
        }
    }
}