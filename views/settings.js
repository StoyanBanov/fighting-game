import { settingsVariables } from "../src/settings.js";
import { returnBtnView } from "./returnButton.js";

export const settingsView = () =>
    `<div>
        ${returnBtnView()}
        <div class="controlsContainer">
            <div class="controlsBox">
                <h2>Settings</h2>
                <form onsubmit="onSaveSettings(event)">
                <label>time limit: <input min="0" max="120" id="timeLimitIn" name="timerLimit" type="number" value="${settingsVariables.timerLimitSec}"/></label>
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