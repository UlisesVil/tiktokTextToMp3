import { Request, Response } from "express";
import { englishCodesList,  spanishCodesList } from '../code-list';
import { config, createAudioFromText } from 'tiktok-tts';
import fs from 'fs';
import path from 'path';
const fsPromises = require('fs').promises
const dirPathAudios = path.join(__dirname, '../../public/audios');

export class AudioGeneratorController{

    VoiceCodes (req: Request, res: Response ){
        try {
            return res.status(200).send({
                data:{
                    'englishCodesList': englishCodesList,
                    'spanishCodesList': spanishCodesList
                }
            });
        } catch (error) {
            return res.status(500).send({
                'message': 'No se Pudieron recuperar las listas de los codigos para Generar los audios. Intentalo de Nuevo',
            });
        }
    }

    generateAudio (req: Request, res: Response ){
        const {sessionId, audiosData} = req.body;
        //Web APP only:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        if (fs.existsSync(dirPathAudios)) {
            console.log("El directorio ya existe");
        }else{
            fs.mkdir(dirPathAudios, (error)=>{
                if (error) {
                    console.log(error.message);
                }
                console.log('Directorio creado');
            })
        }
        fsPromises.readdir(dirPathAudios)
        .then(files => {
          const unlinkPromises = files.map(file => {
            const filePath = path.join(dirPathAudios, file);
            return fsPromises.unlink(filePath)
          });
          return Promise.all(unlinkPromises)
        }).catch(error => {
          console.error(`Something wrong happened removing files of ${dirPathAudios}`);
        });
        //::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

        try {
            let audiosSaved=[];
            for (let i = 0; i < audiosData.length; i++) {
                let audioName = 'Audio from text 0'+(i+1);
                let audioPath = path.join(dirPathAudios, audioName)
                this.tiktokAudio(sessionId, audiosData[i].textToAudio, audioPath, audiosData[i].voiceCode)
                audiosSaved.push({'fileName': audioName+'.mp3'});
            }
            return res.status(200).json({
                'data': audiosSaved,
                'message': 'Audios generados'
            });
        } catch (error) {
            return res.status(500).send({
                'message': 'Los audios no pudieron ser generados',
            });
        }
    }

    tiktokAudio(sessionId:string, textToAudio:string , voiceName:string, voiceCode:string){        
        config(sessionId);
        createAudioFromText(textToAudio, voiceName, voiceCode);
    }

    downloadAudio (req: Request, res: Response ){
        const {fileName} = req.body;
        try {
            const downloadFilePath = path.join( dirPathAudios, `${fileName}`);
            const readStream = fs.createReadStream(downloadFilePath);
            readStream.pipe(res);
        } catch (error) {
            return res.status(500).send({
                'message': 'Los audios no pudieron ser descargados',
            });
        }
    }
}
