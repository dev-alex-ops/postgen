FROM node:18-alpine

WORKDIR /app

COPY ["package.json", "tsconfig.json", "tsconfig.build.json", "./"]
RUN npm install --ignore-scripts

COPY ./src ./src

CMD ["npm","run","start:dev"]
