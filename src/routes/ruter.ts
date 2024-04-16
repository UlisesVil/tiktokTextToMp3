import { Router } from "express";

export class BaseRouter<T>{  // T representa un controlador <T, U> T=controlador y U=Middleware
    public router: Router;
    public controller: T //Es del tipo T por que sera el controlador de la ruta que va a extender despues

    constructor(TController: {new ():T}){  //TController: {new ():T} es un tipo que tiene un tipado generico
        this.router = Router();
        this.controller = new TController() //a this.controller se le aplica el tipado generico pero aun this.controller esta vacio
        this.routes();
    }

    //Se declara y ejecuta esta funcion en BaseRoutes pero como AudioGeneratorRouter se extiende a BaseRouter
    //entonces se utiliza la funcion routes() en AudioGeneratorRouter y por eso se deja en blanco aqui
    routes(){}

}