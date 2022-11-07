const numRonda = document.getElementById('ronda');
const botones = document.getElementsByClassName('square');
const totalRondas=5;
class Simon{
    constructor(botones, ronda){
        this.ronda=0;
        this.posicion=0;
        this.totalRondas= totalRondas;
        this.secuencia=[];
        this.velocidad=1000;
        this.botonesBloqueados=true;
        this.botones=Array.from(botones);
        this.display={
            ronda
        };
        this.errorSonido= new Audio('../other/error.wav');
        this.botonesSonidos = [new Audio('../other/1.mp3'),new Audio('../other/2.mp3'),new Audio('../other/3.mp3'),new Audio('../other/4.mp3')];
    }
    //Empieza el juego
    startGame(){
        this.updateRound(0);
        this.posicion=0;
        this.secuencia = this.creaSecuencia();
        this.botones.forEach((element,i)=>{
            element.onclick=()=>this.buttonClick(i);
        });
        this.muestraSecuencia();
    }
    //Actualiza la ronda
    updateRound(ronda){
        this.ronda=ronda;
        this.display.ronda.textContent = `Ronda ${this.ronda}`;
    }
    //Crea la secuencia con la longitud del totalRondas con el valor obtenido de getColorRandom()
    creaSecuencia(){
        return Array.from({length:this.totalRondas},()=>this.getColorRandom());
    }
    //Devuelve un valor random entre 0 y 3
    getColorRandom(){
        return Math.floor(Math.random()*4);//floor redondea el valor random
    }
    //Si los botones no estan bloqueados valida que el color sea el correcto
    buttonClick(value){
        if(!this.botonesBloqueados){
            this.esColorCorrecto(value);
        } 
    }
    esColorCorrecto(color){
        if(this.secuencia[this.posicion]==color){
            this.botonesSonidos[color].play();
            if(this.ronda == this.posicion){
                this.updateRound(this.ronda+1);
                this.velocidad/=1.02;
                this.haTermiando();
            }else{
                this.posicion++;
            }
        }else{
            this.errorSonido.play();
            document.getElementById("texto").innerHTML=`Vaya no has conseguido superar la prueba`;
            localStorage.setItem('pruebaPasadas','2');
            if(localStorage.getItem('pruebaPasadas')==0){
                setTimeout(() => {
                    window.open("gameOver.html");
                    window.close();
                }, tiempoTexto);
            }else{
                muestraTexto();
            }
        }
    }
    haTermiando(){
        if(this.ronda==this.totalRondas){
            document.getElementById("texto").innerHTML=`Enhorabuena has completado la segunda prueba`;
            localStorage.setItem('prueba2','pasada');
            setTimeout(() => {
                muestraTexto();
            }, tiempoTexto);
        }else{
            this.posicion=0;
            this.muestraSecuencia();
        }
    }
    muestraSecuencia(){
        this.botonesBloqueados=true;
        let secuenciaIndex=0;
        let contador=setInterval(()=>{
            const boton = this.botones[this.secuencia[secuenciaIndex]];//Selecciona el boton que debe iluminar
            this.botonesSonidos[this.secuencia[secuenciaIndex]].play();//realiza el sonido correspondiente al boton
            this.iluminaBoton(boton);
            setTimeout(()=>this.iluminaBoton(boton),this.velocidad/2);
            secuenciaIndex++;
            if(secuenciaIndex>this.ronda){
                this.botonesBloqueados=false;
                clearInterval(contador);
            }
        },this.velocidad);
    }
    iluminaBoton(boton){
        boton.classList.toggle('active');
    }
}
let lineaHistoria = 0;
const tiempoTexto=5000;
let historia = ["Ya solo te queda la última prueba!","Para superarla necesitarás saberte el diccionario...","No te preocupes no son definiciones demasiadas rebuscadas","...... o eso creo"];
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
            window.open("sudoku.html");
            window.close();
        }, tiempoTexto);
    }
}
const simon= new Simon(botones, numRonda);
setTimeout(()=>{
    simon.startGame();
},2000);