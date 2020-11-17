
import * as express from "express";
import Controller from "../interfaces/controller.interface";

export default class MoviesController implements Controller {
    public path: string = '/movies';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        // routes here
    }
    
}
