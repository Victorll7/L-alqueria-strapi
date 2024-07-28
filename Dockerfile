# Dockerfile
FROM node:20

WORKDIR /app

COPY . .

RUN yarn install # o npm install, dependiendo de tu gestor de paquetes

CMD ["yarn", "start"] # o ["npm", "start"] si usas npm
