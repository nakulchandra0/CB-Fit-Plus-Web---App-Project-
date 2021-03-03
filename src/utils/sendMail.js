import sgMail from '@sendgrid/mail';
require('dotenv').config({ path: '.env' });

const sgKey = process.env.SENDGRID_API_KEY;
const sgEmail = process.env.SENDGRID_SENDER_EMAIL;

const sendMail = (email, subject, html) => {
	sgMail.setApiKey(sgKey);
	const sendMail = {
		to: email,
		from: sgEmail,
		subject,
		html,
	};
	sgMail.send(sendMail);
};

export default sendMail;
