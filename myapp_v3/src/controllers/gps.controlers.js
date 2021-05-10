const gpsCtrl = {};

const Gps = require("../models/Gps")

gpsCtrl.sendgps = async (req,res) => {
    try{
        console.log(req.body);
        const gps = await Gps.create(req.body);
        
        return res.status(201).json({
            success: true,
            data: gps
        });
    }
    catch (err){
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
    // const{id, lat, lon} = req.body;

    // const newLoc = new Gps({id,lat,lon});
    // await newLoc.save();
    // res.send('recibido');
};

module.exports = gpsCtrl;

