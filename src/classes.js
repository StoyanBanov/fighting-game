export class Sprite {
    constructor(position, offset, imageSrc, framesCount = 1, framesDelay = 1, scale = 1) {
        this.position = position
        this.offset = offset
        this.image = new Image()
        this.image.src = imageSrc
        this.framesCount = framesCount
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesDelay = framesDelay
        this.scale = scale
    }

    drawSprite(ctx) {
        ctx.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesCount),
            0,
            this.image.width / this.framesCount,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.framesCount * this.scale,
            this.image.height * this.scale
        )
        this.framesElapsed++
        if (this.framesElapsed % this.framesDelay == 0) {
            this.framesElapsed = 0
            if (this.framesCurrent < this.framesCount - 1) this.framesCurrent++
            else this.framesCurrent = 0
        }
    }
}

export class Player extends Sprite {
    constructor(width, height, position, offset, health, orientation, imageSrc, framesCount = 1, framesDelay, scale, sprites) {
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

        for (const key in this.sprites) {
            this.sprites[key].image = new Image()
            this.sprites[key].image.src = this.sprites[key].imageSrc
        }
    }

    draw(ctx) {
        this.drawSprite(ctx)
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.state['fall']) this.fall(ctx)
        else if (this.state['jump']) {
            if (this.position.y + this.height > ctx.canvas.height - this.offset.y - 170) {
                this.velocity.y += 1
            } else {
                this.velocity.y = 0
                this.state['fall'] = true
                this.image = this.sprites.fall.image
                this.state['jump'] = false
            }
        }
        if (this.state['attack']) {
            ctx.fillStyle = 'green'
            ctx.fillRect(this.position.x - this.currentAttack.offset.x, this.position.y - this.currentAttack.offset.y, this.currentAttack.width, this.currentAttack.height)
            this.state['attack'] = false
        }
        if (Object.values(this.state).slice(0, -1).every(s => !s)) {
            this.state['idle'] = true
            this.image = this.sprites.idle.image
        }
    }

    drawAttack(name) {
        this.state['attack'] = true
        this.state['idle'] = false
        this.currentAttack = this.attacks[name]
    }

    move(direction) {
        this.state['move'] = true
        this.state['idle'] = false
        this.velocity.x = direction == 'right' ? 10 : -10
    }

    stop() {
        this.state['move'] = false
        this.velocity.x = 0
    }

    jump() {
        this.image = this.sprites.jump.image
        if (this.state['onGround'] == true) {
            this.state['jump'] = true
            this.state['idle'] = false
            this.state['fall'] = false
            this.state['onGround'] = false
            this.velocity.y = -25
        }
    }

    fall(ctx) {
        if (this.position.y + this.height + this.velocity.y < ctx.canvas.height - this.offset.y) {
            this.velocity.y += 4
        } else {
            this.state['onGround'] = true
            this.state['fall'] = false
            this.velocity.y = 0
            this.position.y = ctx.canvas.height - this.height - this.offset.y
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