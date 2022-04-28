const taskInput = document.querySelector(".task-input input"),
taskBox = document.querySelector(".task-box");
let itemsList = JSON.parse(localStorage.getItem("item-list"));


function showTodo() {
    let li = "";
    if (itemsList) {
        itemsList.forEach((item, id) => {
            let isCompleted = item.status == "completed" ? "checked" : "";
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
    });
}
    taskBox.innerHTML = li || `<span>You don't have any items here</span>`;
}
showTodo();

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

        if (!itemsList) {
            itemsList = [];
        }
        taskInput.value = "";
        let taskInfo = { name: userTask, status: "pending" };
        itemsList.push(taskInfo);
        localStorage.setItem("item-list", JSON.stringify(itemsList));
        showTodo();
    }
});