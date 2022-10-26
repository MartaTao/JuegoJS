let lineaHistoria = 0;
let contHistoria = 0;
const tiempoTexto=5000;
let historia = ["Te despierta como un día cualquiera", "Enciendes el ordenador y te metes en el Gmail","Ves un correo para nada sospechoso...","Oh no! te han hackeado, tendras que resolver 3 pruebas para desactivar el virus"];
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
            window.open("html/trivia.html");
            window.close();
        }, tiempoTexto);
    }
}
muestraTexto();


