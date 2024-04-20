import { BaseRouter } from "./ruter";
import { AudioGeneratorController } from '../controllers/audioGenerator.controller';

export class AudioGeneratorRouter extends BaseRouter<AudioGeneratorController>{

    constructor(){
        super(AudioGeneratorController);
    }

    routes():void{
        this.router.get("/voiceCodes", (req, res)=> this.controller.VoiceCodes(req, res));
        this.router.post("/generateAudio", (req,res)=> this.controller.generateAudio(req, res));
        this.router.post("/downloadAudio", (req,res)=> this.controller.downloadAudio(req, res));
    }
}