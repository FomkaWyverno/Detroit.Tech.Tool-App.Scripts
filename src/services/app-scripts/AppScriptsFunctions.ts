import { AddedLocalizationSheetKey } from '../../types/localization/localization';
import { AppScripts } from './AppScripts';

/**
 * Клас для взаємодії з функціями, доступними в Google Apps Script.
 * Використовує методи для взаємодії з App Scripts через клас `AppScripts`.
 */
export class AppScriptsFunctions {

    public static readonly implementedFunctions: Array<string> = [
        'listFunctions',
        'getSheetNames',
        'getValueSheet'
    ];

    /**
     * Створює екземпляр `AppScriptsFunctions` для роботи з функціями App Scripts.
     * 
     * @param {AppScripts} appScripts Екземпляр класу `AppScripts`, що забезпечує зв'язок з Google Apps Script.
     * @param {number} timeout Час очікування на відповідь (в мілісекундах). За замовчуванням 30000 мс.
     */
    constructor(
        private readonly appScripts: AppScripts,
        private readonly timeout: number = 30000
    ) {}

    /**
     * Створює новий екземпляр `AppScriptsFunctions` з оновленим значенням тайм-ауту.
     * 
     * @param {number} timeout Новий час очікування на відповідь (в мілісекундах).
     * @returns {AppScriptsFunctions} Новий екземпляр класу `AppScriptsFunctions` з оновленим тайм-аутом.
     */
    public withTimeout(timeout: number): AppScriptsFunctions {
        return new AppScriptsFunctions(this.appScripts, timeout);
    }

    /**
     * Отримує список доступних функцій в Google Apps Script.
     * Викликає відповідну функцію в App Scripts і чекає на результат.
     * 
     * @returns {Promise<Array<string>>} Проміс, яка містить масив назв функцій, доступних у Google Apps Script.
     */
    public listFunctions(): Promise<Array<string>> {
        return this.appScripts.sendToAppScript<Array<string>>('listFunctions', this.timeout);
    }

    
    /**
    * Отримує список назв аркушів у Google Таблицях.
     * Викликає відповідну функцію в Google Apps Script та повертає масив назв аркушів.
     *
     * @returns {Promise<Array<string>>} Проміс, яка містить масив назв аркушів.
     */
    public getSheetNames(): Promise<Array<string>> {
        return this.appScripts.sendToAppScript<Array<string>>('getSheetNames', this.timeout);
    }

    public getValueSheet(sheetName: string): Promise<string[][]> {
        return this.appScripts.sendToAppScript<string[][]>('getValueSheet', this.timeout, sheetName);
    }
    


    /**
     * Відображає вказаний діапазон клітинок у Google Таблиці.
     * 
     * @param {string} sheetName Назва аркуша, в якому потрібно виділити діапазон.
     * @param {number} indexRow Індекс початкового рядка (починається з 1).
     * @param {number} indexColumn Індекс початкової колонки (починається з 1).
     * @param {number} numRows Кількість рядків у діапазоні.
     * @param {number} numColumns Кількість колонок у діапазоні.
     */
    public showRange(sheetName: string, indexRow: number, indexColumn: number, numRows: number, numColumns: number): Promise<void> {
        return this.appScripts.sendToAppScript<void>('showRange', this.timeout, sheetName, indexRow, indexColumn, numRows, numColumns);
    }

    /**
     * Додаємо локалізаційний ключ до таблиці
     * @param {number} containerId айді контейнера
     * @param {string} key Локалізаційний ключ
     * @param {string} gameText сирий текст, як він відображається прямо в грі
     * @param {[string]} prefixes массив префіксів які потрібно додати
     * @param {[string]} texts  массив текстів які потрібно додати
     * @param {string} suffix  Суфікс який потрібно 
     * 
     * @param {string} context Контекст ключа
     * @param {string} timing Таймінг, якщо це відео
     * @param {?string} actor Якщо це діалоги, має бути присутнім назва актора, якщо це не діалоги, тоді цей параметр має бути відсутнім, тобто null
     */
    public addLocalizationKey(containerId: number, key: string, gameText: string, prefixes: string[], texts: string[], suffix: string, context: string, timing: string, actor?: string

    ): Promise<AddedLocalizationSheetKey> {
        return this.appScripts.sendToAppScript<AddedLocalizationSheetKey>('addLocalizationKey', this.timeout, containerId, key, gameText, prefixes, texts, suffix, context, timing, actor);
    }
}