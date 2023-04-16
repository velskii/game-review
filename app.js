//#region Comment Header
/**
 * Authors:
 * Yi-Sin Liou(175924216),
 * Wai Lok Siu(181742214),
 * Chang Liu(168780211),
 * Feiliang Zhou(102661220)
 * Date: Mar 10, 2023
 *
 */
//#endregion

//#region Server Setup
var express = require("express");
var app = express();

require("dotenv").config();

app.use(express.static("views"));
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const exphbs = require("express-handlebars");
const { validationResult, check } = require("express-validator");

const hbs = exphbs.create({
  extname: ".hbs",
  helpers: {
    equal: function (a, b, options) {
      if (a === b) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },
  },
});

// Set the Handlebars engine and view engine in Express
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
// const { engine } = require("express-handlebars");
// app.engine(".hbs", engine({ extname: ".hbs" }));
// app.set("view engine", ".hbs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

const clientSession = require("client-sessions");
app.use(
  clientSession({
    cookieName: "Cap805Session",
    secret: "cap805_group2_pixelPioneers",
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 24 * 60 * 60 * 1000,
  })
);

// Mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.dbConn, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//#endregion

const indexRoute = require("./routes/index");
app.use("/", indexRoute);

const browseRoute = require("./routes/browse");
app.use("/browse", browseRoute);

const registerRoute = require("./routes/register");
app.use("/register", registerRoute);

const loginRoute = require("./routes/login");
app.use("/login", loginRoute);

const logoutRoute = require("./routes/logout");
app.use("/logout", logoutRoute);

const profileRoute = require("./routes/profile");
app.use("/profile", profileRoute);

const dashboardRoute = require("./routes/dashboard");
app.use("/dashboard", dashboardRoute);

const adminDashboardRoute = require("./routes/adminDashboard");
app.use("/admin/dashboard", adminDashboardRoute);

const adminPublishRoute = require("./routes/adminPublish");
app.use("/admin/publish", adminPublishRoute);

const gamesDetailRoute = require("./routes/gamesDetail");
app.use("/games", gamesDetailRoute);

const msgRoute = require("./routes/messages");
app.use("/messages", msgRoute);

const aboutRoute = require("./routes/about");
app.use("/about", aboutRoute);

const contactRoute = require("./routes/contact");
app.use("/contact", contactRoute);

module.exports = app;
