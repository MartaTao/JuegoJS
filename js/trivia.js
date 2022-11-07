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
let historia = ["Una prueba menos, ya solo te quedan por realizar 2 más", "No te relajes la siguiente prueba requiere buena memoria","Esperemos que no seas daltónico", "Suerte!"];
let respuestaCorrecta = ["respuesta0","respuesta3","respuesta1","respuesta2","respuesta0"];
let numPregunta = 0;
let numAciertos = 0;
const tiempoTexto=5000;
let i =0;
let totalPreguntas=cuestionario.length;
const optionContainer=document.querySelector(".option-container");
const indicador = document.querySelector(".answer-indicator");
function muestraPregunta(i){
    let p = cuestionario[i];
    let pregunta = `<p>${p.pregunta}</p>`;
    let r = p.respuestas;
    let index=0;
    let animacion=0.2;
    for(;index<r.length;index++){
        let option= document.createElement("div");
        option.innerHTML=r[index];
        option.id=`respuesta${index}`;
        option.style.animationDelay=animacion+'s';
        animacion=animacion+0.15;
        option.className="option";
        optionContainer.appendChild(option);
    }
    document.querySelector(".question-number").innerHTML=`Pregunta ${numPregunta+1} de ${totalPreguntas}`;
    document.querySelector(".question-text").innerHTML = pregunta;
    validarRespuesta() 
}
let lineaHistoria = 0;
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
            window.open("simonDice.html");
            window.close();
        }, tiempoTexto);
    }
}

function $(selector){
    return document.querySelector(selector);
}
function validarRespuesta(){
    let options=[]
    options=document.getElementsByClassName("option");
    let z=0;
    for(;z<options.length;z++){
            options[z].addEventListener("click",function(){
            let options2=[];
            options2=document.getElementsByClassName("option");
            let y=options2.length-1;
            let eleccion = this.id;
            if(eleccion == respuestaCorrecta[numPregunta]){
                numAciertos++;
                document.getElementById(`${eleccion}`).classList.add("correct");
                updateIndicador("correct");
            }else{
                document.getElementById(`${eleccion}`).classList.add("wrong");
                updateIndicador("wrong");
            }
            respondido();
            numPregunta++;
            setTimeout(()=>{
                if(numPregunta<totalPreguntas){
                    for(;y>=0;y--){
                        optionContainer.removeChild(options2[y]);
                    }
                    muestraPregunta(numPregunta); 
                }else{
                    document.querySelector(".question-number").innerHTML="Completado!♥";
                    document.querySelector(".question-text").innerHTML="";
                    document.querySelector(".option-container").innerHTML="";
                    if(numAciertos>=3){
                        document.getElementById("texto").innerHTML=`Enhorabuena has completado y pasado con éxito la primera prueba con un total de ${numAciertos} de 5 preguntas`;
                        localStorage.setItem('pruebaPasadas','1');
                    }else{
                        document.getElementById("texto").innerHTML=`Has completado la prueba pero no la has pasado has acertado ${numAciertos} de 5 preguntas`;
                        localStorage.setItem('pruebaPasadas','0');
                    }
                    setTimeout(() => {
                        muestraTexto();
                    }, tiempoTexto);
                    
                }
            },1000);
            
        });
    }
    
}
function respondido(){
    let numOption = optionContainer.children.length;
    let a =0;
    for(;a<numOption;a++){
        optionContainer.children[a].classList.add("respondido");
    }
}
function incidacorPregunta(){
    let b=0;
    for(;b<cuestionario.length;b++){
        let indicadorRespuestas=document.createElement("div");
        indicador.appendChild(indicadorRespuestas);
    }
}
function updateIndicador(resultado){
    indicador.children[numPregunta].classList.add(resultado);
}
muestraPregunta(i);
incidacorPregunta();
