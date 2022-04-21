const { History } = require("../models");

class historyController {
  static async getAllHistories(req, res, next) {
    try {
      const histories = await History.findAll({ order: [["id", "asc"]] });

      res.status(200).json(histories);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = historyController;
