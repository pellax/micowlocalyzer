# Readme
First attempt of a securized Elastic server. The docker-compose.yml file can be used as an inspiration of a full equiped securized version of a containerized elastic server. Nevertheless, one additional step is needed to get the whole system working. The sending data process to the elastic server must be securized as well, the elastic node client instantiation should change as well probably. Branch still not working. Do not use in production .
//Para node
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
