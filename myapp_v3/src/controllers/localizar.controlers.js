const locCtrl = {};

locCtrl.localizar = (req, res) => {
    console.log(req.user.name);
    res.render('localizar');
};

module.exports = locCtrl;


