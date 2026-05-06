function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${task} 
            <button onclick="deleteTask(${index})">❌</button>`;
        list.appendChild(li);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (input.value.trim() === "") return;

    tasks.push(input.value);
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

window.onload = loadTasks;