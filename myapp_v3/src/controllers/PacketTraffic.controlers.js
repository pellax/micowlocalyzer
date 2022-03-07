const PacketTrafficCtrl = {};
const ElasticClientCtrl = {};
const PacketTraffic = require("../models/PacketTraffic")
const ElasticClient = require("../elasticclient/elasticclient")
//const { Client } = require('@elastic/elasticsearch')
//require("dotenv").config();
//const elasticUrl = "http://localhost:9200")
PacketTrafficCtrl.sendPacketTraffic= async (req,res)=>{
    
	const{rp,sp,rhp,shp,dpm,brd,fwd,pme,dst,nfm,ivi,ladd} = req.body;
    
	let totalreceived = parseInt(rhp) + parseInt(rp) + parseInt(dpm) + parseInt(brd) + parseInt(ivi);
   
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

    
	const PacketTrafficPos = new PacketTraffic({recpackets,sendpackets,rechellopackets,sendhellopackets,datapackme,broadcast,fwdpackets,packetsforme,dstinyunreach,notforme,iamvia,localaddress,totalreceived});
   console.log("total received :"+totalreceived);
   console.log("iamvia content "+ivi);
	const Client = ElasticClient.getClient();
	
	await Client.index({
    index: 'monitorization2',
    // type: '_doc', // uncomment this line if you are using {es} ≤ 6
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
      localaddress:ladd,
      totalreceived:totalreceived

    }
  }).then(function(value){console.log(value)}).catch(function(e){
  console.log(e)})
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


