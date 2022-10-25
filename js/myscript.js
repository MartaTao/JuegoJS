let cuestionario = [
    {"pregunta":"De qué color es el caballo blacno de Santiago?",
     "respuestas":["Rojo","Qué caballo?","Blanco y en botella chele"]},
    {"pregunta":"hola?",
     "respuestas":["hola","adios?","pfff"]},
    {"pregunta":"Prueba3?",
     "respuestas":["nya","senpai","yamete kudasai"]},
];
let respuestaCorrecta = [0,2,1]
let lineaHistoria = 0;
let numPregunta = 0;
let numAciertos = 0;
let numPruebas = 0;
let pruebasPasadas = 0;
let contHistoria = 0;
let historia = ["Te despiertas un como cualquier día, te levantas y enciendes el ordenador.","Miras tu correo y decides abrir un correo para nada sospechoso.","Oh no! Al abrir el correo un hacker te ha introducido un virus en el ordenador.", "Para deshacerte del virus tendrás que resolver las diversas pruebas necesarias para poder desactivarlo.",`Has completado la primera prueba con un total de ${numAciertos} de 10 preguntas`, "No te relajes la siguiente prueba requiere buena memoria","Esperemos que no seas daltónico", "Suerte!"];
function muestraTexto(){
    let texto = historia[lineaHistoria];
    document.getElementById("texto").innerHTML = texto;
    contHistoria++;
    lineaHistoria++;
    if(contHistoria<=3){
        setTimeout(() => {
            muestraTexto(lineaHistoria);
        }, 5000);
    }else{
        setTimeout(() => {
            document.getElementById("texto").innerHTML ="";
            contHistoria = 0;
            switch(numPruebas){
                case 0:
                    muestraPregunta(numPregunta);
                break;
                case 1:

                break;
                case 2:
                break;
            }
        }, 5000);
        
    }
    
}
muestraTexto();
function $(selector){
    return document.querySelector(selector);
}
function muestraPregunta(i){
    let p = cuestionario[i];
    let pregunta = `<p>${p.pregunta}</p>`;
    let r = p.respuestas;
    let respuesta = "";
    let index=0;
    for(;index<r.length;index++){
        respuesta += `<input type="radio" name="respuesta" value=${index} id="respuesta${index}">`+r[index]+'<br>';
    }
    document.getElementById("pregunta").innerHTML = pregunta;
    document.getElementById("respuestas").innerHTML = respuesta;
    validarRespuesta()
    
}
function validarRespuesta(){
    $("#respuesta0").addEventListener("click",function(){
        let eleccion = this.value;
        if(eleccion == respuestaCorrecta[numPregunta]){
            numAciertos++;
        }
        numPregunta++;
        if(numPregunta<10){
            muestraPregunta(numPregunta);
        }else{
            muestraTexto();
            numPruebas++;
        }
        
    });
    $("#respuesta1").addEventListener("click",function(){
        let eleccion = this.value;
        if(eleccion == respuestaCorrecta[numPregunta]){
            numAciertos++;
        }
        numPregunta++;
        if(numPregunta<10){
            muestraPregunta(numPregunta);
        }else{
            muestraTexto();
            numPruebas++;
        }
    });
    $("#respuesta2").addEventListener("click",function(){
        let eleccion = this.value;
        if(eleccion == respuestaCorrecta[numPregunta]){
            numAciertos++;
        }
        numPregunta++;
        if(numPregunta<10){
            muestraPregunta(numPregunta);
        }else{
            muestraTexto();
            numPruebas++;
        }
    });
}
