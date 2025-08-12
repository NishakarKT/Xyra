import nodemailer from 'nodemailer';
import twilio from 'twilio';

// Configure email transporter
const emailTransporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Configure Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  { accountSid: process.env.TWILIO_ACCOUNT_SID }
);

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via email
export const sendEmailOTP = async (email) => {
  try {
    const otp = generateOTP();
    
    await emailTransporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Your Login OTP',
      text: `Your OTP for login is: ${otp}. This OTP will expire in 5 minutes.`,
      html: `
        <h1>Your Login OTP</h1>
        <p>Your OTP for login is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
      `
    });

    return otp;
  } catch (error) {
    console.error('Failed to send email OTP:', error);
    throw new Error('Failed to send OTP via email');
  }
};

// Send OTP via SMS
export const sendSMSOTP = async (phone) => {
  try {
    const otp = generateOTP();
    
    await twilioClient.messages.create({
      body: `Your OTP for login is: ${otp}. This OTP will expire in 5 minutes.`,
      to: phone,
      from: process.env.TWILIO_PHONE_NUMBER
    });

    return otp;
  } catch (error) {
    console.error('Failed to send SMS OTP:', error);
    throw new Error('Failed to send OTP via SMS');
  }
};

// Verify OTP
export const verifyOTP = async (inputOTP, storedOTP) => {
  if (!inputOTP || !storedOTP) {
    throw new Error('Invalid OTP provided');
  }
  return inputOTP === storedOTP;
}; 