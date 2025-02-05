import { LocalizationFragments } from './fragments/LocalizationFragments';
import { BaseLocalizationKey } from "./BaseLocalizationKey";

export class LocalizationKey extends BaseLocalizationKey { // Локалізаційний текст, який має всю інформацію про ключ, включно з його ключем та контейнером де він знаходиться.
    private static readonly patternCode = /^!(.+?)! (.+)?/

    public readonly text: string;
    public readonly code: string;
    public readonly fragments: LocalizationFragments;

    /**
     * Конструктор LocalizationKeyText - який описує ключ локалізації
     * @param containerId Контейнер айді де лежить ключ локалізації
     * @param key Назва ключа локалізації
     * @param ogirinalText текст локалізації
     * @param hasLink зі структури локалізації визначає чи є посилання на аудіо чи щось таке.
     * @param linkExists зі структури локалізації визначає чи є існуючи посилання на аудіо чи щось таке.
     */
    constructor(
        containerId: number,
        key: string,
        public readonly ogirinalText: string,
        hasLink: boolean,
        linkExists: boolean
    ) {
        super(containerId, key, hasLink && linkExists);
        const {code, text} = LocalizationKey.unpackOriginalText(ogirinalText); 
        this.code = code;
        this.text = text;
        this.fragments = new LocalizationFragments(text);
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
}