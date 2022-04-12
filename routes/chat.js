const express = require('express');

const { checkSession } = require('../controllers/sessionController');
const { getChat } = require('../controllers/chatController');


const router = express.Router();

router.get('/', checkSession, getChat);

module.exports = router;