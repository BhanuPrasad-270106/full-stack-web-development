// Select elements from the DOM
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const taskCount = document.getElementById("taskCount");

// Button event
addTaskButton.addEventListener("click", function() {
    const taskText = taskInput.value.trim();

    // Check whether the task field is empty
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create task elements dynamically
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    const taskTextElement = document.createElement("span");
    taskTextElement.classList.add("task-text");
    taskTextElement.textContent = taskText;

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-btn");
    completeButton.textContent = "Complete";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";

    // Complete button event
    completeButton.addEventListener("click", function() {
        taskItem.classList.toggle("completed");

        if (taskItem.classList.contains("completed")) {
            completeButton.textContent = "Completed";
        } else {
            completeButton.textContent = "Complete";
        }
    });

    // Delete button event
    deleteButton.addEventListener("click", function() {
        taskItem.remove();
        updateTaskList();
    });

    // Add elements to task item
    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);

    // Add task to webpage
    taskList.appendChild(taskItem);

    // Clear input
    taskInput.value = "";

    // Update task information
    updateTaskList();
});

// Update task list information
function updateTaskList() {
    const totalTasks = taskList.children.length;
    taskCount.textContent = totalTasks;

    if (totalTasks === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

// Enter key event
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTaskButton.click();
    }
});

// Initial state
updateTaskList();