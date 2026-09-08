console.log("===== Student Management System =====");

class Student {
    constructor() {
        this.students = [];
    }

    addStudent(name, marks) {
        this.students.push({
            name: name,
            marks: marks
        });

        console.log(name + " added successfully.");
    }

    displayStudents() {
        console.log("\nStudents:");

        for (let i = 0; i < this.students.length; i++) {
            console.log(
                (i + 1) + ". " +
                this.students[i].name +
                " - Marks: " +
                this.students[i].marks
            );
        }
    }

    averageMarks() {
        let total = 0;

        for (let i = 0; i < this.students.length; i++) {
            total = total + this.students[i].marks;
        }

        return total / this.students.length;
    }

    removeStudent() {
        let student = this.students.pop();

        if (student) {
            console.log("\nRemoved Student: " + student.name);
        }
    }
}

let school = new Student();

school.addStudent("Bhanu", 90);
school.addStudent("Rahul", 80);
school.addStudent("Sree", 85);
school.addStudent("Karthik", 95);

school.displayStudents();

console.log("\nAverage Marks: " + school.averageMarks());

school.removeStudent();

console.log("\nAfter Removing Student:");

school.displayStudents();

console.log("\nNew Average Marks: " + school.averageMarks());
