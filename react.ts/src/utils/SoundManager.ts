import hoverAudioFile from '../assets/sounds/hover.ogg';
import clickAudioFile from '../assets/sounds/click.ogg';
import errorAudioFile from '../assets/sounds/error.mp3';

class _SoundManager {
    private clickSound: HTMLAudioElement;
    private hoverSound: HTMLAudioElement;
    private errorSound: HTMLAudioElement;

    constructor() {
        this.clickSound = new Audio(clickAudioFile);
        this.hoverSound = new Audio(hoverAudioFile);
        this.errorSound = new Audio(errorAudioFile);
    }

    playClickSound() {
        this.clickSound.currentTime = 0;
        this.clickSound.play();
    }

    playHoverSound() {
        this.hoverSound.currentTime = 0;
        this.hoverSound.play();
    }

    playError() {
        this.errorSound.currentTime = 0;
        this.errorSound.play();
    }

    playLoopError() {
        this.errorSound.currentTime = 0;
        this.errorSound.loop = true;
        this.errorSound.play();
    }

    stopLoopError() {
        this.errorSound.loop = false;
        this.errorSound.pause();
        this.errorSound.currentTime = 0;
    }
}

const SoundManager = new _SoundManager();
export default SoundManager;