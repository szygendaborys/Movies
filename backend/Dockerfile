FROM node:12.13.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

ADD . /usr/src/app
RUN npm run tsc

COPY . .

EXPOSE 8001

ENV NODE_ENV=production
ENV MONGO_PROD_KEY=mongodb+srv://borys:borysAdm@cluster0.fcacj.mongodb.net/moviesDB?retryWrites=true&w=majority
ENV PORT=8001

CMD ["node", "build/server/index.js"]