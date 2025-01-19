const selectSound = document.querySelector('#selectSound');
const openSound = document.querySelector('#openSound');

const inputs = document.querySelectorAll('input');
const buttons = document.querySelectorAll('button');

inputs.forEach(input => {
    console.log('Set up sound for input')
    console.log(input)
    input.addEventListener('mouseover', () => {
        selectSound.currentTime = 0;
        selectSound.play();
    });
    input.addEventListener('click', () => {
        openSound.currentTime = 0;
        openSound.play();
    });
})

buttons.forEach(button => {
    console.log('Set up sound for button', button)
    console.log(button)
    button.addEventListener('mouseover', () => {
        selectSound.currentTime = 0;
        selectSound.play();
    });
    button.addEventListener('click', () => {
        openSound.currentTime = 0;
        openSound.play();
    });
})