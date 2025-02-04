

export class LocalizationFragments {
    public readonly prefixes: string[] = [];
    public readonly texts: string[] = [];
    public readonly suffix: string = '';

    constructor(originalText: string) {
        this.parseText(originalText);
    }

    private parseText(originalText: string): void {
        const regex: RegExp = /{[^{}]+?}|<[^<>]+?>|\\r|\\n/g;
        const tags = [...originalText.matchAll(regex)];
        if (tags.length == 0) { // Якщо тегів немає, додаємо весь текст, як чистий текст
            this.texts.push(originalText);
            return;
        }
        
        let index = 0;
        tags.forEach(tag => {
            const tagText = tag[0];
            const index = tag.index;
            
        })
    }
}