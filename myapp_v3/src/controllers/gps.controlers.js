const gpsCtrl = {};

const Gps = require("../models/Gps")

gpsCtrl.sendgps = async (req,res) => {
    const{id, lat, lon} = req.body;

    const newLoc = new Gps({id,lat,lon});
    await newLoc.save();
    res.send('recibido');
    
};

gpsCtrl.getgps = async(req, res) =>{
    const gps = await Gps.find();
    res.send(JSON.stringify(gps));
    // return res.status(200).json({
    //     data: gps
    // });
}

module.exports = gpsCtrl;
