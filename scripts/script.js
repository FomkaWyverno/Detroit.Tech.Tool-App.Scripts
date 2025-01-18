function onApiLoad() {
    google.script.host.ready(); // Повідомляє, що клієнт готовий.
    console.log("Google Apps Script API loaded");
    google.script.run.forTest("From my code");
}

//google.script.run.forTest("From my code");
const loaderBlock = document.querySelector('.container-loader');

const searchBlock = document.querySelector('.container-search');
const tableBody = document.querySelector('.table-json tbody');

console.log(keyJSON);
let keys = parseJsonToArrayKeys(keyJSON);
keys = keys.filter(key => {
    if (key.text.length == 0 || key.text == '{S}') return false;
    return true;
});

console.log('Load JSON')
loaderBlock.classList.add('hide');
searchBlock.classList.remove('hide');

const nextButton = document.querySelector('.container-search__container-input__previousPage');
const previousButton = document.querySelector('.container-search__container-input__nextPage');
const spanPage = document.querySelector('.container-search__container-input__counter__page');
const inputFilter = document.querySelector('#detroit-text');
const buttonFilter = document.querySelector('.container-filter__button');
const contentFilter = document.querySelector('.container-filter__content');
const filterSelects = document.querySelectorAll('.container-filter__content__select__label');
const filterInputs = document.querySelectorAll('.container-filter__content__select__radio');

const tableHeadCode = document.querySelector('#table-json__head--code');
const tableHeadText = document.querySelector('#table-json__head--text');
const tableHeadKey = document.querySelector('#table-json__head--key');

const filterContains = document.querySelector('#filter-contains');
const filterStart = document.querySelector('#filter-start');
const filterEnd = document.querySelector('#filter-end');
const filterEquals = document.querySelector('#filter-equals');


const pages = new Pages(keys, 10, tableBody, spanPage);

nextButton.addEventListener('click', () => {
    console.log('clickNext');
    pages.nextPage();
});
previousButton.addEventListener('click', () => {
    console.log('ClickPrevious');
    pages.previousPage();
});

inputFilter.addEventListener('input', () => {
    runPagesFilter();
});

buttonFilter.addEventListener('click', () => {
    contentFilter.classList.toggle('hide-content');
});

filterSelects.forEach(select => {
    select.addEventListener('click', () => {
        setTimeout(() => {
            contentFilter.classList.add('hide-content');
        }, 200);
    });
});
filterInputs.forEach(input => { input.addEventListener('change', () => { runPagesFilter(inputFilter.value.toLowerCase()) }) });

tableHeadCode.addEventListener('click', () => {
    if (!tableHeadCode.classList.contains('table-json__head__select')) {
        tableHeadCode.classList.add('table-json__head__select');
        tableHeadKey.classList.remove('table-json__head__select');
        tableHeadText.classList.remove('table-json__head__select');
        runPagesFilter();
    }
});

tableHeadKey.addEventListener('click', () => {
    if (!tableHeadKey.classList.contains('table-json__head__select')) {
        tableHeadKey.classList.add('table-json__head__select');
        tableHeadText.classList.remove('table-json__head__select');
        tableHeadCode.classList.remove('table-json__head__select');
        runPagesFilter();
    }
});
tableHeadText.addEventListener('click', () => {
    if (!tableHeadText.classList.contains('table-json__head__select')) {
        tableHeadText.classList.add('table-json__head__select');
        tableHeadKey.classList.remove('table-json__head__select');
        tableHeadCode.classList.remove('table-json__head__select');
        runPagesFilter();
    }
});

