# Dockerfile
FROM node:14

WORKDIR /app

COPY . .

RUN npm install # o yarn install, dependiendo de tu gestor de paquetes

CMD ["npm", "start"] # o ["yarn", "start"] si usas yarn
