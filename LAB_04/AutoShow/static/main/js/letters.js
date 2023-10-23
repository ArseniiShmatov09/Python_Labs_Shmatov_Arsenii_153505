const isBigLetters = JSON.parse(localStorage.getItem('isBigLetters'));
const lettersToggle = document.getElementById('lettersToggle');

if (isBigLetters) {
    lettersToggle.checked = true;
    document.body.classList.add('big-letters');
} else {
    lettersToggle.checked = false;
    document.body.classList.remove('big-letters');

}

document.getElementById('lettersToggle').addEventListener('click', function() {
    if (lettersToggle.checked) {
        document.body.classList.add('big-letters');
        localStorage.setItem('isBigLetters', true);
    } else {
        document.body.classList.remove('big-letters');
        localStorage.setItem('isBigLetters', false);
    }
});