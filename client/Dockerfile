# build
FROM node:18 AS build
WORKDIR /app

# install dependencies
COPY package*.json ./

# copy code
COPY . .

# build static files
RUN npm run build

# Nginx server
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]