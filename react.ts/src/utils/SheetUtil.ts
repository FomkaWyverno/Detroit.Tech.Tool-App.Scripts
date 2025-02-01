import { LocalizationSheetKey, LocalizationSheetKeyBuilder } from "../models/localization/LocalizationSheetKey";
import { Row } from "../models/sheet/Row";
import { Sheet } from "../models/sheet/Sheet";

const enum SheetColumnName {
    KEY = 'Key-Translate',
    CONTAINER_ID = 'Container-ID',
    
}

export function parseSheetToLocalizationSheetKeys(sheet: Sheet): Array<LocalizationSheetKey> {
    const sheetKeys: Array<LocalizationSheetKey> = [];
    if (sheet.length() == 0) return sheetKeys;

    const rows: Row[] = sheet.getRows().slice(1);

    let startKeyIndexRow: number = 0;
    let latestContainerId: number = getContainerIdFromSheet(sheet, 1);
    let latestKey: string = getKeyFromSheet(sheet, 1);

    console.log(rows);
    if (!latestContainerId || !latestKey) throw new Error(`Bad structure Sheet: "${sheet.getSheetName()}" First row don't has value for Container-ID and Key`);

    for (let i = 1; i < rows.length; i++) {
        const currentContainerId: number = getContainerIdFromSheet(sheet, i+1);
        const currentKey: string = getKeyFromSheet(sheet, i+1);

        if (currentContainerId && currentKey) {
            const sheetKey: LocalizationSheetKey = new LocalizationSheetKeyBuilder()
                    .setIndexStartRow(startKeyIndexRow+1)           // Додаємо один, щоб нормалізувати індекс. Так як ми прибрали перший ряд з заголовком. У нас 0 вказує на 1 індекс з рядками де є заголовок.
                                                                    // Тому якщо це був 0 індекс. 0 + 1 = 1 індекс, у таблиці це буде 2 рядок.
                    .setIndexEndColumn(sheet.getRow(i).length()-1)

                    .setIndexEndRow(i)                      // Не додаємо один, для нормалізації. Через, те що воно вже нормалізоване, через те, що "i" у массиві рядків з заголовком буде вказувати на попередній рядок.
                                                            // Тобто якщо у нас у третьому рядку інший ключ лежить, у таблиці це індекс рядка буде другим, так як я прибрав перший ряд з заголовком, у цьому массиві цей індекс буде 1.
                                                            // Це якраз вкаже у повноціній таблиці на точний варіант. Індекс 1 вкаже на 2 рядок у повній таблиці
                                                            // Ситуація з startKeyIndexRow інакша, бо початок індекста відстає на один індекс, тому потрібно його додати.
                    .setContainerId(latestContainerId)
                    .setKey(latestKey)
                    .build();                                   
            
            sheetKeys.push(sheetKey);
            
            startKeyIndexRow = i;
            latestContainerId = currentContainerId;
            latestKey = currentKey;

        } else if (currentContainerId || currentKey) {
            throw new Error(`Bad structure Sheet: "${sheet.getSheetName()}" - Row: ${i+2}. Has only СontainerId or only Key`);
        }
    }

    sheetKeys.push(new LocalizationSheetKeyBuilder() // Додаємо останній ключик.
                .setIndexStartRow(startKeyIndexRow)
                .setIndexEndColumn(sheet.getRow(sheet.length() - 1).length()-1)
                .setIndexEndRow(sheet.length()-1)
                .setContainerId(latestContainerId)
                .setKey(latestKey)
                .build());

    return sheetKeys;
}

function getContainerIdFromSheet(sheet: Sheet, indexRow: number): number {
    const row = sheet.getRow(indexRow);
    const value = row.getValue(sheet.getColumnByHeaderName(SheetColumnName.CONTAINER_ID));
    return parseInt(value);
}

function getKeyFromSheet(sheet: Sheet, indexRow: number): string {
    return sheet.getRow(indexRow).getValue(sheet.getColumnByHeaderName(SheetColumnName.KEY));
}