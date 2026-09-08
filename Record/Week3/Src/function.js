
let marks = [85, 90, 78, 88, 95];

function displayMarks(marks) {
    console.log("Student Marks:", marks);
}

function calculateTotal(marks) {
    let total = 0;
    for (let mark of marks) {
        total += mark;
    }
    return total;
}

function calculateAverage(marks) {
    return calculateTotal(marks) / marks.length;
}

function addMark(marks, newMark) {
    marks.push(newMark);
}

displayMarks(marks);

console.log("Total Marks:", calculateTotal(marks));

console.log("Average Marks:", calculateAverage(marks));

addMark(marks, 92);

console.log("After Adding New Mark:");
displayMarks(marks);

console.log("New Total:", calculateTotal(marks));
