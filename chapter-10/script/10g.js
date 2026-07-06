let gameBtn = document.querySelector('.game-off-toggle');
let musicBtn = document.querySelector('.music-off-toggle');
let techBtn = document.querySelector('.tech-off-toggle');

function toggleGame(toggle_name) {
    let btnElement = document.querySelector(toggle_name);
    let cheakToggle = btnElement.classList.contains('is-on-toggle');
    if (cheakToggle === false) {
        btnElement.classList.add('is-on-toggle');
    } else {
        btnElement.classList.remove('is-on-toggle');
    }
    if (toggle_name === '.game-off-toggle') {
        musicBtn.classList.remove('is-on-toggle');
        techBtn.classList.remove('is-on-toggle');
    }
    else if (toggle_name === '.music-off-toggle') {
        gameBtn.classList.remove('is-on-toggle');
        techBtn.classList.remove('is-on-toggle');
    } else if (toggle_name === '.tech-off-toggle') {
        musicBtn.classList.remove('is-on-toggle');
        gameBtn.classList.remove('is-on-toggle');
    }
}