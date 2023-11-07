document.addEventListener("DOMContentLoaded", () => {
    main();
});

function main() {
    let toDoListContainer = document.getElementsByClassName("todo-container")[0];
    let addToDoBtn = document.getElementsByClassName("add-todo-btn")[0];

    addToDoBtn.addEventListener('click', () => {

        function createElementWithClass(element, className) {
            let elemWithClass = document.createElement(element);
            elemWithClass.setAttribute("class", className);
            return elemWithClass;
        }

        function createAndReturnSingleToDo() {
            elemWithClass = createElementWithClass("div", "single-todo");
            elemWithClass.appendChild(createElementWithClass("div", "todo-text"));
            elemWithClass.appendChild(createElementWithClass("div", "delete-button"));
            return elemWithClass;
        }

        function getToDoTextElement(singleToDo) {
            return singleToDo.querySelector(".todo-text");
        }

        function setTextContentOfToDoTextElement(toDoTextElem, userTextContent) {
            toDoTextElem.textContent = userTextContent;
        }

        function addSingleToDoToContainer(tdlContainer, theSingleToDo) {
            tdlContainer.appendChild(theSingleToDo);
        }

        function createToDo(userToDoInput) {
            let singleToDo = createAndReturnSingleToDo();
            let toDoText = getToDoTextElement(singleToDo);
            setTextContentOfToDoTextElement(toDoText, userToDoInput);
            addSingleToDoToContainer(toDoListContainer, singleToDo);
        }

        let userInput = prompt("Write a ToDo");
        if (userInput !== null && userInput !== "") {
            createToDo(userInput);
        } else {
            alert("No ToDo entered!");
            console.log(userInput, typeof userInput);
        }
    });

}