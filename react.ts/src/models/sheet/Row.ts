/**
 * Представляє один рядок таблиці, що складається з комірок (`Cell`).
 */

export class Row {

    /**
     * Створює новий екземпляр Row.
     * @param cells Масив значень комірок у рядку.
     */
    constructor(
        private readonly cells: string[]
    ) { }

    /**
     * Отримує значення комірки за її індексом.
     * @param indexCell Індекс комірки.
     * @returns Значення комірки.
     * @throws {Error} Якщо індекс виходить за межі масиву комірок.
     */
    public getValue(indexCell: number): string {
        if (indexCell >= this.cells.length) throw new Error(`Cell access error: Attempted to access Cell at index ${indexCell}, but Row length is ${this.cells.length}`);
        return this.cells[indexCell];
    }

    /**
     * Отримує всі комірки рядка.
     * @returns Масив значень комірок (`string[]`).
     */
    public getCells(): string[] {
        return this.cells;
    }

    /**
     * Отримує кількість комірок у рядку.
     * @returns Кількість комірок у рядку.
     */
    public length(): number {
        return this.cells.length;
    }
}
