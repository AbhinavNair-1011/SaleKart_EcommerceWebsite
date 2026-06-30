const AppError = require("../utils/AppError");

function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError(
        "You are not authorized to perform this action",
        403,
        "AuthorizationError"
      );
    }

    next();
  };
}

module.exports = authorize;