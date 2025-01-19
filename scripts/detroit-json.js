async function fetchDetroitKeys() {
    const key_json_url = 'https://fomkawyverno.github.io/Detroit.Tech.Tool-App.Scripts.github.io/Detroit_LocalizationRegistry.json';
    const response = await fetch(key_json_url);
    if (!response.ok) {
        throw new Error(`Response fetched Detroit Key JSON status: ${response.status}`);
    }
    const key_json = await response.json();
    console.log('Loaded Detroit Key JSON', key_json);
    return key_json;
}