const express = require('express');
const router = express.Router();
const contactInfoController = require('../controllers/contactInfoController');
const messageController = require('../controllers/messageController');
const departmentalContactController = require('../controllers/departmentalContactController');
const socialLinkController = require('../controllers/socialLinkController');
const emailConfigController = require('../controllers/emailConfigController');

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

// Email Configuration Routes
router.get('/email-config', emailConfigController.getEmailConfig);
router.put('/email-config', emailConfigController.updateEmailConfig);
router.post('/email-config/cc', emailConfigController.addCcEmail);
router.delete('/email-config/cc/:email', emailConfigController.removeCcEmail);
router.delete('/email-config', emailConfigController.deleteEmailConfig);

module.exports = router;
