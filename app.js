const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/mestodb",{
 useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}); 

app.use("/users", require("./routes/users"));
app.use((req, res, next) => {
  req.user = {
      // вставьте сюда _id созданного в предыдущем пункте пользователя
    _id: "5de8024d66e3b82f40842798"
  };

  next();
});
app.use("/cards", require("./routes/cards"));
app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
});

app.get("/*", (req, res) => {
  res.status("404").send({ message: "Запрашиваемый ресурс не найден" });
});