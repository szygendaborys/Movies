
import * as express from "express";
import Movie from "../../dataModel/test/movies/Movie";
import OmdbHandler from "../businessLayer/omdb/OmdbHandler";
import Controller from "../interfaces/controller.interface";

export default class MoviesController implements Controller {
    public path: string = '/movies';
    public router = express.Router();

    private _omdbHandler:OmdbHandler = new OmdbHandler();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.path, this.getMovies);
        this.router.post(this.path, this.postMovie);
    }

    private getMovies = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const exampleData = [{
                id:'adwd'
            }, {
                id:'secondmovieid'
            }];


            res.status(200).json({
                movies: exampleData
            })
        } catch (err) {
            if(!err.statusCode) 
                err.statusCode = 500;
            next(err);
        }
    };

    private postMovie = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const movies:Movie[] = await this._omdbHandler.fetchMovies(req.body);            

            res.status(200).json({
                moviesAdded: movies
            })
        } catch (err) {
            if(!err.statusCode) 
                err.statusCode = 500;
            next(err);
        }
    };
    
}
