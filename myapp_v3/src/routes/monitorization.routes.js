const { Router } = require('express');
const router = Router();

const  { sendPacketTraffic } = require ('../controllers/PacketTraffic.controlers');

router.post('/send_PacketTraffic',sendPacketTraffic);
module.exports = router;
