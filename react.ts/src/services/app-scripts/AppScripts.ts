import { AppScriptsMessage } from '../../types/app-scripts/AppScriptsMessage';
import { AppScriptsResponse, AppScriptsResponseError, AppScriptsResponseResult } from '../../types/app-scripts/AppScriptsResponse';
import randomString from '../../utils/RandomUtil';
import { MessageHandler } from './../../types/app-scripts/MessageHandler';
import { AppScriptsFunctions } from './AppScriptsFunctions';

/**
 * Клас, що надає інтерфейс для взаємодії з Google Apps Script через iframe.
 * Використовує повідомлення між вікнами для обміну даними та запитами.
 */
export class AppScripts {
    
    
    /**
     * Кількість одночасних викликів до AppScripts можливо здійснити
     */
    public static readonly SIMULTANEOUS_CALLS = 30;
     /**
     * URL для відправки повідомлень у Google Apps Script.
     */
    private static readonly APP_SCRIPT_ORIGIN: string = 'https://n-uywikia63oagjz65bsvspgum75gx225t5vjwibi-0lu-script.googleusercontent.com';
    /**
     * Єдиний екземпляр класу.
     */
    private static instance: AppScripts;
     /**
     * Словник для збереження обробників повідомлень.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private readonly messageHandlers: Map<string, MessageHandler<any>> = new Map();
    /**
     * Об'єкт для взаємодії з функціями Google Apps Script.
     */
    public readonly scripts: AppScriptsFunctions = new AppScriptsFunctions(this);

    /**
     * Конструктор класу. ініціалізує слухача повідомлень для взаємодії з iframe.
     */
    private constructor() {
        // Обробник для отримання відповіді від AppScript <iframe> вікна
        this.initHandleWindowMessage();
    }

    /**
     * Ініціалізує обробник повідомлень, що надходять з iframe.
     * Перевіряє джерело повідомлення та обробляє результат або помилку.
     */
    private initHandleWindowMessage() {
        window.addEventListener('message', (event) => {
            // Перевірка джерела повідомлення
            if (event.origin !== AppScripts.APP_SCRIPT_ORIGIN)  {
                console.error(`Origin BAD: ${event.origin}`);
                return;
            }
            const messageData = event.data as AppScriptsResponse;

            if (messageData) { // Чи існує якісь данні з повідомлення
                if ('messageId' in messageData) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const messageHandler: MessageHandler<any> | undefined = this.messageHandlers.get(messageData.messageId);

                    if (messageHandler) {
                        if ('result' in messageData) {
                            const messageResult = messageData as AppScriptsResponseResult;
                            messageHandler.resolve(messageResult.result);
                        } else if ('errorMessage' in messageData) {
                            const messageError = messageData as AppScriptsResponseError;
                            messageHandler.reject(messageError.errorMessage);
                        } else {
                            console.error(`Error: Callback from AppScript don't have result or errorMessage -`);
                            console.error(messageData);
                        }

                        this.messageHandlers.delete(messageData.messageId);
                    }
                } else {
                    const errorMessage = `MESSAGE FROM WINDOW DON'T HAS "MESSAGE ID`;
                    throw new Error(errorMessage);
                }
            } else {
                throw new Error(`MESSAGE FROM WINDOW DON'T HAS DATA`);
            }
        });
    }

    /**
     * Перевіряє, чи всі функції, на які є посилання у об'єкті `scripts`, реалізовані в Google Apps Script.
     * 
     * @throws {Error} Якщо одна з функцій не реалізована в Apps Script.
     */
    private async validationAppFunctions() {
        const googleAppScriptFunctions: string[] = await this.scripts.listFunctions();
        const functionsInApp: string[] = AppScriptsFunctions.implementedFunctions;

        for (const functionName of functionsInApp) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const isMethod: boolean = typeof (this.scripts as any)[functionName] === 'function';
            if (isMethod && !googleAppScriptFunctions.includes(functionName)) {
                throw new Error(`App Scripts: The function is not implemented: ${functionName}`);
            } 
        }
    }

    /**
     * Відправляє повідомлення на Google Apps Script та чекає на відповідь.
     * 
     * @param {string} functionName Назва функції в Google Apps Script, яку потрібно викликати.
     * @param {number} timeout Час очікування на відповідь (в мілісекундах).
     * @param {...any} args Аргументи, що передаються функції в Google Apps Script.
     * @returns {Promise<T>} Проміс, яка містить результат виконання функції або помилку.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public sendToAppScript<T>(functionName: string, timeout: number, ...args: any): Promise<T> {

        const messageID: string = randomString();

        const message: AppScriptsMessage = {
            messageId: messageID,
            functionName: functionName,
            args: args
        }

        const promise: Promise<T> = new Promise<T>((resolve, reject) => {
            const timer = window.setTimeout(() => {
                reject(new Error(`Timeout: No response for function "${functionName}" after ${timeout}ms`));
            }, timeout);

            this.messageHandlers.set(messageID, {
                resolve: (result: T) => {
                    window.clearTimeout(timer);
                    resolve(result);
                },
                reject: (error: string) => {
                    window.clearTimeout(timer);
                    reject(error);
                }
            } as MessageHandler<T>);
        });

        window.parent.postMessage(message, AppScripts.APP_SCRIPT_ORIGIN);
        
        return promise;
    }
    
    /**
     * Отримує єдиний екземпляр класу `AppScripts` і виконує ініціалізацію.
     * 
     * @returns {Promise<AppScripts>} Обіцянка, яка містить екземпляр класу `AppScripts`.
     * 
     * @throws {Error} - Якщо сталась помилка при ініцілізації з `AppScripts`
     */
    public static async getInstance(): Promise<AppScripts> {
        if (AppScripts.instance) return AppScripts.instance;
        AppScripts.instance = new AppScripts();
        try {
            await AppScripts.instance.validationAppFunctions();
            return AppScripts.instance;
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(`Initialization AppScripts: ${e.message}`);
            }
            throw e;
        }
    }
}   
