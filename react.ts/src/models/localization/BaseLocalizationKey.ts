export class BaseLocalizationKey {
    constructor(
        public readonly containerId: number,
        public readonly key: string,
    ) {}

    /**
     * @returns Повертає унікальний індифікатор ключа який складається з контейнера та ключа локалізації, через крапку 
     */
    public getUniquiKey(): string {
        return `${this.containerId}.${this.key}`;
    }
}