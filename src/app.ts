import {app, BrowserWindow, ipcMain} from 'electron';
import { AudioGeneratorRouter } from './routes/audioGenerator.router';
import express from 'express';
import morgan from 'morgan';
import path from 'node:path';
import url from 'url';
const ipc= ipcMain;

////Electron APP :::::::::::::::::::::::::::::::
// let mainWindow:BrowserWindow;
// function createWindow():void{
//     mainWindow = new BrowserWindow({
//         width: 1200, 
//         height: 680,
//         minWidth: 940,
//         minHeight: 560,
//         frame: false, //to hide the standard title bar
//         webPreferences:{
//             nodeIntegration: true,
//             contextIsolation: false,
//             devTools: true,
//             preload: path.join(__dirname, '../preload.js'),
//             // webSecurity: false
//         },
//     });
//     mainWindow.loadURL(url.format({
//         pathname: path.join(__dirname, '../public/index.html'),
//         protocol: 'file',
//         slashes: true
//     }))
//     //MINIMIZE APP
//     ipc.on('minimizeApp', ()=>{
//         mainWindow.minimize();
//     })
//     //MAXIMIZE RESTORE APP
//     ipc.on('maximizeRestoreApp', ()=>{
//         if(mainWindow.isMaximized()){
//             mainWindow.restore();
//         }else{
//             mainWindow.maximize();
//         }
//     })
//     //Check if is maximized
//     mainWindow.on('maximize',()=>{
//         mainWindow.webContents.send("isMaximized")
//     })
//     //Check if is restored
//     mainWindow.on('unmaximize',()=>{
//         mainWindow.webContents.send("isRestored")
//     })
//     //CLOSE APP
//     ipc.on('closeApp', ()=>{
//         mainWindow.close();
//     })
// }
// app.whenReady().then(() => {
//     createWindow()
//     app.on('activate', () => {
//       if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow()
//       }
//     })
// })
// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit()
//     }
// })


class ServerTictokttsApp{
    public appExpress: express.Application = express()
    private PORT: number = 1234;

    constructor(){
        //Middlewares::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        this.appExpress.use(express.json());
        this.appExpress.use(express.urlencoded({extended:false}));
        this.appExpress.use(morgan("dev"));
        this.appExpress.use(express.static("public"));
        //CORS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        this.appExpress.use((req,res,next)=>{
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE,PATCH');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        //Routes::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        this.appExpress.use('/tiktokVoiceGeneratorApp', this.routers());
        //Server listening::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        this.listen(); //se ejecuta inicialmente esta funcion y se levanta el servidor
    }
    routers(): Array<express.Router>{
        return [new AudioGeneratorRouter().router];
    }
    public listen(){
        this.appExpress.listen(this.PORT,()=>{
            return console.log(`===========server listening on port: ${this.PORT}============`);
        });
    }
}

new ServerTictokttsApp;
