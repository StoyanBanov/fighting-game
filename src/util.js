export function attack(attacker, target) {
    const attack = attacker.currentAttack
    if (attacker.position.x - attack.offset.x + (attacker.orientation == 'right' ? attack.width : 0) <= target.position.x + target.width &&
        attacker.position.x - attack.offset.x + (attacker.orientation == 'right' ? attack.width : 0) >= target.position.x &&
        (attacker.position.y - attack.offset.y + attack.height <= target.position.y + target.height &&
            attacker.position.y - attack.offset.y + attack.height >= target.position.y ||
            attacker.position.y - attack.offset.y <= target.position.y + target.height &&
            attacker.position.y - attack.offset.y >= target.position.y)) {
        target.health -= attack.damage
    }
}