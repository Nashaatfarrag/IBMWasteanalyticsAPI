const Cloudant = require("@cloudant/cloudant");

var cloudant = Cloudant({
  account: "55388c5b-ccc6-4aef-a409-7b597eb330b8-bluemix",
  password: "c811864248276f3dd752d0a35b351b4b823d16180b10f93e1ead856001b84494"
});

//console.log(cloudant)

cloudant.db
  .list()
  .then(body => {
    body.forEach(db => {
      console.log(db);
    });
  })
  .catch(err => {
    console.log(err);
  });

var db = cloudant.db.use("wastedb");
let newdb = cloudant.db.create("hhwastedb");
console.log(newdb);
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

// db.find({ selector: {  } }, function(err, result) {
//   if (err) {
//     throw err;
//   }
//   console.log(result.docs)
//   // console.log('Found %d documents with name Alice', result.docs.length);
//   // for (var i = 0; i < result.docs.length; i++) {
//   //   console.log('  Doc id: %s', result.docs[i]._id);
//   // }
// });
