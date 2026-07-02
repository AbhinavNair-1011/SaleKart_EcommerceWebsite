function emailVerificationTemplate(
  otp
) {
  return `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
      <h2>Verify Your Email</h2>

      <p>
        Welcome to <strong>SaleKart</strong>.
      </p>

      <p>
        Use the following OTP to verify your email:
      </p>

      <h1
        style="
          letter-spacing:6px;
          color:#2563eb;
        "
      >
        ${otp}
      </h1>

      <p>
        This OTP is valid for
        <strong>10 minutes</strong>.
      </p>

      <p>
        If you didn't create an account,
        you can safely ignore this email.
      </p>
    </div>
  `;
}

function passwordResetTemplate(
  otp,
) {
  return `
    <h2>Password Reset</h2>

    <p>
      Your OTP is
    </p>

    <h1>${otp}</h1>

    <p>
      Valid for 10 minutes.
    </p>
  `;
}

module.exports = {
  emailVerificationTemplate,
  passwordResetTemplate
};