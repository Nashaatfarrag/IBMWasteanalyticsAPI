/* eslint-disable no-console */
const express = require("express");
const morgan = require("morgan");
const config = require("config");



const app = express();

app.use(express.json());
// to make request body as json object
app.use(express.urlencoded({ extended: true })); //to understand url parameters
app.use(express.static("public"));



//config
console.log("App name : " + config.get("name"));
//console.log('Mail password : ' + config.get('mail.password'));

// only cmd work to change Node environment variable
if (app.get("env") === "development") {
  app.use(morgan("short"));
  
}


// eslint-disable-next-line no-undef
let port = process.env.PORT || 5000 ;
app.listen(port, () => {
  console.log(`listening on port ${port} ... `)
});
