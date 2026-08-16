// Student class
class Student {
    constructor(name, rollNumber, department, cgpa) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.department = department;
        this.cgpa = cgpa;
    }
}

// Select elements from the DOM
const nameInput = document.getElementById("name");
const rollNumberInput = document.getElementById("rollNumber");
const departmentInput = document.getElementById("department");
const cgpaInput = document.getElementById("cgpa");

const createButton = document.getElementById("createProfile");
const profileContainer = document.getElementById("profileContainer");

// Button event
createButton.addEventListener("click", function () {

    const name = nameInput.value;
    const rollNumber = rollNumberInput.value;
    const department = departmentInput.value;
    const cgpa = cgpaInput.value;

    // Check whether all fields are filled
    if (name === "" || rollNumber === "" || department === "" || cgpa === "") {
        alert("Please fill all the fields.");
        return;
    }

    // Create Student object
    const student = new Student(
        name,
        rollNumber,
        department,
        cgpa
    );

    // Clear previous profile
    profileContainer.innerHTML = "";

    // Create profile elements dynamically
    const profile = document.createElement("div");
    profile.classList.add("profile");

    const title = document.createElement("h2");
    title.textContent = "Student Profile";

    const nameElement = document.createElement("p");
    nameElement.textContent = "Name : " + student.name;

    const rollElement = document.createElement("p");
    rollElement.textContent = "Roll No : " + student.rollNumber;

    const departmentElement = document.createElement("p");
    departmentElement.textContent = "Department : " + student.department;

    const cgpaElement = document.createElement("p");
    cgpaElement.textContent = "CGPA : " + student.cgpa;

    // Add elements to profile
    profile.appendChild(title);
    profile.appendChild(nameElement);
    profile.appendChild(rollElement);
    profile.appendChild(departmentElement);
    profile.appendChild(cgpaElement);

    // Add profile to webpage
    profileContainer.appendChild(profile);
});