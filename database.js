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
let pathData = cloudant.db.use("pathstatus");
// mydb.insert({
//   hi : "by"
// })
// let pathData = cloudant.db.create("pathstatus");
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
  let date = new Date().getTime();
  currentValueTable.find(
    {
      selector: {
        BinID: BinID
      }
    },
    (err, res) => {
      if (err) throw err;

      if (res.docs.length) {
        res.docs[0].percentage = percentage;
        res.docs[0].timeStamp = date;
        res.docs[0].position = {
          lng: 29.98 + (Math.random() * 0.01 + 0),
          lat: 31.25 + (Math.random() * 0.01 + 0)
        };
        currentValueTable.insert(res.docs[0]);
      }
    }
  );
}

// for(let i = 15 ; i < 30 ; i++){
//   // setTimeout(updateBin  ,40000 , 1000+i , Math.floor((Math.random() * 100) + 1));
//   updateBin(1000+i, Math.floor((Math.random() * 100) + 1 ))
//   console.log(i);
// }

// for( let i = 0 ; i< 15 ; i++){
//   let date = new Date().getTime();

//   let doc = {}
//   doc.percentage = Math.floor((Math.random() * 100) + 1 ) ;
//   doc.timeStamp = date ;
//   doc.BinID = 1027+i ;
//   doc.position = {
//     lng: 29.98 + (Math.random() * 0.01 + 0),
//     lat: 31.25 + (Math.random() * 0.01 + 0)
//   };
//   currentValueTable.insert(doc);
// }

module.exports = { loggingTable, currentValueTable, updateBin, pathData };
