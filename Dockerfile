FROM node:20-alpine

RUN mkdir /app
 
WORKDIR /app
 
COPY package.json package.json
# COPY package-lock.json package-lock.json
 
COPY . /app

RUN npm install

# RUN npx prisma generate
# RUN npm run seed
 
CMD [ "node", "src/app.js" ]