function loadTasks() {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let taskList = document.getElementById("taskList");
    let emptyMessage = document.getElementById("emptyMessage");

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    let completed = 0;

    tasks.forEach((task, index) => {

        let li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) completed++;

        li.innerHTML = `
            <div class="task-left">

                <input type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${index})">

                <span class="task-text ${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>

            </div>

            <button class="delete-btn" onclick="deleteTask(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        taskList.appendChild(li);
    });

    // Update statistics
    document.getElementById("totalTasks").innerText = tasks.length;
    document.getElementById("completedTasks").innerText = completed;
    document.getElementById("pendingTasks").innerText = tasks.length - completed;
}

function addTask() {

    let input = document.getElementById("taskInput");

    if (input.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: input.value,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";

    loadTasks();
}

function deleteTask(index) {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}

function toggleTask(index) {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    loadTasks();
}

// Live Date & Time
function updateDateTime() {

    let now = new Date();

    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    document.getElementById("dateTime").innerHTML =
        now.toLocaleDateString('en-US', options);
}

setInterval(updateDateTime, 1000);

window.onload = function () {
    loadTasks();
    updateDateTime();
};

// Add task using Enter key
document.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
        addTask();
    }

});
