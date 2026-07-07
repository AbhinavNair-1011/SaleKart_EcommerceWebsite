const cron = require("node-cron");

const { Op } = require("sequelize");

const { Session } = require("../models");

function startSessionCleanupJob() {
  cron.schedule("0 0 * * *", async () => {
    console.log("Checking expired session");

    const deletedCount = await Session.destroy({
      where: {
        expiresAt: {
          [Op.lt]: new Date(),
        },
      },
    });

    console.log(`Deleted sessions: ${deletedCount}`);
  });
}

module.exports = startSessionCleanupJob;
