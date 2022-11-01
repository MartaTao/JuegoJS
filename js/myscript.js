let lineaHistoria = 0;
const tiempoTexto=5000;
let historia = ["Te despierta como un día cualquiera", "Enciendes el ordenador y te metes en el Gmail","Ves un correo para nada sospechoso...","Oh no! te han hackeado","Tendras que resolver 3 pruebas para desactivar el virus", "Mínimo se necesita pasar 2 pruebas"];
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
            window.open("html/trivia.html");
            window.close();
        }, tiempoTexto);
    }
}
muestraTexto();


