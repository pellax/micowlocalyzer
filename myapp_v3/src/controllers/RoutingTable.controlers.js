const RoutingTableCtrl = {};
const RoutingTable = require("../models/RoutingTable")
//const ElasticClient = require("../elasticclient/elasticclient")
//const { Client } = require('@elastic/elasticsearch')
//require("dotenv").config();
//const elasticUrl = "http://localhost:9200")
RoutingTableCtrl.sendRoutingTable = async (req,res) => {
    const{address,metric,lastSeqNo,timeout,via,position} = req.body;
    const RoutingTablePos = new RoutingTable({address,metric,lastSeqNo,timeout,via,position});
   await RoutingTablePos.save().then(function(value){ 
	   res.status(200).json({msg:"postoki"})}).catch(function(e){
  res.status(401).send("error saving info") })
  
};

//gpsCtrl.getgps = async(req, res) =>{
  //  const gps = await Gps.find();
    //res.send(JSON.stringify(gps));
    // return res.status(200).json({
    //     data: gps
    // });
//}
module.exports = RoutingTableCtrl;
