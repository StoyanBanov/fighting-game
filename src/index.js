import { menuView } from '../views/menu.js';
import { sounds } from '../views/settings.js';

document.querySelector('section').innerHTML = menuView()

const soundOnSvg = document.getElementById('soundOnSvg')
const soundOffSvg = document.getElementById('soundOffSvg')
const backgroundTheme = document.getElementById("backgroundTheme")
soundOffSvg.style.display = 'none'

soundOnSvg.addEventListener('click', e => {
    soundOnSvg.style.display = 'none'
    soundOffSvg.style.display = ''
    backgroundTheme.pause()
    sounds.music = false
})

soundOffSvg.addEventListener('click', e => {
    soundOffSvg.style.display = 'none'
    soundOnSvg.style.display = ''
    backgroundTheme.play()
    sounds.music = true
})
