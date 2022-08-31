
### Readme
## Disclaimer
Stable version is in branch cronversion. An automatic setup is implemented but you should check first that the automatic setup has been successful. This may vary depending on the features of your server. Look carefully the troubleshooting section.

## Introduction
Node server with Mongo database and ElasticSearch Engine, all connected with Elastic Javascript Client
It has several branches
- single node is an Elastic server with node with one elastic node.
- Master is an Elastic server with three elastic nodes
- 8 Auth is an Elastic test server version 8, not working
- Elastic7Auth is an Elastic server with authentication from elastic side with three Elastic nodes and the node side still to do.
- Cronversion is an Elastic server 7.17 but with automatic setup
## Troubleshooting for the cronversion branch
The automatic setup is supposed to work at any kind of server with docker-compose installed. Nevertheless, depending on server memory and cpu features, the elastic server might not be ready when the automatic setup requests are executed. In that case you should see some kind of error like ECONNREFUSED which means that the server is receiving requests at some point when the server is still not ready to work. In that case you should go to the file called index.js located in the directory 
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
