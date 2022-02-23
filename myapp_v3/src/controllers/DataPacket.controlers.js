const DataPacketCtrl = {};

const DataPacket = require("../models/DataPacket")

DataPacketCtrl.sendDataPacket = async (req,res) => {
    const mijson = req.body;

    const newDataPack = new DataPacket(mijson);
    await newDataPack.save();
    res.send('recibido');
    
};

//gpsCtrl.getgps = async(req, res) =>{
 // const gps = await Gps.find();
  //  res.send(JSON.stringify(gps));
    // return res.status(200).json({
    //     data: gps
    // });
//}

module.exports = DataPacketCtrl;
