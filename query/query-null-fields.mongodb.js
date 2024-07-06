db.inventory.insertMany([
  { _id: 1, item: null },
  { _id: 2 }
])

// returns both documents in the collection
db.inventory.find( { item: null } )

// matches documents where the item field exists and has a non-null value
db.inventory.find( { item: { $ne : null } } )

// matches only documents that contain the item field whose value is null
// the value of the item field is of BSON Type Null (BSON Type 10)
db.inventory.find( { item : { $type: 10 } } )

// queries for documents that do not contain a field
db.inventory.find( { item : { $exists: false } } )
