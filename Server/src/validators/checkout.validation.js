const { z } = require("zod");

const checkoutSchema = z.object({
  addressId: z.uuid(),
});

module.exports = {
  checkoutSchema,
};