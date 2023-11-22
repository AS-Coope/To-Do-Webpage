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
            elemWithClass.appendChild(createElementWithClass("div", "delete-button")).textContent = "Delete";
            return elemWithClass;
        }

        // each button needs an id so it can be tracked when deleted
        // otherwise adding an event listener on a delete button for that specific todo 
        // will cause it to break for every delete button on every todo
        // because the event listener cannot tell which delete button was pressed
        function addIdToDeleteButton() {
            //console.log(document.getElementsByClassName("delete-button").length);
            for (let buttonIndex = 0; buttonIndex < document.getElementsByClassName("delete-button").length; buttonIndex++) {
                document.getElementsByClassName("delete-button")[buttonIndex].setAttribute("id", `${buttonIndex}`);
            }
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
            addIdToDeleteButton();
        }

        //let userInput = prompt("Write a ToDo");
        userInput = "Task"; // remove and uncomment code above to allow actual user input
        if (userInput !== null && userInput !== "") {
            createToDo(userInput);
        } else {
            alert("No ToDo entered!");
            console.log(userInput, typeof userInput);
        }
    });

}