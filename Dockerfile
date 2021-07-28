FROM node:10.13

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

## Install package dependencies
RUN apt-get update

# Bundle app source
COPY . /usr/src/app

CMD ["npm", "start"]
