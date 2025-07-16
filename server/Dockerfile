# use node.js base image
FROM node:18

# app dir
WORKDIR /app

# install dependencies
COPY package.json ./
RUN npm install

# copy all code
COPY . .

# port
EXPOSE 5001

# run server
CMD ["npm", "start"]