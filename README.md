
### Readme
## Disclaimer
SenderLoRa and ReceiverLoRa are not from this project.
Project cloned from original CowLocalizer.
## Introduction
Node server with Mongo database and ElasticSearch Engine, all connected with Elastic Javascript Client
It has several branches
- single node is an Elastic server with one node
- Master is an Elastic server with tree nodes
- 8 Auth is an Elastic test server version 8, not working
- 7 Auth is an Elastic server with authentication from elastic side with three nodes and the node side still to do.
## Set up 
Inside directory myapp_v3 execute
`docker-compose up `


### Original Instructions
//for node
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

//MongoDB
sudo apt install -y mongodb
npm i express express-handler express-session method-override mongoose passport passport-local bcryptjs connect-flash express-handlebars
npm install dotenv nodemon npm-check-updates -D

npm ls | grep nodemon
LORA_MONGODB_HOST=localhost
LORA_MONGODB_DATABASE=lora-app

>cd myapp_v3
>npm run dev
