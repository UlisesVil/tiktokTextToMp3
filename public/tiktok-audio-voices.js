//inputSessionId:::::::::::::
const inputSessionId = document.getElementById('tiktokSessionId');
//Spanish Lists::::::::::::::
var englishCodesList=[], spanishCodesList=[];
const addSpanishLineButton = document.getElementById('addSpanishLine');
var listOfSpanishText = [];
var spanishListElements='';
var spanishList= document.getElementById('spanishList');
const sendSpanishList = document.getElementById('sendSpanishList');
//English Lists::::::::::::::
const addEnglishLineButton = document.getElementById('addEnglishLine');
var listOfEnglishText = [];
var englishListElements='';
var englishList= document.getElementById('englishList');
const sendEnglishList = document.getElementById('sendEnglishList');
var audioGeneratedElements="";
//Create Lists::::::::::::::
const maxItems = 10;
const maxItemsMessage=`<p>Solo puedes agregar un maximo de ${maxItems} textos a la lista</p>`
//Forms::::::::::::::::::::::
const englishTiktokVoiceForm = document.getElementById('englishTiktokVoiceForm');
const spanishTiktokVoiceForm = document.getElementById('spanishTiktokVoiceForm');

//Wanings::::::::::::::::::::
//Electron Aplication
// const sessionIdWarnMessage=`<p>Debes introducir tu Session Id de TikTok, puedes ver como obtenerlo en la parte superior izquierda de la aplicación, dale click en el icono de menú <i class="fa fa-bars" aria-hidden="true"></i></p>`;
//const sessionIdIncorrect= `<p>El audio no fue generado correctamente verifica que tu TikTok Session Id sea el correcto, puedes ver como obtenerlo en la parte superior izquierda de la aplicación, dale click en el icono de menú <i class="fa fa-bars" aria-hidden="true"></i></p>`;

//Web Aplication
const sessionIdWarnMessage=`<p>Debes introducir tu Session Id de TikTok, puedes ver como obtenerlo en la parte superior izquierda de la aplicación, dale click en el icono flecha derecha <i class="fa fa-arrow-right" aria-hidden="true"></i></p>`;
const sessionIdIncorrect= `<p>El audio no fue generado correctamente verifica que tu TikTok Session Id sea el correcto, puedes ver como obtenerlo en la parte superior izquierda de la aplicación, dale click en el icono flecha derecha <i class="fa fa-arrow-right" aria-hidden="true"></i></p>`;

window.addEventListener('load', async()=>{
    const tiktokSessionIdStoraged = localStorage.getItem('tiktokSessionId');
    
    tiktokSessionIdStoraged === null ? 
        inputSessionId.value = '' : 
        inputSessionId.value=tiktokSessionIdStoraged
    ;

    const _tikTokReqService = new TikTokAudioRequests();
    const voiceCodes = await _tikTokReqService.getVoiceCodes();
    if(voiceCodes.data){
        englishCodesList = voiceCodes.data.englishCodesList;
        spanishCodesList = voiceCodes.data.spanishCodesList;
    }
    if(voiceCodes.message){
        sessionIdWarn(`<p>${voiceCodes.message}</p>`);
    }
    const englishVoiceOptions = document.getElementById('englishVoiceOptions');
    let englishOptions='';
    for (let i = 0; i < englishCodesList.length; i++) {
        englishOptions += `<option value="${englishCodesList[i].voiceCode}">${englishCodesList[i].name}</option>`
    }
    englishVoiceOptions.innerHTML=englishOptions;
    const spanishVoiceOptions = document.getElementById('spanishVoiceOptions');
    let spanishOptions='';
    for (let i = 0; i < spanishCodesList.length; i++) {
        spanishOptions += `<option value="${spanishCodesList[i].voiceCode}">${spanishCodesList[i].name}</option>`
    }
    spanishVoiceOptions.innerHTML=spanishOptions;
});

