const ElasticClient = require("./elasticclient/elasticclient")

const createTables = async() => {

    await createMonitorization().catch(e => console.log(e))
}


const createMonitorization = async() => {
    client.create({
        id: '1',
        index: 'monitorization3',
        wait_for_active_shards: '1',
        refresh: 'true',
        body:{
            mappings : {
                properties : {
                  broadcast : {
                    type : 'integer'
                  },
                  datapackme : {
                    type : 'integer'
                  },
                  dstinyunreach : {
                    type : 'integer'
                  },
                  fwdpackets : {
                    type : 'integer'
                  },
                  iamvia : {
                    type : 'integer'
                  },
                 localaddress : {
                    type: 'keyword',
                  fields: {
                    keyword: { 
                      type: 'keyword'
                    }
                  }
                     
                   },
                  notforme : {
                    type : 'integer'
                  },
                  packetsforme : {
                    type : 'integer'
                  },
                  rechellopackets : {
                    type : 'integer'
                  },
                  recpackets : {
                    type : 'integer'
                  },
                  senddatapackets : {
                    type : 'integer'
                  },
                  sendhellopackets : {
                    type : 'integer'
                  },
                  "sendpackets" : {
                    "type" : "integer"
                  },
                  "timestamp": {
                  "type":   "date",
                  "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis||yyyy-MM-dd'T'HH:mm:ss.SSSZ"
                },
                  "totalreceived" : {
                    "type" : "integer"
                  }
                }
              }
        }
      })
}