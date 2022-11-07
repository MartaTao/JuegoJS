const espacioNoAsignado= 0;
const tamanioGrid= 9;
const tamanioRecuadro= 3;
const numeros= [1,2,3,4,5,6,7,8,9];
const nombreNivel= ["Facil","Medio","Difícil","Muy difícil","Experto","Infernal"];
const nivel= [29, 38, 47, 56, 65, 74];
const startScreen = document.getElementById('start-screen');
const juego = document.getElementById('game-screen');
const celdas = document.querySelectorAll('.main-grid-cell');
const number_inputs = document.querySelectorAll('.number');
const level_btn= document.getElementById('btn-level');
let level_index = 0;
let level = nivel[level_index];
let su = undefined;
let su_answer = undefined;
let celdaSelecionada = -1;
let lineaHistoria = 0;
const tiempoTexto=5000;
let historia = ["¡Enhorabuena! Has completado las tres preubas que te preparado.","Pero, ¿habrás supero las suficientes para deshacerte de mi virus?","¡Dejemonos de intrigas! Veamos los resutados"];


function $(selector){
    return document.querySelector(selector);
}
function muestraTexto(){
    let texto = historia[lineaHistoria];
    document.getElementById("texto").innerHTML = texto;
    lineaHistoria++;
    if(lineaHistoria<historia.length){
        setTimeout(() => {
            muestraTexto();
        }, tiempoTexto);
    }else{
        setTimeout(() => {
            if(localStorage.getItem('prueba1')=='pasada'&&localStorage.getItem('prueba2')=='pasada'&&localStorage.getItem('prueba3')=='pasada'){
                window.open("../html/ganadoCompleto.html");
                window.close()
            }else if(localStorage.getItem('prueba1')=='pasada'&&localStorage.getItem('prueba2')=='pasada'){
                window.open("../html/ganadoParcial.html");
                window.close()
            }
        }, tiempoTexto);
    }
}

const newGrid = () => {
    let arr = new Array(tamanioGrid);

    for (let i = 0; i < tamanioGrid; i++) {
        arr[i] = new Array(tamanioGrid);  
    }

    for (let i = 0; i < Math.pow(tamanioGrid, 2); i++) {
        arr[Math.floor(i/tamanioGrid)][i%tamanioGrid] = espacioNoAsignado;
    }

    return arr;
}

//Comprobamos si el nuemro no esta duplicado:
const noDuplicado = (grid, fila, col, value) => {
    return noDuplicadoCol(grid, col, value) && noDuplicadoFila(grid, fila, value) && noDuplicadoReacuadro(grid, fila - fila%3, col - col%3, value) && value !== espacioNoAsignado;
}
//En la columna
const noDuplicadoCol = (grid, col, value) => {
    for (let fila = 0; fila < tamanioGrid; fila++) {
        if (grid[fila][col] == value) return false;
    }
    return true;
}
//En la fila
const noDuplicadoFila = (grid, fila, value) => {
    for (let col = 0; col < tamanioGrid; col++) {
        if (grid[fila][col] == value) return false;
    }
    return true;
}
//En el 3x3
const noDuplicadoReacuadro = (grid, cajaFila, cajaCol, value) => {
    for (let fila = 0; fila < tamanioRecuadro; fila++) {
        for (let col = 0; col < tamanioRecuadro; col++) {
            if (grid[fila + cajaFila][col + cajaCol] == value) return false;
        }
    }
    return true;
}

const encuentraEspacioVacio = (grid, pos) => {
    for (let fila = 0; fila < tamanioGrid; fila++) {
        for (let col = 0; col < tamanioGrid; col++) {
            if (grid[fila][col] == espacioNoAsignado) {
                pos.fila = fila;
                pos.col = col;
                return true;
            }
        }
    }
    return false;
}

const shuffleArray = (array) => {
    let index = array.length;
    let aux;
    while (index !== 0) {
        let indexRandom = Math.floor(Math.random()*index);
        index -= 1;
        aux= array[indexRandom];
        array[index] = array[indexRandom];
        array[indexRandom] = aux;
    }

    return array;
}

