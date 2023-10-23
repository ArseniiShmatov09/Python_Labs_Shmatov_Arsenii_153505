const isDarkTheme = JSON.parse(localStorage.getItem('isDarkTheme'));
const themeToggle = document.getElementById('themeToggle');

if (isDarkTheme) {
    themeToggle.checked = true;
    document.body.id = 'dark-theme';
} else {
    themeToggle.checked = false;
    document.body.id = 'light-theme';

}

document.getElementById('themeToggle').addEventListener('click', function() {
    const currentTheme = document.body.id;
    if (currentTheme === 'light-theme' ) {
        document.body.id = 'dark-theme';
        localStorage.setItem('isDarkTheme', true);
    } else {
        document.body.id = 'light-theme';
        localStorage.setItem('isDarkTheme', false);
    }
});