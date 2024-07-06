db.inventory.insertMany( [
  { item: "journal", status: "A", size: { h: 14, w: 21, uom: "cm" }, instock: [ { warehouse: "A", qty: 5 } ] },
  { item: "notebook", status: "A",  size: { h: 8.5, w: 11, uom: "in" }, instock: [ { warehouse: "C", qty: 5 } ] },
  { item: "paper", status: "D", size: { h: 8.5, w: 11, uom: "in" }, instock: [ { warehouse: "A", qty: 60 } ] },
  { item: "planner", status: "D", size: { h: 22.85, w: 30, uom: "cm" }, instock: [ { warehouse: "A", qty: 40 } ] },
  { item: "postcard", status: "A", size: { h: 10, w: 15.25, uom: "cm" }, instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 } ] }
]);

// Return All Fields in Matching Documents
// similar to SELECT * from inventory WHERE status = "A"
db.inventory.find( { status: "A" } )

// Return the Specified Fields and the _id Field Only
// similar to SELECT _id, item, status from inventory WHERE status = "A"
db.inventory.find( { status: "A" }, { item: 1, status: 1 } )

// Suppress _id Field
// similar to SELECT item, status from inventory WHERE status = "A"
db.inventory.find( { status: "A" }, { item: 1, status: 1, _id: 0 } )

// Return All But the Excluded Fields
db.inventory.find( { status: "A" }, { status: 0, instock: 0 } )

// Return Specific Fields in Embedded Documents
db.inventory.find(
  { status: "A" },
  { item: 1, status: 1, "size.uom": 1 }
)

// Suppress Specific Fields in Embedded Documents
db.inventory.find(
  { status: "A" },
  { "size.uom": 0 }
)

// Projection on Embedded Documents in an Array
db.inventory.find( { status: "A" }, { item: 1, status: 1, "instock.qty": 1 } )

// Project Specific Array Elements in the Returned Array
db.inventory.find( { status: "A" }, { item: 1, status: 1, instock: { $slice: -1 } } )
// not working
db.inventory.find( { status: "A" }, { item: 1, status: 1, "instock.0": 1 } )

// Project Fields with Aggregation Expressions
db.inventory.find(
  { },
  {
     _id: 0,
     item: 1,
     status: {
        $switch: {
           branches: [
              {
                 case: { $eq: [ "$status", "A" ] },
                 then: "Available"
              },
              {
                 case: { $eq: [ "$status", "D" ] },
                 then: "Discontinued"
              },
           ],
           default: "No status found"
        }
     },
     area: {
        $concat: [
           { $toString: { $multiply: [ "$size.h", "$size.w" ] } },
           " ",
           "$size.uom"
        ]
     },
     reportNumber: { $literal: 1 }
  }
)
