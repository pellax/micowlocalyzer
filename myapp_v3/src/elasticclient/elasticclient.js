
'use strict'
const { Client } = require('@elastic/elasticsearch')
require("dotenv").config();
module.exports.getClient = function(){
const elasticUrl = process.env.ELASTIC_URL || "https://localhost:9200"
const client = new Client({ node: elasticUrl,auth:{username: 'elastic',password:'4MJ51qCmBFdC1exQRzjO'
}
});
return client
}
