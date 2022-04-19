const express = require("express");
const cors = require("cors");
const routes = require("./routes/index.js");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
