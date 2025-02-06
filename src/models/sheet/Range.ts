/**
 * Представляє діапазон (`Range`) комірок у межах певного аркуша (`Sheet`).
 */

export class Range {
    
    /**
     * Створює новий екземпляр `Range`.
     *
     * @param {string} sheetName Назва аркуша, до якого належить діапазон.
     * @param {number} indexRow Індекс початкового рядка (нумерація з 0).
     * @param {number} indexColumn Індекс початкової колонки (нумерація з 0).
     * @param {number} [numRows=1] Кількість рядків у діапазоні (за замовчуванням 1).
     * @param {number} [numColumns=1] Кількість колонок у діапазоні (за замовчуванням 1).
     */
    constructor(
        public readonly sheetName: string,
        public readonly indexRow: number,
        public readonly indexColumn: number,
        public readonly numRows: number = 1,
        public readonly numColumns: number = 1
    ) {}

    private toNumRow(indexRow: number): number {
        return indexRow + 1;
    }

    private toColumnLetter(indexColumn: number): string {
        let letter = '';
        let col = indexColumn + 1;

        while (col > 0) {
            col--;
            letter = String.fromCharCode(65 + (col % 26)) + letter;
            col = Math.floor(col / 26);
        }
        return letter;
    }

    public toA1Notation(): string {
        const startColumn = this.toColumnLetter(this.indexColumn);
        const startRow = this.toNumRow(this.indexRow);

        if (this.numColumns == 1 && this.numRows == 1) {
            return `'${this.sheetName}'!${startColumn}${startRow}`;
        }

        const endColumn = this.toColumnLetter(this.indexColumn + this.numColumns - 1);
        const endRow = this.toNumRow(this.indexRow + this.numRows - 1);

        return `'${this.sheetName}'!${startColumn}${startRow}:${endColumn}${endRow}`;
    }
}