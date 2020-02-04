var nodemailer = require('nodemailer');
const userRepository = require('../repository/userRepository')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'xml.gospoda@gmail.com',
        pass: 'cplusplushatemelpehapeiceeses'
    }
  });

module.exports.sendMail = (mailTo, subject, content) => {
        const mailOptions = {
            from: 'xml.gospoda@gmail.com', 
            to: mailTo,
            subject: subject,
            html: content
        };
        transporter.sendMail(mailOptions, (err,info) => {
            if (err) {
                return false;
            }else {
                return true;
            }
        })
};

module.exports.sendMailToAllEditors = async (subject, content) => {
    const editorEmails = await userRepository.getEditorEmails();
    for (let email of editorEmails) {
        this.sendMail(email, subject, content);
    }
}

module.exports.sendMailToReviewersForArticle = async(articleId, subject, content) => {
    const reviewerEmails = await userRepository.getReviewerEmailsForArticle(articleId);
    for (let email of reviewerEmails) {
        this.sendMail(email, subject, content);
    }
}