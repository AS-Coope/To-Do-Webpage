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

class Todo {

    static classId = 0;
    todo_text;
    todo_body;

    // text, id, order
    todo_values = {
        text: "",
        id: 0,
        order: 0
    }
    constructor() {
        this.todo_values.id = Todo.classId;
        Todo.classId += 1;
    }

    createElementWithClass(element, className) {
        let elemWithClass = document.createElement(element);
        elemWithClass.setAttribute("class", className);
        return elemWithClass;
    }

    // sets up the HTML Element that represents the ToDo that will be placed in the DOM
    createAndReturnSingleToDo() {
        let elemWithClass = this.createElementWithClass("div", "single-todo");
        elemWithClass.appendChild(this.createElementWithClass("div", "todo-text"));
        elemWithClass.appendChild(this.createElementWithClass("button", "delete-button")).textContent = "Delete";
        this.todo_body = elemWithClass;
    }

    getToDoBody() {
        return this.todo_body;
    }

    getToDoTextElement() {
        return this.getToDoBody().querySelector(".todo-text");
    }

    getToDoDeleteBtnElement() {
        return this.getToDoBody().querySelector(".delete-button");
    }

    addDeleteEventListener() {
        console.log(`@ creating delete button: ${todoList}`);
        this.getToDoDeleteBtnElement().addEventListener('click', () => {
            // this will also need code to remove the todo from local storage
            // find the index of current todo.todo_values
            // then remove it from the list
            let idx = todoList.findIndex(values => values.id === this.todo_values.id);
            todoList.splice(idx, 1);
            this.getToDoDeleteBtnElement().parentNode.remove();
        })
    }

    setTextContentOfToDoTextElement(userTextContent) {
        this.getToDoTextElement().textContent = userTextContent;
        this.todo_values.text = userTextContent
    }

    addSingleToDoToContainer(tdlContainer, theSingleToDo) {
        tdlContainer.appendChild(theSingleToDo);
    }
}

// when the delete button on a todo is clicked
// that todo should be removed from the todoList