// show all databases
show("dbs")
// show dbs

// show current database
db

// Select the database to use.
// (need to run the whole batch of command for use to be able to be applied)
use("mongodbVSCodePlaygroundDB")
// use mongodbVSCodePlaygroundDB

// insert a document into users collection
db.users.insertOne(
  {
    name: "sue",
    age: 26,
    status: "pending"
  }
)

// query users collection
db.users.find(            // collection
  { age: { $gt: 18 } },   // query criteria
  { name: 1, address: 1 } // projection
).limit(5)                // cursor modifier

// update multiple
db.users.updateMany(            // collection
  { age: { $lt: 18 } },         // update filter
  { $set: { status: "reject" } }// update action
)

// delete multiple
db.users.deleteMany(  // collection
  { status: "reject" }// delete filter
)
