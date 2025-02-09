import hoverAudioFile from '/sounds/hover.ogg';
import clickAudioFile from '/sounds/click.ogg';
import errorAudioFile from '/sounds/error.mp3';
import error2AudioFile from '/sounds/error2.mp3';
import errorKeyInSheetAudioFile from '/sounds/error-key-in-sheet.mp3';
import errorKeyNoExists from '/sounds/error-key-no-exists.mp3'
import popAudioFile from '/sounds/pop.mp3';

class _SoundManager {
    private clickSound: HTMLAudioElement;
    private hoverSound: HTMLAudioElement;
    private errorSound: HTMLAudioElement;
    private error2Sound: HTMLAudioElement;
    private errorKeyInSheetSound: HTMLAudioElement;
    private errorKeyNoExistsSound: HTMLAudioElement;
    private popSound: HTMLAudioElement;

    constructor() {
        this.clickSound = new Audio(clickAudioFile);
        this.hoverSound = new Audio(hoverAudioFile);
        this.errorSound = new Audio(errorAudioFile);
        this.error2Sound = new Audio(error2AudioFile);
        this.errorKeyInSheetSound = new Audio(errorKeyInSheetAudioFile);
        this.errorKeyNoExistsSound = new Audio(errorKeyNoExists);
        this.popSound = new Audio(popAudioFile);
    }

    private playSound(sound: HTMLAudioElement, volume: number = 1) {
        sound.currentTime = 0;
        sound.volume = volume;
        sound.play();
    }

    private playLoopSound(sound: HTMLAudioElement, volume: number = 1) {
        sound.currentTime = 0;
        sound.volume = volume;
        sound.loop = true;
        sound.play();
    }

    private stopLoopSound(sound: HTMLAudioElement) {
        sound.pause();
        sound.currentTime = 0;
        sound.volume = 1;
        sound.loop = false;
    }

    playClickSound(volume: number = 1) {this.playSound(this.clickSound, volume);}
    playHoverSound(volume: number = 1) {this.playSound(this.hoverSound, volume);}
    playError(volume: number = 1) {this.playSound(this.errorSound, volume);}
    playError2(volume: number = 1) {this.playSound(this.error2Sound, volume);}
    playKeyInSheet(volume: number) {this.playSound(this.errorKeyInSheetSound, volume);}
    playKeyNoExists(volume: number) {this.playSound(this.errorKeyNoExistsSound, volume);}
    playPop(volume: number = 1) {this.playSound(this.popSound, volume);}
    playLoopError(volume: number = 1) {this.playLoopSound(this.errorSound, volume)}
    stopLoopError() {this.stopLoopSound(this.errorSound);}
}

const SoundManager = new _SoundManager();
export default SoundManager;