const otpGenerator = require("otp-generator");

const generateOtp = () => {
  const OTP = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: false,
  });

  return OTP;
};

module.exports = generateOtp;