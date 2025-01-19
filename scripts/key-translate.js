const patternCode = /^!(.+?)! (.+)?/
const patternVoiceKey = /.+?_.+?_.+?_.+?_(.+?)_.+/;

class KeyTranslate {
    constructor(id, key, text, hasVoice) {
        this.id = id;
        this.key = key;
        this.hasVoice = hasVoice;

        text = this.escapeMetaSymbols(text);
        let groupText = patternCode.exec(text);

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

function parseJsonToArrayKey(json, progressFunc) { // Парсить JSON який містить ключі локалізації Детрайта в массив ключів
    return new Promise((resolve, reject) => {    
        const array = [];
        const ids = Object.keys(json);

        let index = 0;
        let total_keys = 0;
        let processeKeys = 0;
        ids.forEach(id => {
            total_keys += Object.keys(json[id]).length;
        })
        function processNext() {
            if (index < ids.length) {
                const id = ids[index];
                Object.keys(json[id]).forEach(key => {
                    const text = json[id][key].text;
                    const hasVoice = json[id][key].hasLink && json[id][key].linkExists;
                    array.push(new KeyTranslate(id, key, text, hasVoice));
                    progressFunc(++processeKeys, total_keys)
                });
                index++;
                setTimeout(processNext, 0)
            } else {
                resolve(array);
            }
        }

        try {
            processNext();
        } catch(error) {
            reject(error)
        }
    });
}