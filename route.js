const database = require("./database");

function mainFunction() {
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
        throw err;
      }

      let binData = result.docs;
      let routes = getRoutes(binData);
      database.pathData.insert(routes);
    }
  );
}

function getRoutes(binsData) {
  console.log(binsData);
  // generate routes from binData
  // route must be object
  let routes = {};

  return routes;
}

function viewRoutes() {
  database.pathData.find(
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
      console.log(result.docs);
    }
  );
}

// mainFunction();
viewRoutes()
