const express = require('express');
const router = express.Router();
const Likes = require("./controller");

router.post('/set', Likes.setLikes);
router.post('/all', Likes.getAll);
router.post('/delete', Likes.deleteOne);

module.exports = router;