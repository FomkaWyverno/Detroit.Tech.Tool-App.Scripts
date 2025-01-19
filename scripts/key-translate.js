const patternCode = /^!(.+?)! (.+)?/
const patternVoiceKey = /.+?_.+?_.+?_.+?_(.+?)_.+/;

class KeyTranslate {
    constructor(id, key, text, hasVoice) {
        this.id = id;
        this.key = key;
        this.hasVoice = hasVoice;

        text = this.escapeMetaSymbols(text);
        let groupText = patternCode.exec(text);

        console.log(`id: ${id}, key: ${key}, text: ${text}, hasVoice: ${hasVoice}`)
        this.code = groupText[1];
        this.text = groupText[2];

        if (this.hasVoice) { // Якщо це ключ репліки
            let groupCharacter = patternVoiceKey.exec(this.key);
            this.characterCode = groupCharacter[1];
        }
    }

    escapeMetaSymbols(text) { // Екранація метасимволів
        let metasymbols = {
            "\n": "\\n",
            "\r": "\\r"
        };

        return text.replace(/[\r\n]/g, function (match) { return metasymbols[match]; });
    }
}