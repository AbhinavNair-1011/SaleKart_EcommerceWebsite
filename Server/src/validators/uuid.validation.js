const { z } = require("zod");

const uuidParamSchema = z.object({
  id: z.uuid("Invalid id"),
});

module.exports = {
  uuidParamSchema,
};