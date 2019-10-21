/* eslint-disable no-console */
const express = require("express");
const morgan = require("morgan");
const config = require("config");
const database = require('./database')
const app = express();

app.use(express.json()); // to make request body as json object
app.use(express.urlencoded({ extended: true })); //to understand url parameters
app.use(express.static("public"));

app.get("/allbins", (req, res) => {
  database.db.find(
    {
      selector: {
        _id: {
          $gt: "0"
        }
      }
    },
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result.docs);
    }
  );
//   res.send("hello world");
});

//config
console.log("App name : " + config.get("name"));

// only cmd work to change Node environment variable
if (app.get("env") === "development") {
  app.use(morgan("short"));
}

let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port} ... `);
});
