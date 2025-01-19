const block_text = document.querySelector('.key_info_container');
const wrapper_text = document.querySelector('.key_info_container__wrapper')

function updateHeightKeyInfo() {
    const computedStyle = window.getComputedStyle(block_text);
    const paddingTop = parseFloat(computedStyle.paddingTop)
    const paddingBottom = parseFloat(computedStyle.paddingBottom)

    // Визначаємо поточну висоту контенту
    const textHeight = wrapper_text.scrollHeight + paddingTop + paddingBottom;

    if (textHeight > 315) {
        block_text.style.height='315px';
        console.log('height - 315px')
    } else {
        block_text.style.height = textHeight+'px'
        console.log('current-height-'+textHeight)
    }
}

const observer = new MutationObserver(() => {
    updateHeightKeyInfo();
})

observer.observe(wrapper_text, {
    childList: true,      // Відслідковуємо додавання або видалення дочірніх елементів
    subtree: true,        // Відслідковуємо зміни в усіх нащадках
    characterData: true   // Відслідковуємо зміни текстового вмісту
})

updateHeight()

// setInterval(() => {
//     document.querySelector('#text').textContent = 'Any Text '.repeat(Math.floor(Math.random() * 50))
// }, 1500);