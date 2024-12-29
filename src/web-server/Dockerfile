FROM node:22

COPY . /usr/source

WORKDIR /usr/source

# install npm dependencies
RUN npm install

ENV NODE_ENV=production

ENTRYPOINT ["npm", "start"]
