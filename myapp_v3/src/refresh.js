const ElasticClient = require("./elasticclient/elasticclient")

const refresh =async() => {
Client = ElasticClient.getClient()
const resulthello = await searchHelloLostPackets(Client).catch(e => {
	console.log(e)
})
const resultData = await searchDataLostPackets(Client).catch(e => {
	console.log(e)
})

for(let i of resultData.aggregations.localaddress.buckets){
	console.log(i)
	await updateDataLostPackets(Client,i)
	await updateHelloLostPackets(Client,i)

}

}
const updateDataLostPackets = async(Client,obj) => {
	try {
	const update = await Client.updateByQuery({
	index: 'datalostpackets',
	refresh: true,
	
	 body:{
		script: {

			lang: 'painless',

			source: 'ctx.op="index";ctx._source.theoreticalrecpackets=params.recpackets;',
			params:{
				recpackets:obj['doc_count']
			}
		}
	}
	,
	query: {
		bool: {
			must: [{ match: { localaddress: obj['key'].toString() } }]
		},
		//if_seq_no:parseInt(myquerydata.hits.hits['_seq_no']),
		
	}

	,
	sort: 
		{ timestamp :'desc',ignore_unmpapped:true}
	
	  ,
	 max_docs:3 ,
	 version:false
	  
	


})
console.log(update)

return update
	}catch(error){
		console.log(error)
	}
}

const updateHelloLostPackets = async(Client,obj) => {
	try{
	
	const update = await Client.updateByQuery({
	index: 'hellolostpackets',
	refresh:true,
	body:{

		script: {

			lang: 'painless',

			source: 'ctx.op="index";ctx._source.theoreticalrecpackets=params.recpackets;',
			params:{
				recpackets:obj['doc_count']
			}
		}
	}
	,
	query: {
		bool: {
			must: [{ match: { localaddress: obj['key'].toString() } }]
		},
		//if_seq_no:parseInt(myqueryhello.hits.hits['_seq_no']),
		
	}

	,
	sort:
		{ timestamp :'desc',ignore_unmpapped:true}
	
	  ,
	  version:false,

	max_docs: 3


})

console.log(update)

return update
}catch(error){
	console.log(error)
}
}

const searchHelloLostPackets = async(Client) => {
	try{
	const update = await Client.search({
	index: 'hellolostpackets',
	
	body:{

		
	
		
		aggs: {
			localaddress: {
			  terms: { field: 'localaddress' }
			}
		  }
		  
	
		

	}
	


})

console.log(update)
return update
}catch(error){
	console.log(error)
}
}

const searchDataLostPackets = async(Client) => {
	try{
	const update = await Client.search({
	index: 'datalostpackets',
	
	body:{
		
	
		
		aggs: {
			localaddress: {
			  terms: { field: 'localaddress' }
			}
		  }
	}
	
	

})

console.log(update)
return update
}catch(error){
	console.log(error)
}
}

const interval = setInterval(refresh,15000);
module.exports = interval;







