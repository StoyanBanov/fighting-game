import { settingsVariables } from "../src/settings.js";
import { returnBtnView } from "./returnButton.js";

export const sounds = {
    music: true
};

export const settingsView = () =>
    `<div>
        ${returnBtnView()}
        <div class="controlsContainer">
            <div class="controlsBox">
                <h2>Settings</h2>
                <form onsubmit="onSaveSettings(event)">
                <label for="timeLimitIn">time limit: <input oninput="timeLimitChangeHandler(event)" type="range" step="10" min="10" max="120" id="timeLimitIn" name="timerLimit" value="${settingsVariables.timerLimitSec}"/></label>
                <output id="timeLimitOut" for="timeLimitIn">${settingsVariables.timerLimitSec}</output>
                <br>
                <input type="submit" value="Save"/>
                </form>
            </div>
        </div>
    </div>`

window.onSaveSettings = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))
    if (isNaN(Number(formData.timerLimit))) {
        document.getElementsByName(timerLimit)[0].style.border = 'red'
        return
    }
    settingsVariables.timerLimitSec = Number(formData.timerLimit)
}

window.timeLimitChangeHandler = (e) => {
    document.getElementById('timeLimitOut').value = e.target.value
}