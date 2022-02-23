const testCtrl = {};

const Gps = require("../models/Gps")

/*gpsCtrl.sendgps = async (req,res) => {
    const{id, lat, lon} = req.body;

    const newLoc = new Gps({id,lat,lon});
    await newLoc.save();
    res.send('recibido');
    
};
*/
testCtrl.gettest = async(req, res) =>{
   // const gps = await Gps.find();
    
	const gps = {message:"get ok"};
	res.send(JSON.stringify(gps));
    // return res.status(200).json({
    //     data: gps
    // });
};

testCtrl.posttest = async(req,res)=>{
	const {id,lat,lon} = req.body;
	const gps = {message:"post ok"};
	const newLoc = new Gps({id,lat,lon});
	await newLoc.save();
	res.send(JSON.stringify(gps));
};
module.exports = testCtrl;
