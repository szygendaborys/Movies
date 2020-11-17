import App from './App';
import CommentsController from './controllers/CommentsController';
import MoviesController from './controllers/MoviesController';

require('dotenv').config();

const port = process.env.BACKEND_PORT || '8000';
let application: App;

export function startRestServer() {
    application = new App([
        new MoviesController(),
        new CommentsController()
        // Place other controllers here...
    ]);
    application.initDb(function () {
        application.app.listen(port);
        console.log(`Server is listening on port ${port}`);
    }).catch(err => {
        console.log(err);
    });
}