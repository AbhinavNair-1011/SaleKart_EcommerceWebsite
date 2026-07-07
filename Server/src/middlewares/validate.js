const AppError = require("../utils/AppError");

function validate(schema, source = "body") {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const message = result.error.issues.map((issue) => issue.message).join(", ");

     
      throw new AppError(message, 400, "ValidationError")
      
    }

    req[source] = result.data;

    next();
  };
}

module.exports = validate;