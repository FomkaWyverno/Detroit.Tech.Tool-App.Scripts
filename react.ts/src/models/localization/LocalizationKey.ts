export class LocalizationKey { // Локалізаційний текст, який має всю інформацію про ключ, включно з його ключем та контейнером де він знаходиться.
    public static readonly patternCode = /^!(.+?)! (.+)?/
    public static readonly patternVoiceKey = /.+?_.+?_.+?_.+?_(.+?)_.+/;

    public readonly text: string;
    public readonly code: string;
    public readonly voiceKey: string;
    public readonly isVoice: boolean;

    /**
     * Конструктор LocalizationKeyText - який описує ключ локалізації
     * @param containerId Контейнер айді де лежить ключ локалізації
     * @param key Назва ключа локалізації
     * @param ogirinalText текст локалізації
     * @param hasLink зі структури локалізації визначає чи є посилання на аудіо чи щось таке.
     * @param linkExists зі структури локалізації визначає чи є існуючи посилання на аудіо чи щось таке.
     */
    constructor(
        public readonly containerId: number,
        public readonly key: string,
        public readonly ogirinalText: string,
        hasLink: boolean,
        linkExists: boolean
    ) {
        const {code, text} = LocalizationKey.unpackOriginalText(ogirinalText); 
        this.code = code;
        this.text = text;
        this.voiceKey = LocalizationKey.getVoiceKey(key);
        this.isVoice = hasLink && linkExists;
    }


    /**
     * Розпаковує оригінальний текст, виділяючи з нього код і основний текст.
     * Очікується, що текст має формат: `!КОД! Текст локалізації`.
     * 
     * У оригіналі гра має лише Текст Локалізації. Ми додали для кожного ключа локалізації Код на початок локалізаці, за для швидкого пошуку локалізаційного ключа.
     * @param originalText Оригінальний текст з локалізації у форматі `!КОД! Текст локалізації`
     * @returns Повертає об'єкт який містить поле code та text - текст локалізації без коду.
     */
    private static unpackOriginalText(originalText: string): {code: string, text: string} {
        const matches = LocalizationKey.patternCode.exec(originalText);
        if (matches) return {code: matches[1], text: matches[2] ?? ''};
        throw new Error(`Not found code and text for LocalizationKeyText. Original Text - ${originalText}`);
    }


    /**
     * Повертає голосовий ключ (voiceKey) із заданого ключа локалізації.
     * Очікується, що ключ має формат: `metaText_metaText_metaText_metaText_VOICE-KEY_metaText`.
     * Приклад: X0101X_TERRACE_PARTI_PC_X01CONNOR_TRUTH0101V2 - Результат: X01CONNOR
     * 
     * @param key Ключ локалізації, що містить голосовий ідентифікатор.
     * @returns Повертає голосовий ключ або `"-"`, якщо формат ключа не відповідає очікуваному.
     */
    private static getVoiceKey(key: string): string {
        const matches = LocalizationKey.patternVoiceKey.exec(key);
        if (matches) return matches[1];
        return '-';
    }
}