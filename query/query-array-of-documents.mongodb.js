db.inventory.insertMany( [
  { item: "journal", instock: [ { warehouse: "A", qty: 5 }, { warehouse: "C", qty: 15 } ] },
  { item: "notebook", instock: [ { warehouse: "C", qty: 5 } ] },
  { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 15 } ] },
  { item: "planner", instock: [ { warehouse: "A", qty: 40 }, { warehouse: "B", qty: 5 } ] },
  { item: "postcard", instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 } ] }
]);

// selects all documents where an element
// in the instock array matches the specified document
db.inventory.find( { "instock": { warehouse: "A", qty: 5 } } )

// field order matter, the following query
// does not match any documents in the inventory collection
db.inventory.find( { "instock": { qty: 5, warehouse: "A" } } )

// selects all documents where the instock array has at least one embedded document
// that contains the field qty whose value is less than or equal to 20
db.inventory.find( { 'instock.qty': { $lte: 20 } } )

// selects all documents where the instock array has as its first element
// a document that contains the field qty whose value is less than or equal to 20
db.inventory.find( { 'instock.0.qty': { $lte: 20 } } )

// queries for documents where the instock array has at least one embedded document
// that contains both the field qty equal to 5 and the field warehouse equal to A
db.inventory.find( { "instock": { $elemMatch: { qty: 5, warehouse: "A" } } } )

// queries for documents where the instock array has at least one embedded document
// that contains the field qty that is greater than 10 and less than or equal to 20
db.inventory.find( { "instock": { $elemMatch: { qty: { $gt: 10, $lte: 20 } } } } )

// matches documents where any document nested in the instock array
// has the qty field greater than 10 and any document
// (but not necessarily the same embedded document)
// in the array has the qty field less than or equal to 20
db.inventory.find( { "instock.qty": { $gt: 10,  $lte: 20 } } )

// queries for documents where the instock array
// has at least one embedded document that contains
// the field qty equal to 5 and at least one embedded document
// (but not necessarily the same embedded document)
// that contains the field warehouse equal to A
db.inventory.find( { "instock.qty": 5, "instock.warehouse": "A" } )
