import hoverAudioFile from '../assets/sounds/hover.ogg';
import clickAudioFile from '../assets/sounds/click.ogg';

class _SoundManager {
    private clickSound: HTMLAudioElement;
    private hoverSound: HTMLAudioElement;

    constructor() {
        this.clickSound = new Audio(clickAudioFile);
        this.hoverSound = new Audio(hoverAudioFile);
    }

    playClickSound() {
        this.clickSound.currentTime = 0;
        this.clickSound.play();
    }

    playHoverSound() {
        this.hoverSound.currentTime = 0;
        this.hoverSound.play();
    }
}

const SoundManager = new _SoundManager();
export default SoundManager;