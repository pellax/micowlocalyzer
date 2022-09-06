# Readme
When I started working with elastic, a new version came out, but I was unable to have it working properly. It has more features and could be interesting some time in the future to upgrade the current version to the 8th version.
# Original instructions
Instructions inherited from the previous project, they are not useful anymore since everything is already containerized .
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
