import { Range } from './../sheet/Range';

/**
 * Представляє ключ локалізації у електронному аркуші.
 */
export class LocalizationSheetKey {

    /**
     * Створює новий екземпляр `LocalizationSheetKey`.
     *
     * @param {Range} locationKey Діапазон (`Range`), що містить ключ локалізації у таблиці.
     * @param {number} containerId Ідентифікатор контейнера, до якого прив’язаний ключ.
     * @param {string} key Сам ключ локалізації.
     * @param {string | undefined} actorName Додатковий параметр, який може містити актора (необов’язковий).
     */
    constructor(
        public readonly locationKey: Range,
        public readonly containerId: number,
        public readonly key: string,
        public readonly actorName: string | undefined
    ) {}
}