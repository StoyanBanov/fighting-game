export function attack(attacker, target) {
    const attack = attacker.currentAttack
    const attackPosition = {
        x: attacker.position.x + attack.offset.x,
        y: attacker.position.y + attack.offset.y
    }

    if (attackPosition.x <= target.position.x + target.width &&
        attackPosition.x >= target.position.x - attack.width &&
        attackPosition.y <= target.position.y + target.height &&
        attackPosition.y >= target.position.y - attack.height) {
        target.health -= attack.damage
        if (target.health < 0) target.health = 0
        target.healthBar.style.width = target.health + '%'
        if (target.health <= 30) target.healthBar.style.background = 'red'
        else if (target.health <= 60) target.healthBar.style.background = 'yellow'
        else target.healthBar.style.background = 'green'
    }
}

export function endGame(player1, player2) {
    const resultDiv = document.querySelector('.result');
    resultDiv.style.display = 'flex'
    if (player1.health != 0 && player2.health != 0) resultDiv.children[0].textContent = 'Draw'
    else if (player1.health > player2.health) resultDiv.children[0].textContent = 'Player1 wins'
    else resultDiv.children[0].textContent = 'Player2 wins'
}