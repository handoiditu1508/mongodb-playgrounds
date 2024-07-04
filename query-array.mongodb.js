// create the inventory collection
db.inventory.insertMany([
  { item: "journal", qty: 25, tags: ["blank", "red"], dim_cm: [ 14, 21 ] },
  { item: "notebook", qty: 50, tags: ["red", "blank"], dim_cm: [ 14, 21 ] },
  { item: "paper", qty: 100, tags: ["red", "blank", "plain"], dim_cm: [ 14, 21 ] },
  { item: "planner", qty: 75, tags: ["blank", "red"], dim_cm: [ 22.85, 30 ] },
  { item: "postcard", qty: 45, tags: ["blue"], dim_cm: [ 10, 15.25 ] }
]);

// Match an Array exactly
db.inventory.find( { tags: ["red", "blank"] } )

// match array contain both element
db.inventory.find( { tags: { $all: ["red", "blank"] } } )

// Query an Array for an Element
db.inventory.find( { tags: "red" } )

// specify conditions on the elements in the array field, use query operators
// https://www.mongodb.com/docs/manual/reference/operator/query/#std-label-query-selectors
db.inventory.find( { dim_cm: { $gt: 25 } } )

// one element can satisfy the greater than 15 condition
// and another element can satisfy the less than 20 condition,
// or a single element can satisfy both
db.inventory.find( { dim_cm: { $gt: 15, $lt: 20 } } )

// at least one element that is both greater than ($gt) 22
// and less than ($lt) 30
db.inventory.find( { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } } )

// queries for all documents where the second element
// in the array dim_cm is greater than 25
db.inventory.find( { "dim_cm.1": { $gt: 25 } } )

// selects documents where the array tags has 3 elements
db.inventory.find( { "tags": { $size: 3 } } )
