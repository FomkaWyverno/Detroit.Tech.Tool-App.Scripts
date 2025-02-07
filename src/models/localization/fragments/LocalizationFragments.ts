import { Tag } from "./Tag";

/**
 * Клас LocalizationFragments використовується для розбиття тексту на фрагменти з урахуванням тегів.
 * Теги визначаються за допомогою регулярного виразу.
 */
export class LocalizationFragments {
    // Регулярний вираз для визначення тегів у тексті
    private static readonly TAG_REGEX = /^\s+|\s*{[^{}]+?}\s*|\s*<[^<>]+?>\s*|\s*\\r\s*|\s*\\n\s*/g

     /** Масив префіксів, які відповідають тегам у тексті */
    public readonly prefixes: string[] = [];

    /** Масив чистих текстових фрагментів між тегами */
    public readonly texts: string[] = [];

    /** Суфікс тексту, якщо він існує */
    public get suffix(): string {
        return this._suffix;
    }

    /** Приватне поле для збереження значення суфікса */
    private _suffix: string = '';

    /**
     * Конструктор класу, який розбиває вхідний текст на фрагменти та ініціалізує відповідні поля.
     * @param originalText - сирий текст для аналізу
     */
    constructor(originalText: string) {
        if (typeof originalText !== 'string') {
            throw new Error('Excepted a string as input');
        }
        this.parseText(originalText);
    }

    /**
     * Основний метод для розбору тексту та ініціалізації фрагментів.
     * @param originalText - сирий текст
     */
    private parseText(originalText: string): void {
        // Знаходимо всі теги у тексті
        const foundTags = [...originalText.matchAll(LocalizationFragments.TAG_REGEX)];
        if (foundTags.length == 0) { // Якщо тегів немає, додаємо весь текст, як чистий текст
            this.prefixes.push('');
            this.texts.push(originalText);
            return;
        }

        const tags: Array<Tag> = [];

        // Якщо текст починається з текстового фрагмента перед першим тегом
        if (foundTags[0].index > 0) { // Робимо заглушку, створюючи порожній тег, який має бути по індексу на один символ лівіше ніж, текст, тому це -1, так як текст починається з 0
            tags.push(new Tag('', -1, -1));
        }

        // Додаємо теги до масиву, об'єднуючи їх за необхідності
        let prevTag: Tag = new Tag('', 0, 0);
        foundTags.forEach(tag => { prevTag = this.mergeOrAddTag(tags, tag, prevTag) });

        // Генеруємо фрагменти тексту на основі отриманих тегів
        this.generateFragments(tags, originalText);
    }

    /**
     * Додає або об'єднує тег у список тегів.
     * @param tags - список існуючих тегів
     * @param newTag - новий тег, знайдений у тексті
     * @param prevTag - попередній тег для перевірки на об'єднання
     * @returns Новий тег для подальшої перевірки
     */
    private mergeOrAddTag(tags: Array<Tag>, newTag: RegExpExecArray, prevTag: Tag): Tag {
        const currentTag = new Tag(newTag[0], newTag.index, newTag.index + newTag[0].length - 1);
        if (prevTag.endIndex + 1 == currentTag.startIndex && tags.length > 0) { // Якщо попередній тег, закінчується відразу де й починається наступний, тоді додаємо це як один тег.
            tags[tags.length - 1] = new Tag(prevTag.tagStr + currentTag.tagStr, prevTag.startIndex, currentTag.endIndex);
            return tags[tags.length - 1];
        }

        tags.push(currentTag);
        return currentTag;
    }

    /**
     * Генерує фрагменти тексту (префікси, тексти та суфікс) на основі тегів.
     * @param tags - список тегів
     * @param originalText - вихідний текст
     */
    private generateFragments(tags: Array<Tag>, originalText: string): void {
        for (let i = 0; i < tags.length; i++) {
            const tag: Tag = tags[i];
            this.prefixes.push(tag.tagStr);
            if (i == 0) {
                // Додаємо текст перед першим тегом, якщо він існує
                if (tag.startIndex > 0) {
                    this.texts.push(originalText.substring(0, tag.startIndex));
                }
                continue;
            }
            const prevTag: Tag = tags[i - 1];
            // Додаємо текст між тегами
            this.texts.push(originalText.substring(prevTag.endIndex + 1, tag.startIndex));
        }

        const latestTag: Tag = tags[tags.length - 1];
        // Якщо текст після останнього тега існує, додаємо його до списку текстів,
        // інакше останній префікс вважається суфіксом
        if (latestTag.endIndex != originalText.length - 1) {
            this.texts.push(originalText.substring(latestTag.endIndex + 1));
        } else {
            this._suffix = this.prefixes.pop()!;
        }
    }
}