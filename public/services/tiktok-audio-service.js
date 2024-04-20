class TikTokAudioRequests{
    constructor(){
        this.uri='http://localhost:1234/tiktokVoiceGeneratorApp/'
    }

    async getVoiceCodes(){
       const response =  await fetch(this.uri + 'voiceCodes');
       const voiceCodes = await response.json();
       return voiceCodes;
    }
    
    async generateAudio(convertTextToAudio){
        try {
            let textToJson= JSON.stringify(convertTextToAudio);
            let newUri= this.uri + 'generateAudio';
            const response = await fetch(newUri, {
                headers:{"Content-Type": "application/json"},
                method: 'POST',
                body: textToJson
            });
            const generatedAudios = await response.json();
            return generatedAudios;
        } catch (error) {
            console.log(error);
        }
    }

    async downloadAudio(fileNameObject){
        try {
            let textToJson= JSON.stringify(fileNameObject)
            let newUri= this.uri + 'downloadAudio';
            const response = await fetch(newUri, {
                headers:{"Content-Type": "application/json"},
                method: 'POST',
                body: textToJson
            });
            const downloadedAudios = await response.blob();
            return downloadedAudios;
        } catch (error) {
            console.log(error);
            sessionIdWarn(sessionIdIncorrect);
        }
  
    }
}
