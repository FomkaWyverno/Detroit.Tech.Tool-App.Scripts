async function main() {
    const {keys, app} = await initializeTool();
    showTool();
    console.log('Init tool');
}

async function initializeTool() {
    const loader_state = document.querySelector('.loading_container__state');
    try {
        loader_state.textContent = 'Завантажуємо ключі...'
        const key_json = await fetchDetroitKeys();
        loader_state.textContent = 'Обробляємо ключі...'
        const keys = await parseJsonToArrayKey(key_json, (current_progress, count_id) => {loader_state.textContent = `Обробляємо ключі! Оброблено: ${current_progress} з ${count_id}`;});
        loader_state.textContent = 'Ініцілізація з App Scripts...'
        const appScripts = await AppScripts.getInstance();
        loader_state.textContent = 'Отримуємо всі створенні аркуші в Google Sheets'
        const googleSheets = await appScripts.scripts.getSheetNames();
        

        for (let i = 0; i < googleSheets.length; i++) {
            const sheet = googleSheets[i];
            loader_state.textContent = `Отримуємо значення з ${sheet}. Всього отримано ${i} з ${googleSheets.length}`;
            const values = await appScripts.withTimeout(60000).scripts.getValueSheet(sheet);
            console.log('Sheet: ' + sheet);
            console.log(values)
        }
        return {keys: keys, app: appScripts}
    } catch(error) {
        loader_state.textContent = "Сталась помилка при завантаженні:";
        loader_state.appendChild(document.createElement('br'));
        const error_text = document.createElement('span');
        error_text.style.wordBreak = 'word-break'
        error_text.textContent = error.message;
        loader_state.appendChild(error_text);
        throw error;
    }
}

function showTool() { // Відображає інструмент
    const loader = document.querySelector('.loading_container');
    const tool = document.querySelector('.tool_container');
    loader.classList.add('hide') // Приховуємо завантаження
    tool.classList.remove('hide') // Відображаємо інструмент 
    updateHeightKeyInfo();
}

main();