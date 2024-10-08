let toDoListContainer = document.getElementById("todo-container");
let addToDoBtn = document.getElementById("add-todo-btn");
let todoInput = document.getElementById("todo-input");
let todoList = JSON.parse(localStorage.getItem('todos')) || [];

function addSingleToDoToContainer(tdlContainer, theSingleToDo) {
    tdlContainer.appendChild(theSingleToDo);
}

function createToDo(userToDoInput) {
    let todo = new Todo();
    todo.createAndReturnSingleToDo();
    todo.setTextContentOfToDoTextElement(userToDoInput);
    addSingleToDoToContainer(toDoListContainer, todo.getToDoBody());
    todoList.push(todo.todo_values);
    todo.addDeleteEventListener();
    localStorage.setItem('todos', JSON.stringify(todoList)); // save todoList to local storage
}

function addToDo() {

    let userInput = todoInput.value;
    if (userInput !== null && userInput !== "") {
        createToDo(userInput);
        todoInput.value = "" // clear input area after todo's successful submission
    } else {
        alert("No ToDo entered!");
        console.log(userInput, typeof userInput);
    }
}

// submit todo via 'Enter' key in input
todoInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        addToDo();
    }
});

// submit todo via button press
addToDoBtn.addEventListener('click', addToDo);

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

        // removes todo from local storage, as well as from the on screen list container
        this.getToDoDeleteBtnElement().addEventListener('click', () => {

            let idx = todoList.findIndex(values => values.id === this.todo_values.id);
            if (idx !== -1) { // runs only if the idx is found

                todoList.splice(idx, 1);
                todoList.forEach(todo => {
                    // any todo whose id is larger than idx is updated to account for this
                    // todo's deletion
                    if (todo.id > idx) {
                        todo.id = idx;
                        idx += 1;
                    }
                });
                // ensure a new todo's id immediately numerically follows the current last todo's id
                Todo.classId = idx;
            }

            localStorage.setItem('todos', JSON.stringify(todoList));
            this.getToDoDeleteBtnElement().parentNode.remove();
        });
    }

    setTextContentOfToDoTextElement(userTextContent) {
        this.getToDoTextElement().textContent = userTextContent;
        this.todo_values.text = userTextContent;
    }
}

// run only if an array (list) was returned from localstorage and there is at least one todo in the array
if (Array.isArray(todoList) && (todoList.length > 0)) {
    todoList.forEach(element => {
        let temp_todo = new Todo();
        temp_todo.createAndReturnSingleToDo();
        temp_todo.setTextContentOfToDoTextElement(element.text);
        addSingleToDoToContainer(toDoListContainer, temp_todo.getToDoBody());
        temp_todo.addDeleteEventListener();
        console.log(temp_todo.classId);
    });
}