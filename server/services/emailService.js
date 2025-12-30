const nodemailer = require('nodemailer');

// Create transporter using Brevo SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send notification to admin when new message received
exports.sendNewMessageNotification = async (messageData) => {
    try {
        const mailOptions = {
            from: `"GIS Solutions Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New Contact Message from ${messageData.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2d5f8d;">New Contact Message</h2>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>From:</strong> ${messageData.name}</p>
                        <p><strong>Email:</strong> ${messageData.email}</p>
                        ${messageData.company ? `<p><strong>Company:</strong> ${messageData.company}</p>` : ''}
                        ${messageData.service ? `<p><strong>Service:</strong> ${messageData.service}</p>` : ''}
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${messageData.message}</p>
                    </div>
                    <p style="color: #666; font-size: 12px;">
                        You can reply to this message from the admin panel.
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Notification email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending notification email:', error);
        throw error;
    }
};

// Send reply email to user
exports.sendReplyEmail = async (messageData, replyContent) => {
    try {
        const mailOptions = {
            from: `"GIS Solutions" <${process.env.EMAIL_USER}>`,
            to: messageData.email,
            subject: `Re: Your inquiry to GIS Solutions`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #2d5f8d; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                        <h2 style="margin: 0;">GIS Solutions (Pvt) Ltd</h2>
                    </div>
                    <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
                        <p>Dear ${messageData.name},</p>
                        <p>Thank you for contacting GIS Solutions. Here's our response to your inquiry:</p>
                        <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #2d5f8d; margin: 20px 0;">
                            <p style="white-space: pre-wrap; margin: 0;">${replyContent}</p>
                        </div>
                        <p><strong>Your Original Message:</strong></p>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin: 20px 0;">
                            <p style="white-space: pre-wrap; margin: 0; color: #666;">${messageData.message}</p>
                        </div>
                        <p>If you have any further questions, please don't hesitate to contact us.</p>
                        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                        <p style="color: #666; font-size: 12px;">
                            <strong>GIS Solutions (Pvt) Ltd</strong><br>
                            370 Galle - Colombo Rd, Colombo 00300<br>
                            Phone: +0112 575 297 | Mobile: +94 77 525 5133<br>
                            Email: info@gislk.com | Web: www.gislk.com
                        </p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Reply email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending reply email:', error);
        throw error;
    }
};

// Send confirmation email to user when they submit a message
exports.sendConfirmationEmail = async (messageData) => {
    try {
        const mailOptions = {
            from: `"GIS Solutions" <${process.env.EMAIL_USER}>`,
            to: messageData.email,
            subject: 'Thank you for contacting GIS Solutions',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: #2d5f8d; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                        <h2 style="margin: 0;">GIS Solutions (Pvt) Ltd</h2>
                    </div>
                    <div style="padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
                        <p>Dear ${messageData.name},</p>
                        <p>Thank you for reaching out to GIS Solutions. We have received your message and our team will get back to you within 24 hours.</p>
                        <p><strong>Your Message:</strong></p>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin: 20px 0;">
                            <p style="white-space: pre-wrap; margin: 0; color: #666;">${messageData.message}</p>
                        </div>
                        <p>We appreciate your interest in our GIS services.</p>
                        <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                        <p style="color: #666; font-size: 12px;">
                            <strong>GIS Solutions (Pvt) Ltd</strong><br>
                            370 Galle - Colombo Rd, Colombo 00300<br>
                            Phone: +0112 575 297 | Mobile: +94 77 525 5133<br>
                            Email: info@gislk.com | Web: www.gislk.com
                        </p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Confirmation email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending confirmation email:', error);
        // Don't throw error for confirmation email failure
        return { success: false, error: error.message };
    }
};
