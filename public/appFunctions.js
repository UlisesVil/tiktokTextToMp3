import { ipcRenderer } from 'electron';
const maxResBtn = document.getElementById('maxResBtn');
const mySideBar = document.getElementById('mySideBar');
const ipc = ipcRenderer;
var isLeftMenuActive = true;

//MINIMIZE APP
minimizeBtn.addEventListener('click',()=>{
    ipc.send('minimizeApp')
})

//MAXIMIZE RESTORE APP
function changeMaxResBtn(isMaximizedApp){
    if(isMaximizedApp){
        maxResBtn.title = 'Restore';
        maxResBtn.innerHTML=`<i class="fa fa-window-restore" aria-hidden="true"></i>`
    }else{
        maxResBtn.title = 'Maximize';
        maxResBtn.innerHTML=`<i class="fa fa-window-maximize" aria-hidden="true"></i>`
    }
}
maxResBtn.addEventListener('click',()=>{
    ipc.send('maximizeRestoreApp')
})
ipc.on('isMaximized', ()=>{
    changeMaxResBtn(true)
})
ipc.on('isRestored', ()=>{
    changeMaxResBtn(false)
})

//CLOSE APP
closeBtn.addEventListener('click',()=>{
    ipc.send('closeApp')
})

//TOGGLE MENU
//Expand and retract
showHideMenus.addEventListener('click',()=>{
    if(isLeftMenuActive){
        mySideBar.style.width = "50%";
        isLeftMenuActive = false;
    }else{
        mySideBar.style.width = "0px";
        isLeftMenuActive = true;
    }
})