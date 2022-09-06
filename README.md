# Readme 
There was a first attempt to have the calculus of the theoretical packets that should be arriving to each node to have the exact value of the lost packets.
I tried to do it via several updates each time a data arrived to the server so I tried to develop some painless script. But there was an important issue of concurrency with the multiple updates at the same time that made this approach absolutely impossible to carry out due to the concurrency control implemented in Elastic called optimistic concurrency control which is better explained in [this](https://www.elastic.co/guide/en/elasticsearch/reference/current/optimistic-concurrency-control.html)link . A quick overwiew would be that elastic is not expecting to have many nodes executing updates at the same time so all alike approaches to do this will fail . It uses a version control and the version between a read operation and an update instruction must match to succeed. If there is any operation in between the version will change, and the update will fail and a rollback will take place. We recommend strongly do not have multiple nodes performing updates at the same time to do any kind of task. It's better to set up an interval and having only one process executing one update just in case rather than multiple nodes implying read write operations.
## Second problem
After some time I realized that what I was trying to reach only would have sense if there was only one network where every node were one hop of distance from the remaining node. So all the routing tables looked the same. If you want to have the theoretical packets then you should know which nodes belong to every subnetwork. 
# Original instructions
Do not use these instructions, only inherited doc from the previous cowlocalizer project. 
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
