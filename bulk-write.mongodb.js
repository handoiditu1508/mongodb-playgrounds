// bulkWrite() supports the following write operations:
// insertOne
// updateOne
// updateMany
// replaceOne
// deleteOne
// deleteMany

db.pizzas.insertMany([
  { _id: 0, type: "pepperoni", size: "small", price: 4 },
  { _id: 1, type: "cheese", size: "medium", price: 7 },
  { _id: 2, type: "vegan", size: "large", price: 8 }
])

try {
  db.pizzas.bulkWrite(
    [
      { insertOne: { document: { _id: 3, type: "beef", size: "medium", price: 6 } } },
      { insertOne: { document: { _id: 4, type: "sausage", size: "large", price: 10 } } },
      {
        updateOne: {
          filter: { type: "cheese" },
          update: { $set: { price: 8 } }
        }
      },
      { deleteOne: { filter: { type: "pepperoni" } } },
      {
        replaceOne: {
          filter: { type: "vegan" },
          replacement: { type: "tofu", size: "small", price: 4 }
        }
      }
    ],
    {
      // set to false to run in parallel
      ordered: false
    }
  )
} catch (error) {
  print(error)
}
// db.pizzas.find()
