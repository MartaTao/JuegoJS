let lineaHistoria = 0;
const tiempoTexto=6000;
let historia = ["¡Vaya, vaya!, por los pelos eh, has supero 2 pruebas. Te has deshecho casi por completo del virus.",
"¿Te preguntas que va a pasar con lo poco que ha quedado? Pues te invadirá poco a poco con cosas de My Little Pony.",
"¿La has visto? Ya salio la nueva generación y prontó saldra el especial Navidad y cierre de temporada....",
"Bueno que me voy por las ramas, jejeje perdona, como te iba diciendo. Si quieres deshacerte por completo del virus tienes tres opciones.",
"La primera y la más logica lo eliminas con un antivirus.", 
"La seguna lo llevas a un informático que te costará un ojo de la cara para que te ponga un Windows pirata y te cobre como si fuera uno oficial",
"La tercera y mas divertida es.... ¡redoble de tambores!",
"¡Volver a jugar conmigo! No es mal plan, tu, tu gato y yo en un dia de lluvia como hoy, no sé piensalo ;) ♥."];
audio=new Audio("../other/tambores.mp3");

function muestraTexto(){
    let texto = historia[lineaHistoria];
    document.getElementById("texto").innerHTML = texto;
    lineaHistoria++;
    if(lineaHistoria<historia.length){
        setTimeout(() => {
            muestraTexto();
        }, tiempoTexto);
        if(lineaHistoria==historia.length-1){
            audio.play();
        }
    }
}
muestraTexto();