//Comprueba si el gridd esta completo
const isFullGrid = (grid) => {
    return grid.every((fila, i) => {
        return fila.every((value, j) => {
            return value !== espacioNoAsignado;
        });
    });
}
//Asiga al grid los 81 números
const sudokuCreate = (grid) => {
    let espacioNoAsignado_pos = {
        fila: -1,
        col: -1
    }

    if (!encuentraEspacioVacio(grid, espacioNoAsignado_pos)) return true;

    let number_list = shuffleArray([...numeros]);

    let fila = espacioNoAsignado_pos.fila;
    let col = espacioNoAsignado_pos.col;

    number_list.forEach((num, i) => {
        if (noDuplicado(grid, fila, col, num)) {
            grid[fila][col] = num;

            if (isFullGrid(grid)) {
                return true;
            } else {
                if (sudokuCreate(grid)) {
                    return true;
                }
            }

            grid[fila][col] = espacioNoAsignado;
        }
    });

    return isFullGrid(grid);
}
//Chekea que el sudoku esta bien completado
const sudokuCheck = (grid) => {
    let espacioNoAsignado_pos = {
        fila: -1,
        col: -1
    }
    if (!encuentraEspacioVacio(grid, espacioNoAsignado_pos)) return true;
    grid.forEach((fila, i) => {
        fila.forEach((num, j) => {
            if (noDuplicado(grid, i, j, num)) {
                if (isFullGrid(grid)) {
                    return true;
                } else {
                    if (sudokuCreate(grid)) {
                        return true;
                    }
                }
            }
        })
    })

    return isFullGrid(grid);
}
//Limpia las celdas de manera aleatoria segun el numero de celdas que tengas que averiguar
const removeceldas = (grid, level) => {
    let res = [...grid];
    let attemps = level;
    while (attemps > 0) {
        let fila = Math.floor(Math.random() * tamanioGrid);
        let col = Math.floor(Math.random() * tamanioGrid);
        while (res[fila][col] == 0) {
            fila = Math.floor(Math.random() * tamanioGrid);
            col = Math.floor(Math.random() * tamanioGrid);
        }
        res[fila][col] = espacioNoAsignado;
        attemps--;
    }
    return res;
}
//Genera el sudoku con los espacios segun el nivel
const sudokuGen = (level) => {
    let sudoku = newGrid();
    let check = sudokuCreate(sudoku);
    if (check) {
        let question = removeceldas(sudoku, level);
        return {
            original: sudoku,
            question: question
        }
    }
    return undefined;
}

//Crea el cuadrado de 9x9 en cuadrados de 3x3
const initGameGrid = () => {
    let index = 0;

    for (let i = 0; i < Math.pow(tamanioGrid,2); i++) {
        let fila = Math.floor(i/tamanioGrid);
        let col = i % tamanioGrid;
        if (fila == 2 || fila == 5) celdas[index].style.marginBottom = '10px';
        if (col == 2 || col == 5) celdas[index].style.marginRight = '10px';

        index++;
    }
}
const clearSudoku = () => {
    for (let i = 0; i < Math.pow(tamanioGrid, 2); i++) {
        celdas[i].textContent = '';
        celdas[i].classList.remove('filled');
        celdas[i].classList.remove('selected');
    }
}
//Crea el sudoku en si
const initSudoku = () => {
    clearSudoku();
    resetBg();
    su = sudokuGen(level);
    su_answer = [...su.question];
    for (let i = 0; i < Math.pow(tamanioGrid, 2); i++) {
        let fila = Math.floor(i / tamanioGrid);
        let col = i % tamanioGrid;
        
        celdas[i].setAttribute('data-value', su.question[fila][col]);

        if (su.question[fila][col] !== 0) {
            celdas[i].classList.add('filled');
            celdas[i].textContent = su.question[fila][col];
        }
    }
}
//Marca la fila, columna y recuadro de la casilla selecionada
const hoverBg = (index) => {
    let fila = Math.floor(index / tamanioGrid);
    let col = index % tamanioGrid;

    let box_start_row = fila - fila % 3;
    let box_start_col = col - col % 3;

    for (let i = 0; i < tamanioRecuadro; i++) {
        for (let j = 0; j < tamanioRecuadro; j++) {
            let cell = celdas[9 * (box_start_row + i) + (box_start_col + j)];
            cell.classList.add('hover');
        }
    }
    //selecciona la columna dodne está el número
    let step = 9;
    while (index - step >= 0) {
        celdas[index - step].classList.add('hover');
        step += 9;
    }

    step = 9;
    while (index + step < 81) {
        celdas[index + step].classList.add('hover');
        step += 9;
    }
    //selecciona la fila dodne está el nuemro
    step = 1;
    while (index - step >= 9*fila) {
        celdas[index - step].classList.add('hover');
        step += 1;
    }

    step = 1;
     while (index + step < 9*fila + 9) {
        celdas[index + step].classList.add('hover');
        step += 1;
    }

}

