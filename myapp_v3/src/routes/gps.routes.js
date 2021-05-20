const { Router } = require('express');
const router = Router();

const { sendgps , getgps} = require ('../controllers/gps.controlers');


router.post('/send_gps',sendgps);
router.get('/get_gps', getgps);
module.exports = router;
