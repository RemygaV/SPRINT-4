const taskInput = document.querySelector(".task-input input"),
    filters = document.querySelectorAll(".filters span"),
    taskBox = document.querySelector(".task-box");
let editId;
let isEditedTask = false,
    clearAll = document.querySelector(".clear-all-btn");

let itemsList = JSON.parse(localStorage.getItem("item-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
});


function showTodo(filter) {
    let li = "";
    if (itemsList) {
        itemsList.forEach((item, id) => {
            let isCompleted = item.status == "completed" ? "checked" : "";
            if (filter == item.status || filter == "all") {
                li += `<li class="task">
        <label for="${id}">
            <input onclick = "updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
            <p class="${isCompleted}">${item.name}</p>
        </label>
        <div class="settings">
            <i onclick ="showMenu(this)" class="fa fa-bars"></i>
            <ul class="task-menu">
                <li onclick="editTask(${id}, '${item.name}')">Edit</li>
                <li onclick="deleteTask(${id})">Delete</li>
            </ul>
        </div>
    </li>`;
            }
        });
    }
    taskBox.innerHTML = li || `<span>You don't have any items here</span>`;
}
showTodo("all");

function showMenu(selectedTask) {
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        if (e.target.tagName != "I" || e.target != selectedTask) {
            taskMenu.classList.remove("show");
        }
    });
}

function editTask(taskId, taskName) {
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
}

function deleteTask(deleteId) {
    itemsList.splice(deleteId, 1);
    localStorage.setItem("item-list", JSON.stringify(itemsList));
    showTodo("all");
}

clearAll.addEventListener("click", () => {
    itemsList.splice(0, itemsList.length);
    localStorage.setItem("item-list", JSON.stringify(itemsList));
    showTodo("all");
});

function updateStatus(selectedTask) {
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) {
        taskName.classList.add("checked");
        itemsList[selectedTask.id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        itemsList[selectedTask.id].status = "pending";
    }
    localStorage.setItem("item-list", JSON.stringify(itemsList));
}


taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        if (!isEditedTask) {
            if (!itemsList) {
                itemsList = [];
            }
            let taskInfo = { name: userTask, status: "pending" };
            itemsList.push(taskInfo);
        } else {
            isEditedTask = false;
            itemsList[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("item-list", JSON.stringify(itemsList));
        showTodo("all");
    }
});