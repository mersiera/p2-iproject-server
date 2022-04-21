if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/index.js");
const errorHandler = require("./midllewares/errorHandler.js");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
