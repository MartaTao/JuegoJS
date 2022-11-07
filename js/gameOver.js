let lineaHistoria = 0;
const tiempoTexto=6000;
let historia = ["¡Oh...! Vaya.. que inesperado... no pensé que fallarías así....",
"Esto no ha sido para elegante.... ni divertido....",
"Bueno se ha quedado buena tarde, si quieres deshacerte del virus puedes volver a intentarlo."];
function muestraTexto(){
    let texto = historia[lineaHistoria];
    document.getElementById("texto").innerHTML = texto;
    lineaHistoria++;
    if(lineaHistoria<historia.length){
        setTimeout(() => {
            muestraTexto();
        }, tiempoTexto);
        
    }
}
function $(selector){
    return document.querySelector(selector);
}
$("#btn").addEventListener('click',()=>{
    window.open("../html/trivia.html");
});
muestraTexto();