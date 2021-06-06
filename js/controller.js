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

function mapClicked() {


}

function positonButtonClicked() {
    getHomePos();
}

function toggleTable() {
    var elTable = document.querySelector('.places-table');
    console.dir(elTable)
    elTable.classList.toggle('display');
    renderLocations();
}