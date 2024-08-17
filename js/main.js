let toDoListContainer = document.getElementById("todo-container");
let addToDoBtn = document.getElementById("add-todo-btn");
let todoInput = document.getElementById("todo-input");
let todoList = [];

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

    function getToDoTextElement(singleToDo) {
        return singleToDo.querySelector(".todo-text");
    }

    function getToDoDeleteBtnElement(singleToDo) {
        return singleToDo.querySelector(".delete-button");
    }

    function addDeleteEventListener(delBtn) {
        delBtn.addEventListener('click', () => {
            delBtn.parentNode.remove();
        })
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
        let delBtn = getToDoDeleteBtnElement(singleToDo);
        setTextContentOfToDoTextElement(toDoText, userToDoInput);
        addDeleteEventListener(delBtn);
        addSingleToDoToContainer(toDoListContainer, singleToDo);
    }


    let userInput = todoInput.value;
    //userInput = "Task"; // remove and uncomment code above to allow actual user input
    if (userInput !== null && userInput !== "") {
        createToDo(userInput);
    } else {
        alert("No ToDo entered!");
        console.log(userInput, typeof userInput);
    }
});