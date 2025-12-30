const express = require('express');
const router = express.Router();
const contactInfoController = require('../controllers/contactInfoController');
const messageController = require('../controllers/messageController');
const departmentalContactController = require('../controllers/departmentalContactController');
const socialLinkController = require('../controllers/socialLinkController');

// Public routes for client-side
router.get('/info', contactInfoController.getContactInfo);
router.get('/departments', departmentalContactController.getActiveDepartmentalContacts);
router.get('/social', socialLinkController.getActiveSocialLinks);
router.post('/message', messageController.createMessage);

module.exports = router;
