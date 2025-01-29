FROM node:22

COPY ./web-server /usr/source
COPY ./react-client /usr/react

WORKDIR /usr/react

# set dev mode to false
RUN echo "export const isDevMode = false;" > ./src/Constants/devMode.js

# install npm dependencies
RUN npm install

# build react app
RUN npm run build

# copy build files to web-server's public directory
RUN cp -r build/* /usr/source/public

WORKDIR /usr/source

# install npm dependencies
RUN npm install

ENV NODE_ENV=production

ENTRYPOINT ["npm", "start"]
