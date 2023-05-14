export class Player {
    constructor(width, height, position) {
        this.width = width
        this.height = height
        this.position = position
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
    }

    draw(ctx) {
        ctx.fillStyle = 'red'
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        if (this.state['fall']) this.fall(ctx)
        else if (this.state['jump']) {
            if (this.position.y + this.height > ctx.canvas.height - 200) {
                this.velocity.y += 1
            } else {
                this.velocity.y = 0
                this.state['fall'] = true
                this.state['jump'] = false
            }
        }
        if (this.state['attack']) {
            ctx.fillStyle = 'green'
            ctx.fillRect(this.position.x - this.currentAttack.offset.x, this.position.y - this.currentAttack.offset.y, this.currentAttack.width, this.currentAttack.height)
            this.state['attack'] = false
        }
    }

    drawAttack(name) {
        this.state['attack'] = true
        this.currentAttack = this.attacks[name]
    }

    move(direction) {
        this.state['move'] = true
        this.velocity.x = direction == 'right' ? 10 : -10
    }

    stop() {
        this.state['move'] = false
        this.velocity.x = 0
    }

    jump() {
        if (this.state['onGround'] == true) {
            this.state['jump'] = true
            this.state['idle'] = false
            this.state['fall'] = false
            this.state['onGround'] = false
            this.velocity.y = -25
        }
    }

    fall(ctx) {
        if (this.position.y + this.height + this.velocity.y < ctx.canvas.height) {
            this.velocity.y += 4
        } else {
            this.state['onGround'] = true
            this.velocity.y = 0
            this.position.y = ctx.canvas.height - this.height
        }
    }
}

export class Attack {
    constructor(offset, width, height) {
        this.width = width
        this.height = height
        this.offset = offset
    }
}