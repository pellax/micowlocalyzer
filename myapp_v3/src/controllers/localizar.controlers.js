const locCtrl = {};

locCtrl.localizar = (req, res) => {
    res.render('localizar');
};

locCtrl.renderLocsForm = (req, res) => {
    res.render("locs/new-loc");
}

module.exports = locCtrl;
