let cuestionario = [
    {"pregunta":"A que hace refencia la palabra Otaku en la cultura japonesa?",
     "respuestas":["Hace referencia a un friki sobre algun tema de manera despectiva","Una persona que ve anime y lee mangas","Una persona que solo se ducha 1 vez al mes como mucho","Un tipo de persona de compañía"]},
    {"pregunta":"Qué significa Game Over??",
     "respuestas":["Has ganado","Te ha tocado la loteria","No hablo inglish","Has perdido"]},
    {"pregunta":"Qué palabra hace referencia a una persona en un curso por encima de ti en la cultura japonesa?",
     "respuestas":["Nya","Senpai","yamete kudasai","Itadakimaaaaaaaaashu"]},
    {"pregunta":"Qué juego ha saco recientemente Platinun junto con Nintendo?",
     "respuestas":["Pokemon espiña","Otro juego del fontanero Mario","Bayonetta3","Hello Kitty Online"]},
    {"pregunta":"Luz, fuego destruccion....",
     "respuestas":["el mundo puede ser una ruina, no lo podemos permitir","¡Es Pokémon! ¡Hazte con todos!Es mi destino mi misión ¡Es Pokémon!",
     "los fragmentos habra que buscar unidos tu y yo la suerte nos junto,se que los vamos muy pronto a encontrar",
     "Si lo sé. Me he dado cuenta, ya Si quiero vencer, un buen entrenador tengo que ser. Pero una pregunta, me voy a tener que hacer.Quién soy yo? Un misterio es"]},
];
let respuestaCorrecta = [0,3,1,2,0]
let lineaHistoria = 0;
let numPregunta = 0;
let numAciertos = 0;
let numPruebas = 0;
let pruebasPasadas = 0;
let contHistoria = 0;
const tiempoTexto=5000;
let historia = ["Te despiertas un como cualquier día, te levantas y enciendes el ordenador.","Miras tu correo y decides abrir un correo para nada sospechoso.","Oh no! Al abrir el correo un hacker te ha introducido un virus en el ordenador.", "Para deshacerte del virus tendrás que resolver las diversas pruebas necesarias para poder desactivarlo.","Una prueba menos, ya solo te quedan por realizar 2 más", "No te relajes la siguiente prueba requiere buena memoria","Esperemos que no seas daltónico", "Suerte!"];
function muestraTexto(){
    let texto = historia[lineaHistoria];
    document.getElementById("texto").innerHTML = texto;
    contHistoria++;
    lineaHistoria++;
    if(contHistoria<=3){
        setTimeout(() => {
            muestraTexto();
        }, tiempoTexto);
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
        }, tiempoTexto);
        
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
        if(numPregunta<5){
            muestraPregunta(numPregunta);
        }else{
            document.getElementById("pregunta").innerHTML="";
            document.getElementById("respuestas").innerHTML="";
            document.getElementById("texto").innerHTML=`Has completado la primera prueba con un total de ${numAciertos} de 5 preguntas`;
            setTimeout(() => {
                muestraTexto();
                numPruebas++;
            }, tiempoTexto);
            
        }
        
    });
    $("#respuesta1").addEventListener("click",function(){
        let eleccion = this.value;
        if(eleccion == respuestaCorrecta[numPregunta]){
            numAciertos++;
        }
        numPregunta++;
        if(numPregunta<5){
            muestraPregunta(numPregunta);
        }else{
            document.getElementById("pregunta").innerHTML="";
            document.getElementById("respuestas").innerHTML="";
            document.getElementById("texto").innerHTML=`Has completado la primera prueba con un total de ${numAciertos} de 5 preguntas`;
            setTimeout(() => {
                muestraTexto();
                numPruebas++;
            }, tiempoTexto);
        }
    });
    $("#respuesta2").addEventListener("click",function(){
        let eleccion = this.value;
        if(eleccion == respuestaCorrecta[numPregunta]){
            numAciertos++;
        }
        numPregunta++;
        if(numPregunta<5){
            muestraPregunta(numPregunta);
        }else{
            document.getElementById("pregunta").innerHTML="";
            document.getElementById("respuestas").innerHTML="";
            document.getElementById("texto").innerHTML=`Has completado la primera prueba con un total de ${numAciertos} de 5 preguntas`;
            setTimeout(() => {
                muestraTexto();
                numPruebas++;
            }, tiempoTexto);
        }
    });
    $("#respuesta3").addEventListener("click",function(){
        let eleccion = this.value;
        if(eleccion == respuestaCorrecta[numPregunta]){
            numAciertos++;
        }
        numPregunta++;
        if(numPregunta<5){
            muestraPregunta(numPregunta);
        }else{
            document.getElementById("pregunta").innerHTML="";
            document.getElementById("respuestas").innerHTML="";
            document.getElementById("texto").innerHTML=`Has completado la primera prueba con un total de ${numAciertos} de 5 preguntas`;
            setTimeout(() => {
                muestraTexto();
                numPruebas++;
            }, tiempoTexto);
        }
    });
}
