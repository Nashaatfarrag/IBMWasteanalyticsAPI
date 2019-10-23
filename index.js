/* eslint-disable no-console */
const express = require("express");
const morgan = require("morgan");
const config = require("config");
const cors = require("cors");
const database = require("./database");
const app = express();

app.use(express.json()); // to make request body as json object
app.use(express.urlencoded({ extended: true })); //to understand url parameters
app.use(express.static("public"));
app.use(cors());

app.get("/allbins", (req, res) => {
  database.loggingTable.find(
    {
      selector: {
        _id: {
          $gt: "0"
        }
      }
    },
    (err, result) => {
      if (err) {
        console.log(err)
      }
      result.docs.map(v => (v.Persent = 30));
      res.send(result.docs);
    }
  );
  //   res.send("hello world");
});

app.get("/currentstatus", (req, res) => {
  database.currentValueTable.find(
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
});

app.put("/editbin", (req, res) => {
  console.log("put method called");
  console.log(req.body);
  let date = new Date().getTime();
  let doc = {
    BinID: parseInt(req.body.BinID),
    percentage: parseInt(req.body.percentage),
    timeStamp: date
  };
  database.updateBin(doc.BinID, doc.percentage);
  database.loggingTable.insert(doc).then(res.status(200).send("ok"));
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
