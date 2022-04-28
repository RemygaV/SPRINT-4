const taskInput = document.querySelector(".task-input input");

taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        let itemsList = JSON.parse(localStorage.getItem("item-list"));
        if (!itemsList) {
            itemsList = [];
        }
        taskInput.value = "";
        let taskInfo = { name: userTask, status: "pending" };
        itemsList.push(taskInfo);
        localStorage.setItem("item-list", JSON.stringify(itemsList));
    }
});