//Submit Spanish Element:::::::::::::::::::::::::::
spanishTiktokVoiceForm.addEventListener('submit', async e =>{
    e.preventDefault();
    let tiktokSessionId = document.getElementById('tiktokSessionId').value;
    if (tiktokSessionId==='') {
        sessionIdWarn(sessionIdWarnMessage);
    }else{
        let spanishOptionSelectedName = document.getElementById('spanishVoiceOptions');
        let selectedIndex = spanishOptionSelectedName.selectedIndex;
        let optionNameSelected = spanishOptionSelectedName.options[selectedIndex].text

        let spanishOptionSelectedCode = document.getElementById('spanishVoiceOptions').value;
        let textToAudio = document.getElementById('spanishTextLine').value;
        localStorage.setItem('tiktokSessionId', tiktokSessionId);

        let spanishToAudio = [{'voiceCode':spanishOptionSelectedCode, 'textToAudio':textToAudio, 'voiceName':optionNameSelected}]

        let audioObject={'sessionId':tiktokSessionId, 'audiosData':spanishToAudio}
        let tiktokPostService= new TikTokAudioRequests();
        let generatedAudios = await tiktokPostService.generateAudio(audioObject);
        if (generatedAudios) {
            audioGeneratedList(generatedAudios.data);
        }
    }
});

//Submit English Element:::::::::::::::::::::::::::
englishTiktokVoiceForm.addEventListener('submit', async e =>{
    e.preventDefault();
    let tiktokSessionId = document.getElementById('tiktokSessionId').value;
    if (tiktokSessionId==='') {
        sessionIdWarn(sessionIdWarnMessage);
    }else{
        let englishOptionSelectedName = document.getElementById('englishVoiceOptions');
        let selectedIndex = englishOptionSelectedName.selectedIndex;
        let optionNameSelected = englishOptionSelectedName.options[selectedIndex].text

        let englishOptionSelectedCode = document.getElementById('englishVoiceOptions').value;
        let textToAudio = document.getElementById('englishTextLine').value;
        localStorage.setItem('tiktokSessionId', tiktokSessionId);

        let englishToAudio = [{'voiceCode':englishOptionSelectedCode, 'textToAudio':textToAudio, 'voiceName':optionNameSelected}]

        let audioObject={'sessionId':tiktokSessionId, 'audiosData':englishToAudio}
        let tiktokPostService= new TikTokAudioRequests();
        let generatedAudios = await tiktokPostService.generateAudio(audioObject);
        if (generatedAudios) {
            audioGeneratedList(generatedAudios.data);
        }
    }
});

// Create Spanish List::::::::::::::
addSpanishLineButton.addEventListener('click', (e)=>{
    let spanishOptionSelectedName = document.getElementById('spanishVoiceOptions');
    let selectedIndex = spanishOptionSelectedName.selectedIndex;
    let optionNameSelected = spanishOptionSelectedName.options[selectedIndex].text
    let spanishOptionSelectedCode = document.getElementById('spanishVoiceOptions').value;
    let textToAudio = document.getElementById('spanishTextLine').value;
    listOfSpanishText.push(
        {
            'voiceName':optionNameSelected,
            'voiceCode':spanishOptionSelectedCode, 
            'textToAudio':textToAudio,
        }
    );
    if (listOfSpanishText.length > 0 && listOfSpanishText.length <= maxItems) {
        sendSpanishList.style.display = 'block';
        spanishListElements='';
        for (let i = 0; i < listOfSpanishText.length; i++) {
            spanishListElements += `<li class="listElement"> <span>${i+1} - Voz: </span> ${listOfSpanishText[i].voiceName} - <span>Texto: </span>${listOfSpanishText[i].textToAudio} <i class="fa fa-times spanishElement" aria-hidden="true" onclick="deleteSpanishElement(${i})"></i></li>`
        }
        spanishList.innerHTML=spanishListElements;
    }
    if(listOfSpanishText.length > maxItems){
        sessionIdWarn(maxItemsMessage);
    }
});
// Create English List::::::::::::::
addEnglishLineButton.addEventListener('click', (e)=>{
    let englishOptionSelectedName = document.getElementById('englishVoiceOptions');
    let selectedIndex = englishOptionSelectedName.selectedIndex;
    let optionNameSelected = englishOptionSelectedName.options[selectedIndex].text
    let englishOptionSelectedCode = document.getElementById('englishVoiceOptions').value;
    let textToAudio = document.getElementById('englishTextLine').value;
    listOfEnglishText.push(
        {
            'voiceCode':englishOptionSelectedCode, 
            'textToAudio':textToAudio,
            'voiceName':optionNameSelected,
        }
    );
    if (listOfEnglishText.length>0 && listOfEnglishText.length <= maxItems) {
        sendEnglishList.style.display = 'block';
        englishListElements='';
        for (let i = 0; i < listOfEnglishText.length; i++) {
            englishListElements += `<li class="listElement"> <span>${i+1} - Voz: </span> ${listOfEnglishText[i].voiceName} - <span> Texto: </span>${listOfEnglishText[i].textToAudio} <i class="fa fa-times englishElement" aria-hidden="true" onclick="deleteEnglishElement(${i})"></i></li>`
        }
        englishList.innerHTML=englishListElements;
    }
    if(listOfEnglishText.length > maxItems){
        sessionIdWarn(maxItemsMessage);
    }
});

