const generateOtpHtml = (otp) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
        <h1 style="color: #333; text-align: center;">Your One-Time Password</h1>
        <p style="font-size: 16px; color: #555; line-height: 1.5;">
            Use the following OTP to verify your email address. This code is valid for <strong>5 minutes</strong>.
        </p>
        <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; padding: 15px 30px; font-size: 24px; background: #007BFF; color: white; border-radius: 8px; letter-spacing: 3px;">
                ${otp}
            </div>
        </div>
        <p style="font-size: 14px; color: #888; line-height: 1.5;">
            If you did not request this, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #aaa; text-align: center;">
            &copy; ${new Date().getFullYear()} YourApp. All rights reserved.<br>
            Our mailing address is: support@yourdomain.com
        </p>
    </div>
</body>
</html>
`;

module.exports = generateOtpHtml;