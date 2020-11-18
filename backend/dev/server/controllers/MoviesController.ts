
import * as express from "express";
import Movie from "../../dataModel/movies/Movie";
import OmdbHandler from "../businessLayer/omdb/OmdbHandler";
import Controller from "../interfaces/controller.interface";
import MovieRepository from "../repositories/MovieRepository";

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

    public getMovies = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const moviesDTO:Movie[] = await MovieRepository.findMovies();

            res.status(200).json({
                movies: moviesDTO
            })
        } catch (err) {
            next(err);
        }
    };

    public postMovie = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const movies = await this._omdbHandler.fetchMovies(req.body);
            
            await MovieRepository.insertMovies(movies);

            res.status(201).json({
                moviesAdded: movies
            }).end();
        } catch (err) {
            next(err);
        }
    };
    
}
