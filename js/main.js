document.addEventListener("DOMContentLoaded", () => {
    main();
});

function main() {
    let toDoListContainer = document.getElementsByClassName("todo-container")[0];
    let container = document.getElementsByClassName("container")[0];

    container.addEventListener('click', () => {
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