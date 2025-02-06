

function randomString(): string {
    const timePart: string = Date.now().toString(32); // Поточний час у 32 системі рахування
    const array = new Uint32Array(1); // Масив з одним випадковим числом
    crypto.getRandomValues(array); // Генерація випадкого числа
    const randomPart = array[0].toString(16); // Перетворення числа в шістнадцятковий форамат
    return timePart + randomPart; // Об'єднуємо їх для створення унікального рядка
}

export default randomString;