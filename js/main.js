document.addEventListener("DOMContentLoaded", () => {
    main();
});

function main() {
    let toDoListContainer = document.getElementsByClassName("todo-container")[0];
    let addToDoBtn = document.getElementsByClassName("add-todo")[0];

    addToDoBtn.addEventListener('click', () => {
        let myDiv = document.createElement("h2");
        let toDo = prompt("Write a ToDo");
        if (toDo !== null && toDo !== "") {
            myDiv.textContent = toDo;
            toDoListContainer.appendChild(myDiv);
        } else {
            alert("No ToDo entered!");
            console.log(toDo, typeof toDo);
        }
    });

}