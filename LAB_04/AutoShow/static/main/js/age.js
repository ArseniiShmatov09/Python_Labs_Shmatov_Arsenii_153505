function checkAge() {
    const dobInput = document.getElementById('dob');
    const resultElement = document.getElementById('result');
    const dob = new Date(dobInput.value);
    const currentDate = new Date();

    const dayOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const dayIndex = dob.getDay();
    const ageInMilliseconds = currentDate - dob;
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

   
    let age_ending = '';
    if(ageInYears%10 == 1 && ageInYears!=11 ){
        age_ending = 'год';
    }
    else if (ageInYears%10 ==2||ageInYears%10 ==3 ||ageInYears%10 ==4){
        age_ending = 'года';

    }
    else age_ending = 'лет';
    let message = `Вам ${ageInYears} ${age_ending}. `;

    if (ageInYears < 18) {
            alert('Для использования этого сайта вам нужно разрешение ваших родителей!!!!');
        } 
    else {
        message+= `День недели вашего рождения: ${dayOfWeek[dayIndex]}.`
    }

    resultElement.textContent = message;
}