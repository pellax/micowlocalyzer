const locCtrl = {};

const GPS = require("../models/Gps");
locCtrl.localizar = async(req, res) => {
    try{
    
        const GPSs = await GPS.find();
        return res.status(200).json({
            success: true,
            data: GPSs
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
   
    res.render('localizar');




   // console.log(GPSs);
    // GPS.find({}, function index(err ,result){
    //     if(!err){
    //         console.log('Response from the controller', res);
    //         return res.send(result);

    //     }
    // });
    // var dict= JSON.stringify(GPSs);
    // var fs = require('fs');
    // fs.writeFileSync("thing.json" , dict);
    
  
};

locCtrl.renderLocsForm = (req, res) => {
    res.render("locs/new-loc");
}

module.exports = locCtrl;
// var Data = fs.readFile("thing.json");
//     studentsJSON = JSON.parse(Data);
//     for(var i in studentsJSON){
//         console.log(studentsJSON[i].id + '\n');
//     }
