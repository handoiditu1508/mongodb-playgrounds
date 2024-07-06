db.stores.insertMany(
  [
    { _id: 1, name: "Java Hut", description: "Coffee and cakes" },
    { _id: 2, name: "Burger Buns", description: "Gourmet hamburgers" },
    { _id: 3, name: "Coffee Shop", description: "Just coffee" },
    { _id: 4, name: "Clothes Clothes Clothes", description: "Discount clothing" },
    { _id: 5, name: "Java Shopping", description: "Indonesian goods" }
  ]
)

// allow text search over the name and description fields
db.stores.createIndex( { name: "text", description: "text" } )

// find all stores containing any terms from the list "coffee", "shop", and "java" in the stores collection
db.stores.find( { $text: { $search: "java coffee shop" } } )

// Search for an Exact Phrase
db.stores.find( { $text: { $search: "\"coffee shop\"" } } )

// Exclude a Term
db.stores.find( { $text: { $search: "java shop -coffee" } } )

// Sort the Results on relevance score
db.stores.find(
  { $text: { $search: "java coffee shop" } },
  { score: { $meta: "textScore" } }
).sort( { score: { $meta: "textScore" } } )
