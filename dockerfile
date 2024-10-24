# Usando a imagem base do Node.js
FROM node:18-alpine

# Definindo o diretório de trabalho
WORKDIR /usr/src/app

# Copiando package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instalando as dependências
RUN npm install --production

# Copiando o restante do código da aplicação
COPY . .

# Compilando a aplicação (caso você use TypeScript)
RUN npm run build

# Expondo a porta que sua aplicação usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
