import { Row } from "./Row";

/**
 * Представляє електронний аркуш із рядками (`Row`) та заголовками.
 */
export class Sheet {
    private readonly rows: Row[];
    private readonly header: Map<string, number> = new Map();

    /**
     * Створює новий екземпляр Sheet.
     * @param sheetName Назва аркуша.
     * @param values Двовимірний масив рядків, що містять значення комірок.
     */
    constructor(
        private readonly sheetName: string,
        values: string[][]
    ){
        const rows: Row[] = [];
        values.forEach(row => {
            rows.push(new Row(row));
        });
        this.rows = rows;
        if (this.rows.length > 0 && this.rows[0].length() > 0) {
            this.initHeader(this.rows[0]);
        }
    }

    /**
     * Ініціалізує заголовки на основі першого рядка.
     * @param headerRow Перший рядок аркуша, який містить заголовки.
     * @throws {Error} Якщо в заголовках є дублікати.
     */
    private initHeader(headerRow: Row): void {
        for (let i = 0; i < headerRow.length(); i++) {
            const headerValue: string = headerRow.getValue(i);
            if (!this.header.has(headerValue)) {
                this.header.set(headerValue, i);
            } else {
                throw new Error(`Sheet - "${this.sheetName}" has duplicate header column! Column: ${headerValue}`);
            }
        }
    }

     /**
     * Перевіряє, чи існує заголовок у таблиці.
     * @param headerName Назва заголовка.
     * @returns true, якщо заголовок існує, інакше false.
     */
    public hasHeader(headerName: string): boolean {
        return this.header.has(headerName);
    }

    /**
     * Отримує рядок за його індексом.
     * @param indexRow Індекс рядка.
     * @returns Рядок (`Row`).
     * @throws {Error} Якщо індекс виходить за межі масиву рядків.
     */
    public getRow(indexRow: number): Row {
        if (indexRow >= this.rows.length) throw new Error(`Rows access error: Attempted to access index ${indexRow}, but array of Rows length is ${this.rows.length}.`);
        return this.rows[indexRow];
    }

    /**
     * Отримує індекс колонки за її заголовком.
     * @param headerName Назва заголовка.
     * @returns Індекс колонки.
     * @throws {Error} Якщо заголовок не існує.
     */
    public getColumnByHeaderName(headerName: string): number {
        if (!this.hasHeader(headerName)) throw new Error(`An attempt was made to get a index from the non-existent header "${headerName}" in the sheet "${this.sheetName}"`);
        const indexColumn = this.header.get(headerName);
        if (indexColumn == null || indexColumn == undefined) throw new Error(`When trying to get the index of the column with the Header “${headerName}” in the “${this.sheetName}” sheet, the index in the map returned null or undefined`);
        return indexColumn;
    } 

    /**
     * Отримує значення комірки за індексами рядка та комірки.
     * @param indexRow Індекс рядка.
     * @param indexCell Індекс комірки в рядку.
     * @returns Значення комірки.
     * @throws {Error} Якщо індекс виходить за межі масиву рядків або комірок.
     */
    public getValue(indexRow: number, indexCell: number): string {
        return this.getRow(indexRow).getValue(indexCell);
    }

    /**
     * Отримує значення комірки за індексом рядка та назвою заголовка.
     * @param indexRow Індекс рядка.
     * @param headerName Назва заголовка.
     * @returns Значення комірки.
     * @throws {Error} Якщо заголовок не існує або індекс виходить за межі масиву рядків.
     */
    public getValueByHeaderName(indexRow: number, headerName: string): string {
        if (!this.hasHeader(headerName)) throw new Error(`An attempt was made to get a value from the non-existent header "${headerName}" in the sheet "${this.sheetName}"`);
        if (this.rows.length >= indexRow) throw new Error(`The index is out of bounds for the Rows array of length ${this.rows.length}. An attempt is made to get the index ${indexRow}.`);

        return this.getValue(indexRow, this.getColumnByHeaderName(headerName));
    }

     /**
     * Отримує всі рядки з аркуша.
     * @returns Масив рядків (`Row[]`).
     */
    public getRows(): Row[] {
        return this.rows;
    }

    
    /**
     * @returns {string} Повертає назву аркуша. 
     */
    public getSheetName(): string {
        return this.sheetName;
    }

    /**
     * Отримує кількість рядків у аркуші.
     * @returns Кількість рядків.
     */
    public length(): number {
        return this.rows.length;
    }
}