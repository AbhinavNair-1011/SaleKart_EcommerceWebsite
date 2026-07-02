const { accessCookieOptions } = require("../shared/cookieOptions");
const AppError = require("../utils/AppError");

function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      if (req.cookies) {
        res.clearCookie("accessToken", accessCookieOptions);
        res.clearCookie("refreshToken", refreshCookieOptions);
      }
      throw new AppError(
        "You are not authorized to perform this action",
        403,
        "AuthorizationError",
      );
    }

    next();
  };
}

module.exports = authorize;
