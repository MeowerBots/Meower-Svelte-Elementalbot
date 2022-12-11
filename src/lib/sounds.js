function notification() {
    var audio = new Audio('../src/assets/menu_notify.wav');
    audio.play();
}

function bg_music() {
    var audio = new Audio('../src/assets/theme.mp3');
    audio.loop = true
    audio.play();
}

export function playNotification() {
    //notification();
    return
}

export function playBG() {
    bg_music();
}