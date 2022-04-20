
### Readme
## Disclaimer
SenderLoRa and ReceiverLoRa are not from this project.
Project cloned from original CowLocalizer.
## Introduction
Node server with Mongo database and ElasticSearch Engine, all connected with Elastic Javascript Client
It has several branches
- single node is an Elastic server with node with one elastic node.
- Master is an Elastic server with three elastic nodes
- 8 Auth is an Elastic test server version 8, not working
- Elastic7Auth is an Elastic server with authentication from elastic side with three Elastic nodes and the node side still to do.
## Set up 
1. First increase virtual memory heap, execute `sysctl -w vm.max_map_count=262144` in linux.
2. Inside directory myapp_v3 execute
`docker-compose up `
3. Wait for the log message `Kibana is now degraded` . The server is now ready for the incoming data.


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
