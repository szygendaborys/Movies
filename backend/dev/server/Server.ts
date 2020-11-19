import App from './App';
import CommentsController from './controllers/CommentsController';
import MoviesController from './controllers/MoviesController';

require('dotenv').config();

const port = process.env.PORT || '8001';
const host = '0.0.0.0';
let application: App;

export function startRestServer() {
    application = new App([
        new MoviesController(),
        new CommentsController()
    ]);
    application.initDb(function () {
        //@ts-ignore expect this error to be happening
        application.app.listen(port, '0.0.0.0');
        console.log(`Server is listening on port ${port}`);
    }).catch(err => {
        console.log(err);
    });
}