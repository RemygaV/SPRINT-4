const taskInput = document.querySelector(".task-input input");
taskBox = document.querySelector(".task-box");
let itemsList = JSON.parse(localStorage.getItem("item-list"));

function showTodo(filter) {
    let li = "";
    if (itemsList) {
        itemsList.forEach((item, id) => {
            li += `<li class="task">
        <label for="${id}">
            <input type="checkbox" id="${id}">
            <p>${item.name}</p>
        </label>
        <div class="settings">
            <i onclick ="showMenu(this)" class="fa fa-bars"></i>
            <ul class="task-menu">
                <li>Edit</li>
                <li>Delete</li>
            </ul>
        </div>
    </li>`;
        });
    }
    taskBox.innerHTML = li || `<span>You don't have any items here</span>`;
}
showTodo();

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