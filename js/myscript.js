let cuestionario = [
    {"pregunta":"De qué color es el caballo blacno de Santiago?",
     "respuestas":["Rojo","Qué caballo?","Blanco y en botella chele"]   
}
];
function $(selector){
    return document.querySelector(selector);
}
let muestraPregunta = (i) =>{
    let p = cuestionario[i];
    let pregunta = `<p>${p.pregunta}</p>`;
    let r = p.respuestas;
    let respuesta = "";
    let index=0;
    for(;index<r.length;index++){
        respuesta += `<input type="radio" name="respuesta" value=${index} onClick="verificaRespuesta()">`+r[index]+'<br>';
    }
    document.getElementById("pregunta").innerHTML = pregunta;
    $("#respuestas").appendChild(document.getElementById("respuestas").innerHTML = respuesta);
}
muestraPregunta(0);

function verificaRespuesta(){
    let eleccion = document.getElementById("respuesta");
    console.log(eleccion);
}