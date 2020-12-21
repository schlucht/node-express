const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();



const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const homeRoutes = require("./routes/home");
const errorController = require("./controllers/errors");



app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(homeRoutes);
//create a server object:

app.use(errorController.get404);

app.listen(8080); //the server object listens on port 8080
