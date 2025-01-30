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
}