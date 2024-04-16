import { Request, Response } from "express";
import { englishCodesList,  spanishCodesList } from '../code-list';
import { config, createAudioFromText } from 'tiktok-tts';

const fileSystem = require('fs');
const fs = require('fs').promises
import path from 'path';


export class AudioGeneratorController{

    VoiceCodes (req: Request, res: Response ){ //tiene que ser del http de express por ello hay que seleccionar una opcion del autocompletado parecido a este:  -o Request y en automatico se agrega el import de {Request, Response}
        try {

            return res.status(200).send({
                data:{
                    englishCodesList: englishCodesList,
                    spanishCodesList: spanishCodesList
                }
            });
            
        } catch (error) {
            return res.status(500).send({
                message: 'Algo salio mal intentalo de nuevo',
            });
        }
    }


    generateAudio (req: Request, res: Response ){
        const {sessionId, audiosData} = req.body;
        const FOLDER_TO_REMOVE = './src/audios';

        fs.readdir(FOLDER_TO_REMOVE)
        .then(files => {
          const unlinkPromises = files.map(file => {
            const filePath = path.join(FOLDER_TO_REMOVE, file);
            console.log(filePath);
            
            return fs.unlink(filePath)
          })
      
          return Promise.all(unlinkPromises)
        }).catch(err => {
          console.error(`Something wrong happened removing files of ${FOLDER_TO_REMOVE}`)
        })

        try {
            console.log('en el try:',sessionId, audiosData);
            let audiosSaved=[];

            for (let i = 0; i < audiosData.length; i++) {
                this.tiktokAudio(sessionId, audiosData[i].textToAudio, './src/audios/'+`0${i+1} `+audiosData[i].voiceName, audiosData[i].voiceCode);
                audiosSaved.push({'fileName':`0${i+1} `+audiosData[i].voiceName+'.mp3'});
            }

            return res.status(200).json({
                data: audiosSaved,
                message: 'Audios generados'
            });

            
        } catch (error) {
            return res.status(500).send({
                message: 'Los audios no pudieron ser generados',
            });
        }
    }

    tiktokAudio(sessionId:string, textToAudio:string , voiceName:string, voiceCode:string){
        console.log('sessionId:', sessionId, 'textToAudio:', textToAudio, 'voiceName:', voiceName, 'voiceCode:', voiceCode);
        
        config(sessionId);
        createAudioFromText(textToAudio, voiceName, voiceCode);
    }


    downloadAudio (req: Request, res: Response ){
        const {fileName} = req.body;
        const FOLDER_TO_DOWNLOAD = './src/audios/';
        console.log('fileName:', fileName);
        console.log(FOLDER_TO_DOWNLOAD+fileName);
        


        // try {

            const downloadFilePath = path.join( FOLDER_TO_DOWNLOAD, fileName)
            const readStream = fileSystem.createReadStream(downloadFilePath);
            console.log(readStream);
            
            readStream.pipe(res);


            // return res.status(200).json({
            //     message: 'Audio descargado'
            // });

            
        // } catch (error) {
        //     return res.status(500).send({
        //         message: 'Los audios no pudieron ser descargados',
        //     });
        // }
        
    }
}



// generateAudio (req: Request, res: Response ){
//     try {
//         const {sessionId, voiceCode, textToAudio} = req.body;
//         console.log('en el try:',sessionId, voiceCode, textToAudio);

//         config(sessionId);
//         createAudioFromText( textToAudio, voiceCode, voiceCode);

//         return res.status(200).send({
//             message: 'Audios generados'
//         });
        
//     } catch (error) {
//         return res.status(500).send({
//             message: 'Los audios no pudieron ser generados',
//         });
//     }
// }