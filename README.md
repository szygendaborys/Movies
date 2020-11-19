# The Movies App!
---
### API Documentation

Is available on the github master repository in the path `/movies/docs/api`.
[API Documentation can be found here](https://github.com/szygendaborys/Movies/tree/master/docs/api)

### Installation / Development

Movies App requires [Node.js](https://nodejs.org/) to run.

Clone this repository to your local folder.

```
$ git clone https://github.com/szygendaborys/Movies
```

Move to `/movies/backend` folder and install the dependencies and devDependencies and start the server.
You don't need to worry about the .env file. I provided it for you. (in the real life scenario this should be added to the .gitignore config)
```sh
$ cd movies/backend
$ npm install
$ npm start
```

#### Typescript compilation / running .js files

Typescript compilation could be simply achieved by typing
```node
$ npm run tsc
```

By default `npm start` is designed to run a ts-node-dev server, which uses and dynamically compiles *.ts files. It is also watching for any changes to *.ts files (provides hot reloading of the server after file save).

If you want to run a compiled .js server type
```
$ npm run start-js
```

Don't forget to compile your project first. :)
#### Docker
Movies app is very easy to install and deploy in a Docker container.
By default, the Docker will expose server to port 8001.

```sh
$ cd movies/backend
$ docker build -t moviesapp:latest .
```
This will create the moviesapp image and pull in the necessary dependencies. 

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 8001 of the host to port 8001 of the Docker.

```sh
$ docker run --name moviesapp -p 8001:8001 --restart="always" moviesapp:latest
```

In order to stop the running docker image just write
```sh
$ docker stop moviesapp
```

### Accessing the server

Verify the deployment by navigating to your server address in your preferred browser.

```sh
> http://127.0.0.1:8001
```
or
```sh
> http://localhost:8001
```

> Example GET requests:
```sh
> http://localhost:8001/api/comments/vote
> http://localhost:8001/api/movies
> http://127.0.0.1:8001/api/comments
```
### Tests

In order to run tests attached to this project run:
```node
$ npm run test
```

### Tech

Movies app uses a number of open source projects to work properly:

* Node.js
* Typescript
* Express.js
* Docker
* Mongoose / Typegoose
* Docker
* Mocha / Chai / Sinon




