// Populate the Collection
db.students.insertMany([
  { sID: 22001, name: "Alex", year: 1, score: 4.0 },
  { sID: 21001, name: "bernie", year: 2, score: 3.7 },
  { sID: 20010, name: "Chris", year: 3, score: 2.5 },
  { sID: 22021, name: "Drew", year: 1, score: 3.2 },
  { sID: 17301, name: "harley", year: 6, score: 3.1 },
  { sID: 21022, name: "Farmer", year: 1, score: 2.2 },
  { sID: 20020, name: "george", year: 3, score: 2.8 },
  { sID: 18020, name: "Harley", year: 5, score: 2.8 },
])

// Use db.createView() to Create a View
db.createView(
  "firstYears",
  "students",
  [{ $match: { year: 1 } }]
)
// db.firstYears.find({}, { _id: 0 })

// Use db.createCollection() to Create a View
db.createCollection(
  "graduateStudents",
  {
    viewOn: "students",
    pipeline: [{ $match: { $expr: { $gt: ["$year", 4] } } }],
    collation: { locale: "en", caseFirst: "upper" }
  }
)
// Query the View
db.graduateStudents.aggregate(
  [
     { $sort: { name: 1 } },
     { $unset: [ "_id" ] }
  ]
)

// similar pipeline
db.createCollection(
  "graduateStudents2",
  {
    viewOn: "students",
    pipeline: [{ $match: { year: { $gt: 4 } } }],
    collation: { locale: "en", caseFirst: "upper" }
  }
)
// db.graduateStudents2.find({}, { _id: 0 })

// count documents
db.students.countDocuments({ year: { $gt: 3 } })
