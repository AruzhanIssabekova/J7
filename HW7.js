document.addEventListener("DOMContentLoaded", function() {
    load();
});

function add() {
    var input = document.getElementById("input");
    var list = document.getElementById("list");

    if (input.value.trim() !== "") {
        var task = input.value.trim();
        var li = document.createElement("li");
        li.textContent = task;
        li.onclick = toggle;
        list.appendChild(li);

        save();
        input.value = "";
    } else {
        alert("Please enter a task!");
    }
}

function toggle() {
    this.classList.toggle("completed");
    save();
}

function save() {
    var tasks = [];
    var taskList = document.getElementById("list").getElementsByTagName("li");

    for (var i = 0; i < taskList.length; i++) {
        var task = taskList[i].textContent;
        var completed = taskList[i].classList.contains("completed");
        tasks.push({task: task, completed: completed});
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function load() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks) {
        var list = document.getElementById("list");

        tasks.forEach(function(taskObj) {
            var li = document.createElement("li");
            li.textContent = taskObj.task;
            if (taskObj.completed) {
                li.classList.add("completed");
            }
            li.onclick = toggle;
            list.appendChild(li);
        });
    }
}
