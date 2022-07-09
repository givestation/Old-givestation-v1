const express = require('express');

const donations = require('./donations');
const likes = require("./likes");
const checkAuthentication = require('./private_router');

const router = express.Router();

router.use('/donation', checkAuthentication, donations);
router.use('/likes', checkAuthentication, likes);


module.exports = router;