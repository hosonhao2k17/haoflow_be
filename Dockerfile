FROM node:24 as builder 

WORKDIR /app 

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 


FROM node:24 as runner 

WORKDIR /app 

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/dist ./dist  

USER node 

EXPOSE 4000 

CMD ["node","dist/main.js"]