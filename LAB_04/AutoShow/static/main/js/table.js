let tableData = [];
let selectedCellsInRow = [];
let selectedCellsInColumn = [];

document.getElementById("generateTable").addEventListener("click", generateTable);

function generateTable() {
    const sizeInput = document.getElementById("tableSize");
    const maxSelectable = parseInt(document.getElementById("maxSelectable").value);
    const size = parseInt(sizeInput.value);
    
    if (isNaN(size) || size < 1 || size > 10) {
        alert("Пожалуйста, введите корректный размер таблицы от 1 до 10.");
        return;
    }

    tableData = [];
    selectedCellsInRow = Array(size).fill(0);
    selectedCellsInColumn = Array(size).fill(0);

    const table = document.getElementById("table");
    table.innerHTML = '';

    for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        const rowData = [];
        for (let j = 0; j < size; j++) {
            const value = Math.floor(Math.random() * 100);
            rowData.push(value);
            const cell = document.createElement("td");
            cell.textContent = value;
            cell.addEventListener("click", () => toggleCellColor(cell, i, j, size, maxSelectable));
            row.appendChild(cell);
        }
        tableData.push(rowData);
        table.appendChild(row);
    }
}

function toggleCellColor(cell, row, col, size, maxSelectable) {
    if (selectedCellsInRow[row] >= maxSelectable || selectedCellsInColumn[col] >= maxSelectable) {
        return; // Превышено максимальное количество выбранных ячеек в строке или столбце.
    }

   
        const value = parseInt(cell.textContent);
        if (!isNaN(value)) {
            if (value % 2 === 0) {
                cell.classList.toggle("even-cell");
            } else {
                cell.classList.toggle("odd-cell");
            }

            if (cell.classList.contains("selected")) {
                selectedCellsInRow[row]--;
                selectedCellsInColumn[col]--;
            } else {
                selectedCellsInRow[row]++;
                selectedCellsInColumn[col]++;
            }
            cell.classList.toggle("selected");
        }
    
}


function transposeTable() {
    const size = tableData.length;
    const transposedData = Array.from({ length: size }, () => Array(size));

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            transposedData[i][j] = tableData[j][i];
        }
    }

    const table = document.getElementById("table");
    table.innerHTML = '';

    for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("td");
            cell.textContent = transposedData[i][j];
            cell.addEventListener("click", () => toggleCellColor(cell));
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    tableData = transposedData;
}


function addRowAndColumn() {
    const sizeInput = document.getElementById("tableSize");
    const size = parseInt(sizeInput.value);

    if (isNaN(size) || size < 1 || size > 10) {
        alert("Пожалуйста, введите корректный размер таблицы от 1 до 10.");
        return;
    }

    const table = document.getElementById("table");

    const newRow = document.createElement("tr");
    const newRowData = [];
    for (let j = 0; j < size; j++) {
        const value = Math.floor(Math.random() * 100);
        newRowData.push(value);
        const cell = document.createElement("td");
        cell.textContent = value;
        newRow.appendChild(cell);
    }
    tableData.push(newRowData);
    table.appendChild(newRow);

    for (let i = 0; i < size+1; i++) {
        const cell = document.createElement("td");
        const value = Math.floor(Math.random() * 100);
        cell.textContent = value;
        tableData[i].push(value);
        table.rows[i].appendChild(cell);
    }

    sizeInput.value = size + 1;
}



