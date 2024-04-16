import  express from 'express';
import morgan from 'morgan';
// import cors from 'cors';
import { AudioGeneratorRouter } from './routes/audioGenerator.router';


class ServerTictokttsApp{
    public app: express.Application = express()
    private PORT: number = 3000;

    constructor(){
        //Middlewares::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(morgan("dev"));
        this.app.use(express.static("public"));
        // this.app.use(cors());
               
        //CORS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        this.app.use((req,res,next)=>{
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE,PATCH');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });

        //Routes::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        this.app.use('/tiktokVoiceGeneratorApp', this.routers());
        
        //Server listening::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
        this.listen(); //se ejecuta inicialmente esta funcion y se levanta el servidor
    }

    routers(): Array<express.Router>{
        return [new AudioGeneratorRouter().router];
    }

    public listen(){
        this.app.listen(this.PORT,()=>{
            return console.log(`===========server listening on port: ${this.PORT}============`);
        });
    }




    // app.use("/tiktokVoiceGeneratorApp", routers());




}

new ServerTictokttsApp;





    // //CORS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    // app.use((req,res,next)=>{
    //     res.header('Access-Control-Allow-Origin', '*');
    //     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    //     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE,PATCH');
    //     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    //     next();
    // });