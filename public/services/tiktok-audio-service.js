class TikTokAudioRequests{
    constructor(){
        this.uri='http://localhost:3000/tiktokVoiceGeneratorApp/'
    }

    async getVoiceCodes(){
       const response =  await fetch(this.uri + 'voiceCodes');
       const voiceCodes = await response.json();
       return voiceCodes;
    }
    
    async generateAudio(convertTextToAudio){
        console.log(convertTextToAudio);
        let textToJson= JSON.stringify(convertTextToAudio)
        // console.log(textToJson);
        let newUri= this.uri + 'generateAudio';
        const response = await fetch(newUri, {
            headers:{"Content-Type": "application/json"},
            method: 'POST',
            body: textToJson
        });
        const generatedAudios = await response.json();
        // console.log(generatedAudios);
        return generatedAudios;
    }

    async downloadAudio(fileNameObject){
        console.log(fileNameObject);
        let textToJson= JSON.stringify(fileNameObject)
        // console.log(textToJson);
        let newUri= this.uri + 'downloadAudio';
        const response = await fetch(newUri, {
            headers:{"Content-Type": "application/json"},
            method: 'POST',
            body: textToJson
        });
        const downloadedAudios = await response.blob();
        console.log(downloadedAudios);
        return downloadedAudios;
     }

}

// module.exports = TikTokAudioRequests;