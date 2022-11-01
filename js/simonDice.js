const numRonda = document.getElementById('ronda');
const botones = document.getElementsByClassName('square');
const totalRondas=5;
class Simon{
    constructor(botones){
        this.ronda=0;
        this.posicion=0;
        this.totalRondas= totalRondas;
        this.secuencia=[];
        this.velocidad=1000;
        this.botonesBloqueados=true;
        this.botones=Array.from(botones);
        this.display=ronda;
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
            this.esColorCorrecto(color);
        } 
    }
    esColorCorrecto(color){
        if(this.secuencia[this.posicion]==value){
            this.botonesSonidos[color].play();
            if(this.ronda == this.posicion){
                this.updateRound(this.ronda++);
                this.velocidad/=1.02;
                this.haTermiando();
            }else{
                this.posicion++;
            }
        }else{

        }
    }
    haTermiando(){
        if(this.ronda==this.totalRondas){

        }else{
            this.posicion=0;
            this.muestraSecuencia();
        }
    }
    muestraSecuencia(){
        this.botonesBloqueados=true;
        let secuenciaIndex=0;
        let contador=setInterval(()=>{

        },this.velocidad);
    }
}

const simon= new Simon(botones);