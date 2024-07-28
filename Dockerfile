# Usa una imagen base con Node.js 18
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY . .

# Instala las dependencias
RUN yarn install --frozen-lockfile

# Otros comandos de construcción si es necesario

# Comando para iniciar la aplicación
CMD ["yarn", "start"]
