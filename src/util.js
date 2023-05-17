export function attack(attacker, target) {
    const attack = attacker.currentAttack
    if (attacker.position.x - attack.offset.x + (attacker.orientation == 'right' ? attack.width : 0) <= target.position.x + target.width &&
        attacker.position.x - attack.offset.x + (attacker.orientation == 'right' ? attack.width : 0) >= target.position.x &&
        (attacker.position.y - attack.offset.y + attack.height <= target.position.y + target.height &&
            attacker.position.y - attack.offset.y + attack.height >= target.position.y ||
            attacker.position.y - attack.offset.y <= target.position.y + target.height &&
            attacker.position.y - attack.offset.y >= target.position.y)) {
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