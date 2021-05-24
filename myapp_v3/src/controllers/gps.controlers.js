const gpsCtrl = {};

const Gps = require("../models/Gps");
const Loc = require("../models/Loc");

gpsCtrl.locs = async (req, res) => {
    const locs = await Loc.find({name: req.user.name});
    res.render('locs/all_locs', {locs});
}

gpsCtrl.renderAddForm = (req, res) => {
    res.render('locs/add');
}

gpsCtrl.sendgps = async (req,res) => {
    const{id, lat, lon} = req.body;
    const register = await Loc.findOne({id: id}).lean();
    if(register){
        const newLoc = new Gps({id,lat,lon});
        const hiha = await Gps.findOne({id: id});
        if(hiha){
            const aux = {
                "id": id,
                "lat": lat,
                "lon": lon
            };
            await Gps.findOneAndReplace({id: id}, aux);
        }
        else {
            await newLoc.save();
        }
        res.send('recibido');
    }
};

gpsCtrl.getgps = async(req, res) =>{
    const username = req.user.name;
    const loc = await Loc.find({name: username});
    var gps = [];
    for(const i in loc){
        gps.push(await Gps.find({id: loc[i].id}));
    }
    res.send(JSON.stringify(gps));
}

gpsCtrl.addloc = async (req, res) => {
    const {id, name} = req.body;
    const register = await Loc.findOne({id: id}).lean();
    if(register){
        req.flash("error_msg", "You are registered.");
        return res.redirect("/add_loc");
    }
    const newLoc = new Loc({id, name});
    await newLoc.save();
    req.flash("success_msg", "Loc Added Successfully");
    res.redirect('/locs');
};

gpsCtrl.removeloc = async (req, res) => {
    await Loc.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Loc Deleted Successfully");
    res.redirect('/locs');
}

module.exports = gpsCtrl;
