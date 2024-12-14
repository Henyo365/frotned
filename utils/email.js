const {nodeMailer} = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service:'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const mailOptions = {
        from: `"Node Mailer" <yhendry536@gmail.com>`,
        to: options.email,
        subject: options.subject,
        html: options.html
};

    await transporter.sendMail(mailOptions);

};

module.exports = sendEmail
