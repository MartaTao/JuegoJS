let lineaHistoria = 0;
const tiempoTexto=6000;
let historia = ["Estás en tu cuarto disfrutando de un día de lluvia junto a tu gato.",
"Decides encender el ordenador y ver unos videos en Youtube, trás eso te llega la notificación de que te ha llegado un correo.",
"Ves un correo un poco raro, pero piensas que es una broma de algún amigo y decides abrirlo",
"Lees el correo atentamente y sigues sin creerte que sea real.",
"Te quedas mirando a ver si realmente pasa algo antes de echarte unas partidas al Lol, no vaya a ser que sea cierto y te puedan bannear por descoenctarte" ];
const fondo = document.getElementById('fondo');

function muestraTexto(){
    let texto = historia[lineaHistoria];
    document.getElementById("texto").innerHTML = texto;
    lineaHistoria++;
    if(lineaHistoria<historia.length){
        setTimeout(() => {
            muestraTexto();
        }, tiempoTexto);
        if(lineaHistoria==3){
            fondo.style.backgroundImage="url(../images/gmail.png)";
        }else if(lineaHistoria==4){
            fondo.style.backgroundImage="url(../images/correo.png)";
        }
    }else{
        setTimeout(() => {
            window.open("html/trivia.html");
            window.close();
        }, tiempoTexto);
    }
}
muestraTexto();


