    const employees = [];
    const employeeTable = document.getElementById("employeeTable");
    const commonMaleName = document.getElementById("commonMaleName");
    const commonFemaleName = document.getElementById("commonFemaleName");

    document.getElementById("addEmployee").addEventListener("click", function () {
        const lastName = document.getElementById("lastName").value;
        const firstName = document.getElementById("firstName").value;
        const middleName = document.getElementById("middleName").value;
        const gender = document.getElementById("gender").value;
        const experience = parseInt(document.getElementById("experience").value);
        // Добавление данных сотрудника в массив и отображение в таблице
        employees.push({ lastName, firstName, middleName, gender, experience });
        displayEmployee(employees[employees.length - 1]);

        // Анализ самых распространенных имен
        analyzeCommonNames();
    });

    function displayEmployee(employee) {
        const row = employeeTable.insertRow();
        row.insertCell(0).textContent = employee.lastName;
        row.insertCell(1).textContent = employee.firstName;
        row.insertCell(2).textContent = employee.middleName;
        row.insertCell(3).textContent = employee.gender;
        row.insertCell(4).textContent = employee.experience;
    }

    function analyzeCommonNames() {
        const maleNames = {};
        const femaleNames = {};

        employees.forEach(function (employee) {
            const name = employee.firstName;
            if (employee.gender === "мужской") {
                maleNames[name] = (maleNames[name] || 0) + 1;
            } else {
                femaleNames[name] = (femaleNames[name] || 0) + 1;
            }
        });

        const mostCommonMaleName = Object.keys(maleNames).reduce((a, b) => maleNames[a] > maleNames[b] ? a : b);
        const mostCommonFemaleName = Object.keys(femaleNames).reduce((a, b) => femaleNames[a] > femaleNames[b] ? a : b);

        commonMaleName.textContent = mostCommonMaleName;
        commonFemaleName.textContent = mostCommonFemaleName;
    }