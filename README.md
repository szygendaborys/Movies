# The Movies App!
---
### API Documentation

Is available on the github master repository in the path `/movies/docs/api`.
[API Documentation can be found here](https://github.com/szygendaborys/Movies/tree/master/docs/api)

### Installation / Development

Movies App requires [Node.js](https://nodejs.org/) to run.

Clone this repository to your local folder. TODO:

```
$ git clone ...
```

Move to `/backend` folder and install the dependencies and devDependencies and start the server.

```sh
$ cd movies/backend
$ npm install
$ npm start
```

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
$ docker run -p 8001:8001 --restart="always" moviesapp:latest
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:8001 TODO: CHECK
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




