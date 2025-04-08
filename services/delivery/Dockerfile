# Utilise Node.js 18
FROM node:18

# Crée un dossier app
WORKDIR /app

# Copie les fichiers
COPY package*.json ./
RUN npm install

COPY . .

# Lance le serveur
CMD ["node", "index.js"]
