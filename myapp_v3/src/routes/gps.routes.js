const { Router } = require('express');
const router = Router();

const { sendgps} = require ('../controllers/gps.controlers');


router.post('/send_gps',sendgps);

module.exports = router;
