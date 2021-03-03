import twilio from "twilio";
require("dotenv").config({ path: ".env" });

const accountSid = process.env.TWILIO_ACCOUNTSID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const serviceid = process.env.TWILIO_SERVICEID;
const client = twilio(accountSid, authToken);

const checkNumber = async (phone) => {
  try {
    const verify = await client.lookups
      .phoneNumbers(phone)
      .fetch({ type: ["carrier"] });
    return verify;
  } catch (err) {
    return err;
  }
};

const sendOtp = async (phone) => {
  try {
    const sendOtp = await client.verify
      .services(serviceid)
      .verifications.create({ locale: "en", to: phone, channel: "sms" });

    if (sendOtp && sendOtp.status == 404)
      throw new Error("Error While Sending OTP Resend Again");
    return sendOtp;
  } catch (err) {
    return err;
  }
};

const verifyAndSendOTP = async (phone) => {
  const twilioVerify = await checkNumber(phone);
  if (twilioVerify.status == 404) throw new Error("Enter Valid Phone Number!");
  if (twilioVerify) {
    const sendotp = await sendOtp(phone);
    if (!sendotp) throw new Error("Error While Sending OTP");

    return twilioVerify;
  }
};

const verifyOtp = async (phone, otp) => {
  try {
    const verifyOtp = await client.verify
      .services(serviceid)
      .verificationChecks.create({ to: phone, code: otp });
    return verifyOtp;
  } catch (err) {
    return err;
  }
};

export default { checkNumber, sendOtp, verifyOtp, verifyAndSendOTP };
