const { Router } = require('express');
const router = Router();

const { sendgps, locs, addloc, removeloc, renderAddForm} = require ('../controllers/gps.controlers');
const { isAuthenticated} = require('../helpers/auth.js');

router.get('/locs', isAuthenticated, locs);

router.post('/add_loc', isAuthenticated, addloc);

router.get('/add_loc', isAuthenticated, renderAddForm);

router.post('/send_gps',sendgps);

router.delete('/remove_loc/:id', isAuthenticated, removeloc);

module.exports = router;
