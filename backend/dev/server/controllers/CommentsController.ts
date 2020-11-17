
import * as express from "express";
import Controller from "../interfaces/controller.interface";

export default class CommentsController implements Controller {
    public path: string = '/comments';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.path, this.testRoute);
    }
    
    private testRoute = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            res.status(200).json({
                message: 'All great!'
            })
        } catch (err) {
            if(!err.statusCode) 
                err.statusCode = 500;
            next(err);
        }
    };
}