function runPagesFilter() {
    let input = inputFilter.value.toLowerCase();
    let compare;
    hasValue = false;
    if (tableHeadText.classList.contains('table-json__head__select')) {
        compare = 'text';
        hasValue = true;
    } else if (tableHeadKey.classList.contains('table-json__head__select')) {
        compare = 'key';
        hasValue = true;
    } else if (tableHeadCode.classList.contains('table-json__head__select')) {
        compare = 'code';
        hasValue = true;
    } else {
        console.error("AN ERROR OCCURRED NO TABLE HEADER IS SELECTED TO SEARCH! NO table-json__head--text NO table-json__head--key!");
    }

    if (hasValue) {
        console.log(`InputFilter: ${input}`);
        pages.filter((key) => { // Фільтрувати рядки
            if (filterStart.checked) { // Фільтрувати якщо текст починається з
                return key[compare].toLowerCase().startsWith(input.toLowerCase()); // key[compare] - викликає  
            } else if (filterEnd.checked) { // Фільтрувати за текстом який закінчується
                return key[compare].toLowerCase().endsWith(input.toLowerCase());
            } else if (filterEquals.checked) { // Фільтрувати якщо текст однаковий
                return key[compare].toLowerCase() === input.toLowerCase();
            } else { // Фільтрувати якщо текст має текст в середині
                return key[compare].toLowerCase().includes(input.toLowerCase());
            }
        });
    }
}


function parseJsonToArrayKeys(json) {
    const array = new Array();
    Object.keys(json).forEach((id) => {
        Object.keys(json[id]).forEach((key) => {
            array.push(new KeyTranslate(id, key, json[id][key].text, json[id][key].hasLink && json[id][key].linkExists));
        });
    });

    return array;
}

const additinalContainer = document.querySelector('.containter-additinal');
const informationKeyBlock = document.querySelector('.information-key');
const commonNames = document.querySelector('.common-names');
const commonNamesCodeCharacter = document.querySelector('.common-names__characters');
const commonNamesList = document.querySelector('.common-names__list');
const containerActorInput = document.querySelector('#container-actor-input');
const actorInput = document.querySelector('#actor-input');
const contextInput = document.querySelector('#context-input');
const timingInput = document.querySelector('#timing-input');
const informationButton = document.querySelector('.information-key__button');
const selectSound = document.querySelector('#selectSound');
const openSound = document.querySelector('#openSound');
let keyTranslate;

informationButton.addEventListener('mouseover', () => {
    selectSound.currentTime = 0;
    selectSound.play();
});

informationButton.addEventListener('click', () => {
    openSound.currentTime = 0;
    openSound.play();

    let actor = actorInput.value;
    let context = contextInput.value;
    const timing = timingInput.value;

    keyTranslate.writeToClipboardCopyText(actor, context, timing);
    additinalContainer.classList.add('behindScreen-bottom');
    actorInput.value = '';
});

contextInput.addEventListener('input', () => {
    
    try {
        const decodeURL = decodeURIComponent(contextInput.value); // Декодуємо URL
        console.log(decodeURL)
        const url = new URL(decodeURL); // Створюємо об'єкт URL з декодованого рядка
        const contextValue = new URLSearchParams(url.search) // Створюємо обєкт для пошуку параметрів в посиланні

        if (contextValue.has('t')) {
            const timing = contextValue.get('t');
            console.log(`URL Timing: ${timing}`);
            const fTiming = formatTiming(timing);
            console.log(`Format Timing: ${fTiming}`);
            timingInput.value = fTiming;

        }
    } catch (errors) {
        console.log(errors)
        console.log('Invalid URL or input, ignoring:', contextInput.value);
    }
    
});

function formatTiming(timingSecond) {
    let hours = undefined;
    let minutes = Math.floor(timingSecond / 60);
    let seconds = Math.floor(timingSecond % 60);

    if (minutes > 59) {
        let timingMinutes = minutes;
        hours = Math.floor(timingMinutes / 60);
        minutes = Math.floor(timingMinutes % 60);
        seconds = Math.floor(timingSecond - (timingMinutes * 60));
    }
    if (minutes.toString().length == 1) minutes = '0'+minutes;
    if (seconds.toString().length == 1) seconds = '0'+seconds;
    if (hours != undefined) {
        return `${hours}:${minutes}:${seconds}`
    } else {
        return `${minutes}:${seconds}`
    }
}