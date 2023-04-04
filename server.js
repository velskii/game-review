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

app = require("./app");
require("dotenv").config();

var HTTP_PORT = process.env.PORT || 3000;

app.listen(HTTP_PORT, OnHttpStart);

function OnHttpStart() {
  console.log("Express server started successfully on port: " + HTTP_PORT);
}
