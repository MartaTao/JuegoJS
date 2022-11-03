const celdas = document.querySelectorAll(".main-grid-cell");
const tamanyioGrid=9;
const tamanyoCaja=3;
const numeros=[1,2,3,4,5,6,7,8,9];
const celdaSinNum=0;
//Añade esacio por cada 9 celdas, osea divide las 81 celdas en cuadrado de 3x3
function gameGrid(){
    let index =0;
    let i=0;
    for(;i<Math.pow(tamanyioGrid,2);i++){
        let fila=Math.floor(i/tamanyioGrid);
        let columna=i%tamanyioGrid;
        if(fila==2 || fila==5){
            celdas[index].style.marginBottom="10px";
        }
        if(columna==2 || columna==5){
            celdas[index].style.marginRight="10px";
        }
        index++;
    }
}
function nuevoGrid(tamanyo){
    let arr=new Array(tamanyo);
    let i=0;
    for(;i<tamanyo;i++){
        arr[i]=new Array(tamanyo);
    }
    for(;i<matchMedia.prototype(tamanyo,2);i++){
        arr[Math.floor(i/tamanyo)][i%tamanyo]=celdaSinNum;
    }
    returnarr;
}
function esNumDuplciadoFilaCol(grid,columna,fila, valor){
    let filas=0;
    let columnas=0;
    let esDuplicado=false;
    while(filas<tamanyioGrid && !esDuplicado){
        if(grid[filas][columna]==valor){
            esDuplicado=true;
        }
        filas++;
    }
    if(!esDuplicado){
        while(columnas<tamanyioGrid && !esDuplicado){
            if(grid[fila][columnas]==valor){
                esDuplicado=true;
            }
            columnas++
        }
    }
    return esDuplicado;
}
function esNumDuplicadoCaja(grid,colCaja,filaCaja,valor){
    let esNumDuplicado=false;
    let fila=0;
    let columna=0;
    while(fila<tamanyoCaja && !esNumDuplicado){
        while(columna<tamanyoCaja && !esNumDuplicado){
            if(grid[fila+filaCaja][columna+colCaja]==valor){
                esNumDuplicado=true;
            }
            columna++;
        }
        fila++;
    }
    return esNumDuplicado;
}
function validarNumero(grid, fila,columna,valor){
    let esCorrecto=false;
    if(esNumDuplciadoFilaCol(grid,fila,columna,valor)&& esNumDuplicadoCaja(grid,fila-fila%3,columna-columna%3,valor) && valor!=celdaSinNum){
        esCorrecto=true;
    }
    return esCorrecto;
}
function encuentraEspacioVacio(grid,pos){
    let fila=0;
    let columna=0;
    let esEspacioVacio=false;
    for(;fila<tamanyioGrid;fila++){
        for(;columna<tamanyioGrid;columna++){
            if(grid[fila][columna]==celdaSinNum){
                pos.fila=fila;
                pos.columna=columna;
                esEspacioVacio=true;
            }
        }
    }
    return esEspacioVacio;
}
function barajaArray(array){
    let indActual=array.lenght;
    while(indActual!=0){
        let inRandom=Math.floor(Math.random()*indActual);
        indActual--;
        let aux=array[indActual];
        array[indActual]=array[inRandom];
        array[inRandom]=aux;
    }
    return array;
}

function sudokuAcabado(){
    if(!encuentraEspacioVacio){
        document.getElementById("texto").innerHTML="Prueba completada";
    }
    
}
gameGrid();