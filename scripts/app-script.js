class AppScripts {
    constructor() {
        this.appScriptIsInit = false;
        this.scripts = {};
    }

    static async getInstance() {
        if (AppScripts.instance) {
            return Apps.instance;
        }
        AppScripts.instance = new AppScripts();

        const DEFAULT_TIMEOUT = 30000;
        const APP_SCRIPT_ORIGIN = 'https://n-uywikia63oagjz65bsvspgum75gx225t5vjwibi-0lu-script.googleusercontent.com';

        const randomString = () => {
            const timePart = Date.now().toString(32); // Поточний час в базі 32
            const array = new Uint32Array(1); // Масив з одним випадковим числом
            crypto.getRandomValues(array); // Генерація випадкового числа
            const randomPart = array[0].toString(16); // Перетворення числа в шістнадцятковий формат
            return timePart + randomPart; // Об'єднуємо їх для створення унікального рядка
        }

        const messagedHandlers = new Map() // Мапа для повідомлень з AppScripts
        const initAppsScripts = async () => {
            // Обробник для отримання відповіді від AppScript <iframe> вікна
            window.addEventListener("message", (event) => {
                // Перевірка джерела повідомлення
                if (event.origin !== APP_SCRIPT_ORIGIN) return;

                if (event.data.messageId) { // Перевіряємо чи існує у повідомленні messageId
                    const messageHandler = messagedHandlers.get(event.data.messageId); // Беремо обробник повідомлення
                    if (messageHandler) { // Перевіряємо чи існує обробник повідомлення
                        if (event.data.result !== undefined) { // Якщо прийшов результат виконання
                            messageHandler.resolve(event.data.result) // Повертаємо результат
                        } else if (event.data.errorMessage !== undefined) { // Якщо прийшла помилка
                            messageHandler.reject(event.data.errorMessage)  // Повертаємо помилку
                        } else { // Якщо не немає ні результата, та немає помилки виконання, щось не так на боці АппСкрипт
                            console.error(`Error: Callback from AppScript don't have result or errorMessage -`)
                            console.error(event.data)
                        }
                        messagedHandlers.delete(event.data.messageId);
                    }
                } else { // Якщо не існує message ID то щось пішло не так з AppScript
                    const errorMessage = `MESSAGE FROM WINDOW DON'T HAS "MESSAGE ID`;
                    console.error(event.data)
                    throw new Error(errorMessage, event.data)
                }});
            const functionsAppsScripts = await sendToAppScript('listFunctions', DEFAULT_TIMEOUT) // Отримуємо всі функції у AppScripts
                .catch(error => {
                    error.message = 'Failed to initialize scripts: ' + error.message;
                    throw error;
                });

            if (functionsAppsScripts === undefined) {
                console.warn('No functions were initialized from AppScript.');
                return;
            }

            AppScripts.instance.scripts = {};

            functionsAppsScripts.forEach(functionName => {
                AppScripts.instance.scripts[functionName] = async (...args) => {
                    return sendToAppScript(functionName, DEFAULT_TIMEOUT, args)
                                .catch(error => {
                                    throw new Error('Exception on AppScript side: ' + error);
                                });
                }
            });

            AppScripts.instance.withTimeout = (timeout) => {
                const proxyApp = {scripts: {}}
                functionsAppsScripts.forEach(functionName => {
                    proxyApp.scripts[functionName] = async (...args) => {
                        return sendToAppScript(functionName, timeout, args)
                                    .catch(error => {
                                        throw new Error('Exception on AppScript side: ' + error);
                                    });
                    }
                })
                return proxyApp;
            }

            AppScripts.instance.appScriptIsInit = true
        }

        const sendToAppScript = (functionName, timeout, ...args) => { // Надсилаємо запит на виконання функції у AppScript
            if (AppScripts.instance.appScriptIsInit && !AppScripts.instance.scripts[functionName]) {
                throw new Error(`Function "${functionName}" is not available in AppScript.`);
            }

            const messageId = randomString();
            const messageBody = { // Створюємо тіло для повідомлення
                messageId: messageId,
                functionName: functionName,
                args: args
            }
            
            const promise = new Promise(async (resolve, reject) => { // Створюємо проміс, для очікування результата
                const timer = setTimeout(() => {
                    reject(new Error(`Timeout: No response for "${functionName}" after ${timeout}ms`))
                    messagedHandlers.delete(messageId)
                }, timeout);

                messagedHandlers.set(messageId, {
                    resolve: (result) => {
                        clearTimeout(timer);
                        resolve(result)
                    },
                    reject: (error) => {
                        clearTimeout(timer);
                        reject(error)
                    }
                });
            });
            
            window.parent.postMessage(messageBody, APP_SCRIPT_ORIGIN);

            return promise; // Віддаємо проміс
        }

        await initAppsScripts();
        return AppScripts.instance;
    }
}