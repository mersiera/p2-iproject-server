const errorHandler = async (error, req, res, next) => {
  switch (error.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      res.status(400).json({ message: error.errors[0].message });
      break;
    case "BadRequest":
      res.status(400).json({ message: error.msg });
      break;
    case "Unauthorized":
      res.status(401).json({ message: error.msg });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: error.message });
      break;
    case "NotFound":
      res.status(404).json({ message: error.msg });
      break;
    default:
      if (error.ApiResponse) {
        res.status(error.httpStatusCode).json({ message: error.ApiResponse.error_messages[0] });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
      break;
  }
};

module.exports = errorHandler;
