FROM node

RUN npm install --global react-scripts
# Install backend depdencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Install frontend dependencies
WORKDIR /usr/src/app/frontend
COPY frontend/package*.json ./
RUN npm install

WORKDIR /usr/src/app
COPY . .

RUN npm run build-frontend

EXPOSE 8080

CMD npm run start