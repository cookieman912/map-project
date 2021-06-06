'use strict'
console.log('connected');

function renderUserSettings() {
    initData();
    document.querySelector('body').style.backgroundColor = gUserdata.bgc;
    document.querySelector('body').style.color = gUserdata.textColor;
}
function submitForm(ev) {
    ev.preventDefault();
    changeBackgroundColor();
    changeTextColor();

}