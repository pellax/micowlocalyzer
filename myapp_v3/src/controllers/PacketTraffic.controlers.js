const PacketTrafficCtrl = {};
const ElasticClientCtrl = {};
const PacketTraffic = require("../models/PacketTraffic")
const ElasticClient = require("../elasticclient/elasticclient")
PacketTrafficCtrl.sendPacketTraffic= async (req,res)=>{
    
	const{rp,sp,rhp,shp,dpm,brd,fwd,pme,dst,nfm,ivi,ladd} = req.body;
    
	let totalreceived = parseInt(rhp) + parseInt(dpm) + parseInt(brd) + parseInt(ivi) + parseInt(nfm) ;
   
	const recpackets = rp;
    
	const sendpackets = sp;
	const rechellopackets = rhp;
	const sendhellopackets = shp;
	const datapackme = dpm;
	const broadcast = brd;
	const fwdpackets = fwd;
	const packetsforme = pme;
	const dstinyunreach = dst;
	const notforme = nfm;
	const iamvia = ivi ;
	const localaddress = ladd;
        let  senddatapackets = parseInt(sp)-parseInt(shp);
    
	const PacketTrafficPos = new PacketTraffic({recpackets,sendpackets,rechellopackets,sendhellopackets,datapackme,broadcast,fwdpackets,packetsforme,dstinyunreach,notforme,iamvia,localaddress,totalreceived});
	//DEBUG
	//console.log("total received :"+totalreceived);
	//DEBUG
	//console.log("iamvia content "+ivi);
	//DEBUG
	//console.log("local address is "+ladd);
	const Client = ElasticClient.getClient();
        const today = new Date();	
	await Client.index({
    index: 'monitorization3',
    body: {
      recpackets: rp,
      sendpackets: sp,
      rechellopackets:rhp,
      sendhellopackets:shp,
      datapackme:dpm,
      broadcast:brd,
      fwdpackets:fwd,
      packetsforme:pme,
      dstinyunreach:dst,
      notforme:nfm,
      iamvia: ivi,
      localaddress:ladd.toString('utf-8'),
      totalreceived:totalreceived,
      senddatapackets:senddatapackets,	    
      timestamp:today

    }
  }).then(function(value){
		// DEBUG
		//console.log(value)
  }).catch(function(e){
  console.log(e)})
	const { body } = await client.search({
  index: 'datalostpackets',
  body: {
    query: {
      
    },
    aggs:{
        unique_ids: {
            terms: {
                field: localaddress
            }
        }
    }
  }
})
	await Client.index({
    index: 'datalostpackets',
    body: {
      localaddress:ladd.toString('utf-8'),
      lostpackets:0,
      recpackets: rp,
      sentdatapackets:senddatapackets,
      theoreticalrecpackets:0,
      timestamp:today
    }
  }).then(function(value){
		// DEBUG
		//console.log(value)
  }).catch(function(e){
  console.log(e)})
	await Client.index({
    index: 'hellolostpackets',
    body: {
      localaddress:ladd.toString('utf-8'),
      losthpackets:0,
      rechpackets: rhp,
      senthellopackets:shp,
      theoreticalrecpackets:0,
      timestamp:today
    }
  }).then(function(value){
		// DEBUG
		//console.log(value)
  }).catch(function(e){
  console.log(e)})
	await Client.indices.refresh({ index: 'monitorization3' })
	await PacketTrafficPos.save().then(function(value){ 
	   res.status(200).json({msg:"postoki"})
	    }).catch(function(e){
  res.status(401).send("error saving info"+e) })
  
};
ElasticClientCtrl.run = async(req,res)=>{
    const{address,metric,lastSeqNo,timeout,via,position} = req.body;



    res.status(200).json({msg:"postoki"})
};
//gpsCtrl.getgps = async(req, res) =>{
  //  const gps = await Gps.find();
    //res.send(JSON.stringify(gps));
    // return res.status(200).json({
    //     data: gps
    // });
//}
module.exports = PacketTrafficCtrl;


