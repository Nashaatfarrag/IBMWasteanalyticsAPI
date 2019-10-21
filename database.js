const Cloudant = require("@cloudant/cloudant");

var cloudant = Cloudant({
  account: "55388c5b-ccc6-4aef-a409-7b597eb330b8-bluemix",
  password: "c811864248276f3dd752d0a35b351b4b823d16180b10f93e1ead856001b84494"
});

//console.log(cloudant)

// cloudant.db
//   .list()
//   .then(body => {
//     body.forEach(db => {
//       console.log(db);
//     });
//   })
//   .catch(err => {
//     console.log(err);
//   });

let loggingTable = cloudant.db.use("wastedb");
let currentValueTable = cloudant.db.use("currentbinstatus");
// mydb.insert({
//   hi : "by"
// })
// let newdb = cloudant.db.create("currentBinStatus");
// console.log(newdb);
var books = [
  { author: "Charles Dickens", title: "David Copperfield" },
  { author: "David Copperfield", title: "Tales of the Impossible" },
  { author: "Charles Dickens", title: "Great Expectation" }
];

// db.bulk({ docs:books }, function(err) {
//   if (err) {
//     throw err;
//   }

//   console.log('Inserted all documents');
// });

const doc = {
  _id: "canidae:dog",
  name: "Dog",
  latin: "Canis lupus familiaris"
};

// insert the document
//  db.insert(doc)

//  db.destroy('canidae:dog' , "3-e8867d756a60d3c69a5c54386a3804ef"  ).then(body => {
//    console.log(body)
//  })

function updateBin(BinID, percentage) {
  let element = {
    BinID: BinID,
    percentage: percentage
  };

  currentValueTable.find(
    {
      selector: {
        BinID: BinID
      }
    },
    (err, res) => {
      if( err )
      throw err 

      if (res.docs.length) {
        currentValueTable.destroy(res.docs[0]._id, res.docs[0]._rev);
        currentValueTable.insert(element);
      }
    }
  );
}


module.exports = { loggingTable, currentValueTable, updateBin };