const resetBg = () => {
    celdas.forEach(e => e.classList.remove('hover'));
}
//Busca si hay errores
const checkErr = (value) => {
    const addErr = (cell) => {
        if (parseInt(cell.getAttribute('data-value')) == value) {//Com prueba si el valor del atributo es igual al número(value)
            cell.classList.add('err');
            cell.classList.add('cell-err');
            setTimeout(() => {
                cell.classList.remove('cell-err');
            }, 500);
        }
    }
    let index = celdaSelecionada;
    let fila = Math.floor(index / tamanioGrid);
    let col = index % tamanioGrid;
    let box_start_row = fila - fila % 3;
    let box_start_col = col - col % 3;
    //Revisa la caja
    for (let i = 0; i < tamanioRecuadro; i++) {
        for (let j = 0; j < tamanioRecuadro; j++) {
            let cell = celdas[9 * (box_start_row + i) + (box_start_col + j)];
            if (!cell.classList.contains('selected')) addErr(cell);//Solo se puede poner en rojo las casillas que no tenemos seleccionadas
        }
    }
    //Revisa columna donde se encuentra el número
    let step = 9;
    while (index - step >= 0) {
        addErr(celdas[index - step]);
        step += 9;
    }
    step = 9;
    while (index + step < 81) {
        addErr(celdas[index + step]);
        step += 9;
    }
    //Revisa la fila dodne está el número
    step = 1;
    while (index - step >= 9*fila) {
        addErr(celdas[index - step]);
        step += 1;
    }
    step = 1;
    while (index + step < 9*fila + 9) {
        addErr(celdas[index + step]);
        step += 1;
    }
}

const removeErr = () => celdas.forEach(e => e.classList.remove('err'));

const esGanado = () => sudokuCheck(su_answer);

const initNumberInputEvent = () => {
    number_inputs.forEach((e, index) => {
        e.addEventListener('click', () => {
            if (!celdas[celdaSelecionada].classList.contains('filled')) {
                celdas[celdaSelecionada].textContent = index + 1;
                celdas[celdaSelecionada].setAttribute('data-value', index + 1);
                // Añade a nuestro grid de respuesta el numero introducido
                let fila = Math.floor(celdaSelecionada / tamanioGrid);
                let col = celdaSelecionada % tamanioGrid;
                su_answer[fila][col] = index + 1;
                removeErr();
                //Checkea que que el numero introducido es correcto
                checkErr(index + 1);
                if (esGanado()) {
                    localStorage.setItem('prueba3','pasada')
                    muestraTexto();
                }
            }
        })
    })
}

const initceldasEvent = () => {
    celdas.forEach((e, index) => {
        e.addEventListener('click', () => {
            if (!e.classList.contains('filled')) {
                celdas.forEach(e => e.classList.remove('selected'));

                celdaSelecionada = index;
                e.classList.remove('err');
                e.classList.add('selected');
                resetBg();
                hoverBg(index);
            }
        })
    })
}

const startGame = () => {
    startScreen.classList.remove('active');
    juego.classList.add('active');
}

$('#btn-level').addEventListener('click', (e) => {
    if(level_index+1<6){
        level_index++;
    }else{
        level_index=0;
    }
    level_btn.textContent=nombreNivel[level_index];
    level = nivel[level_index]
});

$('#btn-play').addEventListener('click', () => {
    initSudoku();
    startGame();
    
});

$('#btn-delete').addEventListener('click', () => {
    celdas[celdaSelecionada].textContent = '';
    celdas[celdaSelecionada].setAttribute('data-value', 0);

    let fila = Math.floor(celdaSelecionada / tamanioGrid);
    let col = celdaSelecionada % tamanioGrid;

    su_answer[fila][col] = 0;

    removeErr();
})
const init = () => {
    initGameGrid();
    initceldasEvent();
    initNumberInputEvent();
}
init();
