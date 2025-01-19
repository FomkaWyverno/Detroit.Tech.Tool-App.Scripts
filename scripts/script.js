async function main() {
    const {key_json} = await initializeTool();
    showTool();
    console.log('Init tool');
}

async function initializeTool() {
    const loader_state = document.querySelector('.loading_container__state');
    try {
        loader_state.textContent = 'Завантажуємо ключі...'
        const key_json = await fetchDetroitKeys();
        loader_state.textContent = 'Ініцілізація з App Scripts...'
        const appScripts = await AppScripts.getInstance();
        return {key_json: key_json}
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