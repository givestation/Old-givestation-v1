const express = require('express');
const router = express.Router();
const donation = require("./controller");

router.post('/create', donation.createDonation);
router.post('/all', donation.getAll);
router.post('/delete', donation.deleteOne);

module.exports = router;
