import Database from "./db/Database";
import Controller from "./interfaces/controller.interface";
import * as express from 'express';
import csurf = require('csurf');

export default class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = require('express')();

        this.initHerokuMiddleware();
        this.setMiddleware();
        this.initControllers(controllers);
        this.initErrorMiddleware();
    }

    private initControllers(controllers: Controller[]): void {
        for(const controller of controllers) {
            this.app.use('/api', controller.router);
        }
    }

    private setMiddleware(): void {
        let bodyParser = require('body-parser');
        
        csurf({cookie: true});

        this.app.use(bodyParser.urlencoded({
            limit: '5mb',
            extended: true
        }));
        
        this.app.use(bodyParser.json({limit:'5mb'}));
        this.app.use(bodyParser.text({limit:'5mb'}));

        this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });

    }

    private initErrorMiddleware(): void {
        this.app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
            if(!error.message)
                error.message = 'Error: An undefined error has occurred.';
            res.status(400).json({error: error.message});
        });
    }

    public async initDb(startServer: Function): Promise<void> {
        return new Database().connectToDb(startServer)
            .then(() => {
                console.log('Mongo connected!');
            })
            .catch((err: any) => {
                console.log(startServer);
                console.log(err);
                console.log('Cannot connect to Mongo!');
            })
    }

    private initHerokuMiddleware(): void {
        // FOR HEROKU DEPLOYMENT ONLY
        this.app.get('*',(req: express.Request, res: express.Response, next: express.NextFunction) => {
            if(req.originalUrl === '/' || req.originalUrl === '/favicon.ico')
                res.status(200).json({msg:'ok'});
            else next();        
        });
    }
}

