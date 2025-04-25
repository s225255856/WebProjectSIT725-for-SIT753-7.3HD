const generateOtpHtml = (otp) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
      <h2 style="color: #333; text-align: center;">Your One-Time Password</h2>
      <p style="font-size: 16px; color: #555;">
        Use the following OTP to verify your email address. This code is valid for <strong>5 minutes</strong>.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <div style="display: inline-block; padding: 15px 30px; font-size: 24px; background: #007BFF; color: white; border-radius: 8px; letter-spacing: 3px;">
          ${otp}
        </div>
      </div>
      <p style="font-size: 14px; color: #888;">
        If you did not request this, you can safely ignore this email.
      </p>
      <p style="font-size: 14px; color: #aaa; text-align: center; margin-top: 40px;">
        — The YourApp Team
      </p>
    </div>
  </div>
`;

module.exports = generateOtpHtml;
