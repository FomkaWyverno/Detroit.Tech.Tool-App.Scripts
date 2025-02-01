import { Sheet } from "./Sheet";

/**
 * Представляє діапазон (`Range`) комірок у межах певного аркуша (`Sheet`).
 */

export class Range {
    
    /**
     * Створює новий екземпляр `Range`.
     *
     * @param {Sheet} sheet Аркуш, до якого належить діапазон.
     * @param {number} indexRow Індекс початкового рядка (нумерація з 0).
     * @param {number} indexColumn Індекс початкової колонки (нумерація з 0).
     * @param {number} [numRows=1] Кількість рядків у діапазоні (за замовчуванням 1).
     * @param {number} [numColumns=1] Кількість колонок у діапазоні (за замовчуванням 1).
     */
    constructor(
        public readonly sheet: Sheet,
        public readonly indexRow: number,
        public readonly indexColumn: number,
        public readonly numRows: number = 1,
        public readonly numColums: number = 1
    ) {}
}