//Send Spanish list to get Audios
sendSpanishList.addEventListener('click', async ()=>{
    if (inputSessionId.value==='') {
        sessionIdWarn(sessionIdWarnMessage);
    }else{
        let audioObject={'sessionId':inputSessionId.value, 'audiosData':listOfSpanishText};
        let tiktokPostService= new TikTokAudioRequests();
        let generatedAudios = await tiktokPostService.generateAudio(audioObject);
        if (generatedAudios) {
            audioGeneratedList(generatedAudios.data);
        }
    }
});

//Send English list to get Audios
sendEnglishList.addEventListener('click', async ()=>{
    if (inputSessionId.value==='') {
        sessionIdWarn(sessionIdWarnMessage);
    }else{
        let audioObject={'sessionId':inputSessionId.value, 'audiosData':listOfEnglishText};
        let tiktokPostService= new TikTokAudioRequests();
        let generatedAudios = await tiktokPostService.generateAudio(audioObject);
        if (generatedAudios) {
            audioGeneratedList(generatedAudios.data);
        }
    }
});

//Delete element fron Spanish List:::::::::::::::
function deleteSpanishElement(index){
    listOfSpanishText.splice(index,1);
    spanishListElements='';
    for (let i = 0; i < listOfSpanishText.length; i++) {
        spanishListElements += `<li class="listElement"> <span>Voz: </span> ${listOfSpanishText[i].voiceName} - <span> Texto: </span>${listOfSpanishText[i].textToAudio} <i class="fa fa-times spanishElement" aria-hidden="true" onclick="deleteSpanishElement(${i})"></i></li>`
    }
    spanishList.innerHTML=spanishListElements;
    if (listOfSpanishText.length===0) {
        sendSpanishList.style.display = 'none';
    }
}

//Delete element fron English List:::::::::::::::
function deleteEnglishElement(index){
    listOfEnglishText.splice(index,1);
    englishListElements='';
    for (let i = 0; i < listOfEnglishText.length; i++) {
        englishListElements += `<li class="listElement"> <span>Voz: </span> ${listOfEnglishText[i].voiceName} - <span> Texto: </span>${listOfEnglishText[i].textToAudio} <i class="fa fa-times englishElement" aria-hidden="true" onclick="deleteEnglishElement(${i})"></i></li>`
    }
    englishList.innerHTML=englishListElements;
    if (listOfEnglishText.length===0) {
        sendEnglishList.style.display = 'none';
    }
}

//List of Generated Audios ::::::::::
function audioGeneratedList(responseData){
    let audiogeneratedList = document.getElementById('generatedAudiosList');
    audioGeneratedElements='';
    for (let i = 0; i < responseData.length; i++) {
        audioGeneratedElements += `<li class="downloadListElement"> <span>Archivo: </span> ${responseData[i].fileName}<i class="fa fa-download downloadElement" aria-hidden="true" onclick="downloadElement('${responseData[i].fileName}')" alt="Descargar"></i></li>`
    }
    audiogeneratedList.innerHTML=audioGeneratedElements
}

//Download audio from selected element
async function downloadElement (fileName){
    let fileNameObject={'fileName':fileName};
    let tiktokPostService= new TikTokAudioRequests();
    const blob = await tiktokPostService.downloadAudio(fileNameObject);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
}


//How to get Session Id Instructions Menu
const hideInstructions = document.getElementById('hideInstructions');
const showInstructions = document.getElementById('showInstructions');
hideInstructions.addEventListener('click', ()=>{
    hideInstructions.style.display='none'
    showInstructions.style.display='block'

})
showInstructions.addEventListener('click', ()=>{
    showInstructions.style.display='none'
    hideInstructions.style.display='block'
})

//Modal Warning
function sessionIdWarn(message){
    let warningContainer= document.getElementById('warningContainer');
    warningContainer.style.display="flex";
    let warning= document.getElementById('warning');
    warning.innerHTML=message + `<button  class="agreeButton" onclick="closeWarning()">Ok!</button>`;

};
function closeWarning(){
    let warningContainer= document.getElementById('warningContainer');
    warningContainer.style.display="none";
}