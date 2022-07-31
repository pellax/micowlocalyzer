const ElastiClient = require("../elasticclient/elasticclient")
const client = ElastiClient.getClient();

const createTables =async() => {
    const existdata = await existData().then((exist) =>
	    {
	    if(!exist)
	    {
		   createDataLostPackets().catch(e => console.log(e))
	    }
	    }
	    ).catch(e => console.log(e))
    const existmonitorization =await existMonitorization().then((exist) => {
	    if(!exist) {
		    createMonitorization().catch(e => console.log(e))
	    }
    }
    ).catch(e => console.log(e))
    const existhello = await existHello().then((exist) => 
	    {
	    if(!exist)
	    {
		    createHelloLostPackets().catch(e => console.log(e))
	    }
	    }
    ).catch( e => console.log(e))
   
}


const createMonitorization = async() => {
  try{ 

  const create = await client.create({
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
                  queuesendsize : {
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
                  sendpackets : {
                    type : 'integer'
                  },
                  
                  timestamp: {
                  type:   'date',
                  format: 'yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis||yyyy-MM-dd"T"HH:mm:ss.SSSZ'
                },
                  totalreceived : {
                    type : 'integer'
                  }
                }
              }
        }
      })
      console.log(create)
	  return create
    }catch(error){
      console.log(error)
    }
}


const createDataLostPackets = async() => {
  try{

 const create = await client.create({
      id: '2',
      index: 'datalostpackets',
      wait_for_active_shards: '1',
      refresh: 'true',
      body:{
        mappings : {
          properties : {
             localaddress : {
              type: 'keyword',
            fields: {
              keyword: { 
                type: 'keyword'
              }
            }
               
             },
              
              recpackets : {
              type : 'integer'
            },
            
            sentdatapackets : {
              type : 'integer'
            },
           boardsinnet:{
             type:'integer'
           },
           theoreticalrecpackets : {
            type : 'integer'
          },
          
            timestamp: {
            type:   'date',
            format: 'yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis||yyyy-MM-dd"T"HH:mm:ss.SSSZ'
          }
            }
          }
      }
    })
    console.log(create);
  }catch(error){
    console.log(error)
  }
}

const createHelloLostPackets = async() => {
  try{
  const create = await client.create({
      id: '3',
      index: 'hellolostpackets',
      wait_for_active_shards: '1',
      refresh: 'true',
      body:{
        mappings : {
          properties : {
             localaddress : {
              type: 'keyword',
            fields: {
              keyword: { 
                type: 'keyword'
              }
            }
               
             },
             
              rechpackets : {
              type : 'integer'
            },
            
            senthellopackets : {
              type : 'integer'
            },
            boardsinnet:{
             type:'integer'
           },
           theoreticalrecpackets : {
            type : 'integer'
          },
          
            timestamp: {
            type:   'date',
            format: 'yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis||yyyy-MM-dd"T"HH:mm:ss.SSSZ'
          }
            }
          }
      }
    })
    console.log(create)
  }catch(error){
    console.log(error)
  }
}

const deleteMonitorization = async() => {
 const deletemonitorization = await client.delete({
    index: 'monitorization3',
    wait_for_active_shards:1,
    refresh:'true',

  })
  console.log(deletemonitorization)
}

const deleteHelloLostPackets = async() => {
  const deleteHello = await client.delete({
    index: 'hellolostpackets',
    wait_for_active_shards:1,
    refresh:'true',
    
  })
  console.log(deleteHello)
}

const deleteDataLostPackets = async() => {
  const deletedata = await client.delete({
    index: 'datalostpackets',
    wait_for_active_shards:1,
    refresh:'true',
    
  })
  console.log(deletedata)
}

const existMonitorization = async() => {
  try {
  const body = await client.exists({
    index: 'monitorization3',
    id: 1
  })
  return body 
}catch(error){
  console.log(error)
}
}

const existHello = async() => {
  try {
  const body = await client.exists({
    index: 'hellolostpackets',
    id: 3
  })
  return body 
}catch(error){
  console.log(error)
}
}

const existData = async() => {
  try {
  const body = await client.exists({
    index: 'datalostpackets',
    id: 2
  })
  return body 
}catch(error){
  console.log(error)
}
}


module.exports = createTables

