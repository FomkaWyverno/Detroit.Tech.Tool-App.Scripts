import { LocalizationSheetKey } from "../models/localization/LocalizationSheetKey";
import { Range } from "../models/sheet/Range";
import { Sheet } from "../models/sheet/Sheet";

/**
 * Перерахування назв колонок аркуша.
 */
const enum SheetColumnName {
    KEY = 'Key-Translate', // Колонка з ключами локалізації
    CONTAINER_ID = 'Container-ID', // Колонка з ідентифікаторами контейнерів
    
}

/**
 * Парсить аркуш (`Sheet`) у масив ключів локалізації (`LocalizationSheetKey`).
 *
 * @param {Sheet} sheet Аркуш, який потрібно розпарсити.
 * @returns {Array<LocalizationSheetKey>} Масив ключів локалізації.
 * @throws {Error} Якщо структура аркуша неправильна (немає `Container-ID` або `Key` у першому рядку).
 */
export function parseSheetToLocalizationSheetKeys(sheet: Sheet): Array<LocalizationSheetKey> {
    const sheetKeys: Array<LocalizationSheetKey> = [];
    if (sheet.length() == 0) return sheetKeys;

    const numColumnsSheet = sheet.getRow(0).length();

    let startKeyIndexRow: number = 1;
    let currentContainerId: number = getContainerIdFromSheet(sheet, startKeyIndexRow);
    let currentKey: string = getKeyFromSheet(sheet, startKeyIndexRow);

    if (!currentContainerId || !currentKey) throw new Error(`Bad structure Sheet: "${sheet.getSheetName()}" First row don't has value for Container-ID and Key`);

    for (let i = startKeyIndexRow+1; i < sheet.getRows().length; i++) {
        const nextContainerId: number = getContainerIdFromSheet(sheet, i);
        const nextKey: string = getKeyFromSheet(sheet, i);

        if (nextContainerId && nextKey) {
            const sheetRange: Range = sheet.getRange(startKeyIndexRow, 0, i - startKeyIndexRow, numColumnsSheet);
            const sheetKey: LocalizationSheetKey = new LocalizationSheetKey(sheetRange, currentContainerId, currentKey);                                  
            sheetKeys.push(sheetKey);
            
            startKeyIndexRow = i;
            currentContainerId = nextContainerId;
            currentKey = nextKey;

        } else if (nextContainerId || nextKey) {
            throw new Error(`Bad structure Sheet: "${sheet.getSheetName()}" - Row: ${i+1}. Has only СontainerId or only Key`);
        }
    }

    // Додаємо останній ключ локалізації
    const sheetRange: Range = sheet.getRange(startKeyIndexRow, 0, sheet.length() - startKeyIndexRow, numColumnsSheet);
    sheetKeys.push(new LocalizationSheetKey(sheetRange, currentContainerId, currentKey));

    return sheetKeys;
}

/**
 * Отримує `Container-ID` для заданого рядка аркуша.
 *
 * @param {Sheet} sheet Аркуш, з якого потрібно отримати значення.
 * @param {number} indexRow Індекс рядка (нумерація з 0).
 * @returns {number} Значення `Container-ID`, або `NaN`, якщо не вдалося розпарсити число.
 */
function getContainerIdFromSheet(sheet: Sheet, indexRow: number): number {
    const row = sheet.getRow(indexRow);
    const value = row.getValue(sheet.getColumnByHeaderName(SheetColumnName.CONTAINER_ID));
    return parseInt(value);
}

/**
 * Отримує `Key-Translate` для заданого рядка аркуша.
 *
 * @param {Sheet} sheet Аркуш, з якого потрібно отримати значення.
 * @param {number} indexRow Індекс рядка (нумерація з 0).
 * @returns {string} Значення ключа локалізації.
 */
function getKeyFromSheet(sheet: Sheet, indexRow: number): string {
    return sheet.getRow(indexRow).getValue(sheet.getColumnByHeaderName(SheetColumnName.KEY));
}