import { BaseRouter } from "./ruter";
import { AudioGeneratorController } from '../controllers/audioGenerator.controller';

export class AudioGeneratorRouter extends BaseRouter<AudioGeneratorController>{ //Al crear BaseRouter le dijimos que<T> es un controlador ahora le indicamos que controlador le pasaremos en este caso AudioGeneratorController

    //Como esta es una clase con extends de BaseRouter debemos 
    //agregar super() y dentro de super lo que se declaro en el constructor de 
    //BaseRouter que era constructor(TController: {new ():T}) ahora sera super(AudioGeneratorController)
    constructor(){
        super(AudioGeneratorController);
    }

    //aqui ya utilizamos la funcion routes() y el super() ya me trajo 
    //todos los metodos disponibles de BaseRouter y del controlador
    routes():void{
        this.router.get("/voiceCodes", (req, res)=> this.controller.VoiceCodes(req, res));
        this.router.post("/generateAudio", (req,res)=> this.controller.generateAudio(req, res));
        this.router.post("/downloadAudio", (req,res)=> this.controller.downloadAudio(req, res));
    }
}