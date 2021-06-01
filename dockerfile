FROM node

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG IS_DDB_LOCAL=false
ENV IS_DDB_LOCAL=${IS_DDB_LOCAL}}
ARG IS_NOT_SLS = true
ENV IS_NOT_SLS=${IS_NOT_SLS}
ARG SERVICE = graphql-api
ENV SERVICE = ${SERVICE}
ARG STAGE = dev
ENV STAGE = ${STAGE}
ARG REGION = us-east-1
ENV REGION = ${REGION}
#Credentials must be overode at buld time other wise the api will have errors
#Run with command sudo docker build -t graphql-api --build-arg AWS_ACCESS_KEY_ID=<value> --build-arg AWS_SECRET_ACCESS_KEY=<value>

ARG AWS_ACCESS_KEY_ID = default 
ENV AWS_ACCESS_KEY_ID = ${AWS_ACCESS_KEY_ID}
ARG AWS_SECRET_ACCESS_KEY = default
ENV AWS_SECRET_ACCESS_KEY = ${AWS_SECRET_ACCESS_KEY}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["node", "dist/main"]