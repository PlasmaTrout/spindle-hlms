FROM arm64v8/node 

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install -g next
RUN npm install
RUN npm run build

COPY . .

EXPOSE 3000 

CMD [ "npm", "start" ] 



