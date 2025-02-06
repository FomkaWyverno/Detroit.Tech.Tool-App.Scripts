export interface LocalizationText { // Локалізаційний текст
    text: string,
    hasLink: boolean,
    linkExists: boolean
}

export type ContainerLocalization = Record<string, LocalizationText>; // Контейнер локалізації, зберігає всі текстові локалізації за текстовим ключем. Як приклад - MENU_FLOWCHART_04K_START
export type LocalizationData = Record<number, ContainerLocalization>; // Файл локалізації, зберігає контейнери. Як приклад - 2048

export interface AddedLocalizationSheetKey {
    sheetName: string,
    indexRow: number,
    indexColumn: number,
    numRows: number,
    numColumns: number
}