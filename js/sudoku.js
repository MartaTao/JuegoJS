class Sudoku{
    constructor(){
        this.espacioBlanco=0;
        this.tamanioGrid=9;
        this.tamanioRecuadro=3;
        this.celdas = document.querySelectorAll('.main-grid-cell');
        this.nuemros=[1,2,3,4,5,6,7,8,9];
        this.nombreNivel=["Facil","Medio","Difícil","Muy difícil","Experto","Infernal"];
        this.numCeldasVacias=[29,38,47,56,65,74];
        this.nivel=0;
        this.casillasAResolver;
    }
    setNivel(level){
        this.nivel=level;
    }
    //Crea un Array de 9 espacios, y desspues otro array de 9 en cada espacio creando un array de 9x9
    nuevoGrid(){
        let grid=new Array(this.tamanioGrid);
        let i=0;
        for(;i<this.tamanioGrid;i++){
            grid[i]=new Array(this.tamanioGrid);
        }
        i=0;
        for(;i<Math.pow(this.tamanioGrid,2);i++){
            grid[Math.floor(i/this.tamanioGrid)][i%this.tamanioGrid]
        }
        return grid;
    }
    barajaArrays(arr){
        let index=arr.lenght;
        let indexRandom;
        let aux;
        while(index!=0){
            
        }
    }
    muestraSudoku(){
        let i=0;
        let fila;
        let columna;
        for(;i<Math.pow(this.tamanioGrid,2);i++){
            fila=Math.floor(i/this.tamanioGrid);
            columna=i%this.tamanioGrid;
            if (fila == 2 || fila == 5){
                this.celdas[i].style.marginBottom = '10px';
            }
            if (columna == 2 || columna == 5){
                this.celdas[i].style.marginRight = '10px';
            }
            this.celdas[i].setAttribute('data-value', this.celdas[fila][columna]);
        }
        let f=0;
        let c=0;
        i=0;
        let tableroSudoku=this.nuevoGrid();
        for(;c<this.tamanioGrid;c++){
            for(;f<this.tamanioGrid;f++){
                tableroSudoku[f][c]=Math.floor(Math.random()*9);
                this.celdas[i].textContent=tableroSudoku[f][c];
            }
            
            
        }

        /*if(this.celda[fila][columna] != 0){
            this.celdas[i].textContent = this.celda[fila][columna];
            this.celdas[i].classList.add('filled');
        }*/
    }
    clearSudoku(){
        let i=0;
        for(;i<Math.pow(this.tamanioGrid, 2); i++){
            this.celdas[i].textContent = '';
            this.celdas[i].classList.remove('filled');
            this.celdas[i].classList.remove('selected');
        }
    }
    iniciaSudoku(){
        this.clearSudoku();
        this.muestraSudoku();
    }
}
function $(selector){
    return document.querySelector(selector);
}
const menuInicio = document.getElementById('start-screen');
const juego = document.getElementById('game-screen');
const celdas = document.querySelectorAll('.main-grid-cell');
const numerosIndice = document.querySelectorAll('.number');
const nivel=document.getElementById('btn-level');
const sudoku=new Sudoku();
let nivelDificultad=0;
$('#btn-level').addEventListener('click',()=>{
    if(nivelDificultad+1<6){
        nivelDificultad++;
    }else{
        nivelDificultad=0;
    }
    nivel.textContent=sudoku.nombreNivel[nivelDificultad];

});
$('#btn-play').addEventListener('click', () => {
    startGame();   
});
function startGame(){
    menuInicio.classList.remove('active');
    juego.classList.add('active');
    sudoku.iniciaSudoku();
}
