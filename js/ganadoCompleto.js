let lineaHistoria = 0;
const tiempoTexto=6000;
let historia = ["Te has deshecho de mi virus por completo.",
"Ha sido divertido, deberíamos repetirlo en otra ocasion, ¿qué te parece?",
"No hace falta que respondas (como si pudieras) sé que te ha encantado.","Bueno ya jugaremos otro día, ¡chao!"];

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
muestraTexto();