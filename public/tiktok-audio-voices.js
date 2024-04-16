var englishCodesList=[], spanishCodesList=[];

const addSpanishLineButton = document.getElementById('addSpanishLine');
var listOfSpanishText = [];
var spanishListElements='';
var spanishList= document.getElementById('spanishList');
const sendSpanishList = document.getElementById('sendSpanishList');

const addEnglishLineButton = document.getElementById('addEnglishLine');
var listOfEnglishText = [];
var englishListElements='';
var englishList= document.getElementById('englishList');
const sendEnglishList = document.getElementById('sendEnglishList');

var audioGeneratedElements="";

window.addEventListener('load', async()=>{
    // console.log('La ventana esta lista');
    const tiktokSessionIdStoraged = localStorage.getItem('tiktokSessionId');
    // console.log(tiktokSessionIdStoraged);
    let inputSessionId = document.getElementById('tiktokSessionId');
    tiktokSessionIdStoraged === null ? 
        inputSessionId.value = '' : 
        inputSessionId.value=tiktokSessionIdStoraged
    ;


    const _tikTokReqService = new TikTokAudioRequests();
    const voiceCodes = await _tikTokReqService.getVoiceCodes();
    if(voiceCodes.data){
        englishCodesList = voiceCodes.data.englishCodesList;
        spanishCodesList = voiceCodes.data.spanishCodesList;
    }else if(voiceCodes.message){
        // console.log(voiceCodes.message);
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



    const englishTiktokVoiceForm = document.getElementById('englishTiktokVoiceForm');
    const spanishTiktokVoiceForm = document.getElementById('spanishTiktokVoiceForm');

    englishTiktokVoiceForm.addEventListener('submit', async e =>{
        e.preventDefault();
        let englishOptionSelectedName = document.getElementById('englishVoiceOptions');
        let selectedIndex = englishOptionSelectedName.selectedIndex;
        let optionNameSelected = englishOptionSelectedName.options[selectedIndex].text
        // console.log(optionNameSelected);

        let englishOptionSelectedCode = document.getElementById('englishVoiceOptions').value;
        let textToAudio = document.getElementById('englishTextLine').value;
        let tiktokSessionId = document.getElementById('tiktokSessionId').value;
        localStorage.setItem('tiktokSessionId', tiktokSessionId);

        // console.log(tiktokSessionId);
        // console.log(englishOptionSelectedCode);
        // console.log(textToAudio);

        let englishToAudio = [{'voiceCode':englishOptionSelectedCode, 'textToAudio':textToAudio, 'voiceName':optionNameSelected}]

        let audioObject={'sessionId':tiktokSessionId, 'audiosData':englishToAudio}
        let tiktokPostService= new TikTokAudioRequests();
        let generatedAudios = await tiktokPostService.generateAudio(audioObject);
        if (generatedAudios) {
            console.log(generatedAudios.data);
            audioGeneratedList(generatedAudios.data);
        }
    });


    spanishTiktokVoiceForm.addEventListener('submit', async e =>{
        e.preventDefault();
        let spanishOptionSelectedName = document.getElementById('spanishVoiceOptions');
        let selectedIndex = spanishOptionSelectedName.selectedIndex;
        let optionNameSelected = spanishOptionSelectedName.options[selectedIndex].text
        // console.log(optionNameSelected);
  
        let spanishOptionSelectedCode = document.getElementById('spanishVoiceOptions').value;
        let textToAudio = document.getElementById('spanishTextLine').value;
        let tiktokSessionId = document.getElementById('tiktokSessionId').value;
        localStorage.setItem('tiktokSessionId', tiktokSessionId);

        // console.log(spanishOptionSelectedCode);
        // console.log(textToAudio);
        // console.log(tiktokSessionId);

        let spanishToAudio = [{'voiceCode':spanishOptionSelectedCode, 'textToAudio':textToAudio, 'voiceName':optionNameSelected}]

        let audioObject={'sessionId':tiktokSessionId, 'audiosData':spanishToAudio}
        let tiktokPostService= new TikTokAudioRequests();
        let generatedAudios = await tiktokPostService.generateAudio(audioObject);
        if (generatedAudios) {
            console.log(generatedAudios.data);
            audioGeneratedList(generatedAudios.data);
        }
    });



    

    spanishCreateList();

    sendSpanishList.addEventListener('click', async ()=>{
        let audioObject={'sessionId':inputSessionId.value, 'audiosData':listOfSpanishText};
        // console.log(audioObject);
        let tiktokPostService= new TikTokAudioRequests();
        let generatedAudios = await tiktokPostService.generateAudio(audioObject);
        if (generatedAudios) {
            console.log(generatedAudios.data);
            audioGeneratedList(generatedAudios.data);
        }
    });



    englishCreateList();

    sendEnglishList.addEventListener('click', async ()=>{
        let audioObject={'sessionId':inputSessionId.value, 'audiosData':listOfEnglishText};
        console.log(audioObject);
        let tiktokPostService= new TikTokAudioRequests();
        let generatedAudios = await tiktokPostService.generateAudio(audioObject);
        if (generatedAudios) {
            console.log(generatedAudios.data);
            audioGeneratedList(generatedAudios.data);
        }
    });

});




function spanishCreateList(){
    addSpanishLineButton.addEventListener('click', (e)=>{
        let spanishOptionSelectedName = document.getElementById('spanishVoiceOptions');
        let selectedIndex = spanishOptionSelectedName.selectedIndex;
        let optionNameSelected = spanishOptionSelectedName.options[selectedIndex].text
        // console.log(optionNameSelected);
        let spanishOptionSelectedCode = document.getElementById('spanishVoiceOptions').value;
        let textToAudio = document.getElementById('spanishTextLine').value;
        listOfSpanishText.push(
            {
                'voiceName':optionNameSelected,
                'voiceCode':spanishOptionSelectedCode, 
                'textToAudio':textToAudio,
            }
        );
        // console.log(listOfSpanishText);
        if (listOfSpanishText.length===0) {
            console.log('esta vacio');
        }
        if (listOfSpanishText.length>0) {
            sendSpanishList.style.display = 'block';
            // console.log('array con voces');
            spanishListElements='';
            for (let i = 0; i < listOfSpanishText.length; i++) {
                spanishListElements += `<li class="listElement"> <span>Voz: </span> ${listOfSpanishText[i].voiceName} - <span>Texto: </span>${listOfSpanishText[i].textToAudio} <i class="fa fa-times spanishElement" aria-hidden="true" onclick="deleteSpanishElement(${i})"></i></li>`
            }
            spanishList.innerHTML=spanishListElements;
        }
    });
}



function englishCreateList(){
    addEnglishLineButton.addEventListener('click', (e)=>{
        let englishOptionSelectedName = document.getElementById('englishVoiceOptions');
        let selectedIndex = englishOptionSelectedName.selectedIndex;
        let optionNameSelected = englishOptionSelectedName.options[selectedIndex].text
        // console.log(optionNameSelected);
        let englishOptionSelectedCode = document.getElementById('englishVoiceOptions').value;
        let textToAudio = document.getElementById('englishTextLine').value;
        listOfEnglishText.push(
            {
                'voiceCode':englishOptionSelectedCode, 
                'textToAudio':textToAudio,
                'voiceName':optionNameSelected,
            }
        );
        // console.log(listOfEnglishText);
        if (listOfEnglishText.length===0) {
            console.log('esta vacio');
        }
        if (listOfEnglishText.length>0) {
            sendEnglishList.style.display = 'block';
            // console.log('array con voces');
            englishListElements='';
            for (let i = 0; i < listOfEnglishText.length; i++) {
                englishListElements += `<li class="listElement"> <span>Voz: </span> ${listOfEnglishText[i].voiceName} - <span> Texto: </span>${listOfEnglishText[i].textToAudio} <i class="fa fa-times englishElement" aria-hidden="true" onclick="deleteEnglishElement(${i})"></i></li>`
            }
            englishList.innerHTML=englishListElements;

        }
        
    });
};


function deleteSpanishElement(index){
        // let listElementsClass = document.getElementsByClassName('spanishElement');
        console.log(index);
        console.log(listOfSpanishText);
        listOfSpanishText.splice(index,1);
        console.log(listOfSpanishText);
        spanishListElements='';
        for (let i = 0; i < listOfSpanishText.length; i++) {
            spanishListElements += `<li class="listElement"> <span>Voz: </span> ${listOfSpanishText[i].voiceName} - <span> Texto: </span>${listOfSpanishText[i].textToAudio} <i class="fa fa-times spanishElement" aria-hidden="true" onclick="deleteSpanishElement(${i})"></i></li>`
        }
        spanishList.innerHTML=spanishListElements;
        if (listOfSpanishText.length===0) {
            sendSpanishList.style.display = 'none';
        }
}

function deleteEnglishElement(index){
        // let listElementsClass = document.getElementsByClassName('englishElement');
        console.log(index);
        console.log(listOfEnglishText);
        listOfEnglishText.splice(index,1);
        console.log(listOfEnglishText);
        englishListElements='';
        for (let i = 0; i < listOfEnglishText.length; i++) {
            englishListElements += `<li class="listElement"> <span>Voz: </span> ${listOfEnglishText[i].voiceName} - <span> Texto: </span>${listOfEnglishText[i].textToAudio} <i class="fa fa-times englishElement" aria-hidden="true" onclick="deleteEnglishElement(${i})"></i></li>`
        }
        englishList.innerHTML=englishListElements;
        if (listOfEnglishText.length===0) {
            sendEnglishList.style.display = 'none';
        }
}


function audioGeneratedList(responseData){
    let audiogeneratedList = document.getElementById('generatedAudiosList');
    audioGeneratedElements='';
    for (let i = 0; i < responseData.length; i++) {
        audioGeneratedElements += `<li class="downloadListElement"> <span>Archivo: </span> ${responseData[i].fileName}<i class="fa fa-download downloadElement" aria-hidden="true" onclick="downloadElement('${responseData[i].fileName}')" alt="Descargar"></i></li>`
    }
    audiogeneratedList.innerHTML=audioGeneratedElements

}

async function downloadElement (fileName){
    console.log(fileName);
    let fileNameObject={'fileName':fileName};
    console.log(fileNameObject);
    let tiktokPostService= new TikTokAudioRequests();
    const blob = await tiktokPostService.downloadAudio(fileNameObject);
    console.log(blob);

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

}

















// function deleteElement(){
//     let listElementsClass = document.getElementsByClassName('englishElement');
//         console.log(listElementsClass);
        
//         for (let i = 0; i < listElementsClass.length; i++) {
//             listElementsClass[i].addEventListener('click',()=>{

//                 console.log(listElementsClass);
//                 // listOfEnglishText.splice(i,1);
//                 // console.log(listOfEnglishText);
//                 // let englishListElements='';
//                 // for (let i = 0; i < listOfEnglishText.length; i++) {
//                 //     englishListElements += `<li class="listElement"> <span>Voz: </span> ${listOfEnglishText[i].voiceName} - <span> Texto: </span>${listOfEnglishText[i].textToAudio} <i class="fa fa-times englishElement" aria-hidden="true"></i></li>`
//                 //     console.log(englishListElements);
//                 // }
//                 // englishList.innerHTML=englishListElements;
//                 // console.log(englishList);


               

//             });
//             // englishCreateList();

//         }    
// }