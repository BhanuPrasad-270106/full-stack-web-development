// Student Information Management System
// Database: collegeDB
// Collection: students

// 1. Select Database
use collegeDB

// 2. Create Collection
db.createCollection("students")

// 3. Insert Student Records
db.students.insertMany([
    {
        rollNo: "23CM001",
        name: "Ravi Kumar",
        branch: "CSE-AIML",
        year: 3,
        marks: 85,
        email: "ravi@example.com"
    },
    {
        rollNo: "23CM002",
        name: "Priya Sharma",
        branch: "CSE",
        year: 3,
        marks: 92,
        email: "priya@example.com"
    },
    {
        rollNo: "23CM003",
        name: "Arjun Reddy",
        branch: "ECE",
        year: 2,
        marks: 68,
        email: "arjun@example.com"
    },
    {
        rollNo: "23CM004",
        name: "Sneha Patel",
        branch: "CSE-AIML",
        year: 3,
        marks: 78,
        email: "sneha@example.com"
    },
    {
        rollNo: "23CM005",
        name: "Kiran Kumar",
        branch: "MECH",
        year: 2,
        marks: 45,
        email: "kiran@example.com"
    }
])

// 4. Display All Students
db.students.find().pretty()

// 5. Display Students from CSE-AIML
db.students.find({
    branch: "CSE-AIML"
})

// 6. Students Scoring More Than 75
db.students.find({
    marks: { $gt: 75 }
})

// 7. Search Student Using Roll Number
db.students.findOne({
    rollNo: "23CM001"
})

// 8. Search Students in 3rd Year
db.students.find({
    year: 3
})

// 9. Update Marks
db.students.updateOne(
    { rollNo: "23CM001" },
    { $set: { marks: 90 } }
)

// 10. Update Email
db.students.updateOne(
    { rollNo: "23CM002" },
    { $set: { email: "priya.sharma@example.com" } }
)

// 11. Delete Student
db.students.deleteOne({
    rollNo: "23CM005"
})

// 12. Display Students in Descending Order of Marks
db.students.find().sort({
    marks: -1
})

// 13. Create Index on rollNo
db.students.createIndex({
    rollNo: 1
})

// 14. Display Indexes
db.students.getIndexes()

// 15. Students Scoring Above 80
db.students.find({
    marks: { $gt: 80 }
})

// 16. Students Scoring Below 50
db.students.find({
    marks: { $lt: 50 }
})

// 17. Find Highest-Scoring Student
db.students.find()
    .sort({ marks: -1 })
    .limit(1)

// 18. Find Students from CSE-AIML
db.students.find({
    branch: "CSE-AIML"
})

// 19. Sort Students According to Marks
db.students.find().sort({
    marks: -1
})

// 20. Demonstrate Index Usage
db.students.find({
    rollNo: "23CM001"
}).explain("executionStats")
