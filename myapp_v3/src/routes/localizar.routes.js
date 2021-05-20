const { Router } = require('express');
const router = Router();

const { localizar } = require ('../controllers/localizar.controlers');
const { isAuthenticated} = require('../helpers/auth.js');

router.get('/localizar', isAuthenticated, localizar);

module.exports = router;
