import Database from "./db/Database";
import Controller from "./interfaces/controller.interface";
import * as express from 'express';
import csurf = require('csurf');

export default class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = require('express')();
        this.setMiddleware();
        this.initControllers(controllers);
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

        this.app.use((req: any, res: any, next: any) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });

    }

    public async initDb(startServer: Function): Promise<void> {
        return new Database().connectToDb(startServer)
            .then((result: any) => {
                console.log('Mongo connected!');
            })
            .catch((err: any) => {
                console.log(startServer);
                console.log(err);
                console.log('Cannot connect to Mongo!');
            })
    }
}

