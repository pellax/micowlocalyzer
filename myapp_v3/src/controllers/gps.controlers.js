const gpsCtrl = {};

const Gps = require("../models/Gps")

gpsCtrl.sendgps = async (req,res) => {
    const{id, lat, lon} = req.body;

    const newLoc = new Gps({id,lat,lon});
    await newLoc.save();
    res.send('recibido');
    
};

module.exports = gpsCtrl;
