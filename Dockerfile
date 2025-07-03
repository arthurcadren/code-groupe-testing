FROM node:18

WORKDIR /app
COPY package*.json ./
RUN npm install

# Installer nodemon globalement
RUN npm install -g nodemon

COPY . .

CMD ["npm", "run", "dev"]