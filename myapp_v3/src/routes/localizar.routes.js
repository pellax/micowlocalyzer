const { Router } = require('express');
const router = Router();

const { localizar} = require ('../controllers/localizar.controlers');

router.get('/localizar', localizar);

module.exports = router;
