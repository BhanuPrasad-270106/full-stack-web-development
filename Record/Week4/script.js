
let nameInput = document.getElementById("studentName");
let ageInput = document.getElementById("studentAge");
let courseInput = document.getElementById("studentCourse");

let addButton = document.getElementById("addStudent");

let studentTable = document.getElementById("studentTable");
let message = document.getElementById("message");


addButton.addEventListener("click", function() {

    let name = nameInput.value;
    let age = ageInput.value;
    let course = courseInput.value;


    if (name === "" || age === "" || course === "") {

        message.textContent = "Please fill all fields";

        return;
    }


    let row = document.createElement("tr");

    let nameCell = document.createElement("td");
    let ageCell = document.createElement("td");
    let courseCell = document.createElement("td");


    nameCell.textContent = name;
    ageCell.textContent = age;
    courseCell.textContent = course;


    row.appendChild(nameCell);
    row.appendChild(ageCell);
    row.appendChild(courseCell);


    studentTable.appendChild(row);

});
