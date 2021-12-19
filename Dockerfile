FROM node:latest

#Environment variable settings
ENV NODE_ENV="development"

#Create working directory&Configuration
WORKDIR /app

COPY . .

RUN npm install