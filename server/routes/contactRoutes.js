const express = require('express');
const router = express.Router();
const contactInfoController = require('../controllers/contactInfoController');
const messageController = require('../controllers/messageController');
const departmentalContactController = require('../controllers/departmentalContactController');
const socialLinkController = require('../controllers/socialLinkController');

// Contact Info Routes
router.get('/info', contactInfoController.getContactInfo);
router.put('/info', contactInfoController.updateContactInfo);

// Message Routes
router.get('/messages', messageController.getAllMessages);
router.get('/messages/:id', messageController.getMessageById);
router.put('/messages/:id/status', messageController.updateMessageStatus);
router.post('/messages/:id/reply', messageController.replyToMessage);
router.delete('/messages/:id', messageController.deleteMessage);

// Departmental Contact Routes
router.get('/departments', departmentalContactController.getAllDepartmentalContacts);
router.post('/departments', departmentalContactController.createDepartmentalContact);
router.put('/departments/:id', departmentalContactController.updateDepartmentalContact);
router.delete('/departments/:id', departmentalContactController.deleteDepartmentalContact);

// Social Link Routes
router.get('/social', socialLinkController.getAllSocialLinks);
router.post('/social', socialLinkController.createSocialLink);
router.put('/social/:id', socialLinkController.updateSocialLink);
router.delete('/social/:id', socialLinkController.deleteSocialLink);

module.exports = router;
