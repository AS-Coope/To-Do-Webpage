let toDoListContainer = document.getElementById("todo-container");
let addToDoBtn = document.getElementById("add-todo-btn");
let todoInput = document.getElementById("todo-input");
let todoList = JSON.parse(localStorage.getItem('todos')) || [];

function addSingleToDoToContainer(tdlContainer, theSingleToDo) {
    tdlContainer.appendChild(theSingleToDo);
}

function createToDo(userToDoInput) {
    let todo = new Todo(userToDoInput);
    addSingleToDoToContainer(toDoListContainer, todo.toDoBody);
    todoList.push(todo.todo_values);
    localStorage.setItem('todos', JSON.stringify(todoList)); // save todoList to local storage
}

function addToDo() {

    let userInput = todoInput.value;
    if (userInput !== null && userInput !== "") {
        createToDo(userInput);
        todoInput.value = "" // clear input area after todo's successful submission
        removeError();
    } else {
        displayError("No ToDo entered!");
        console.log(userInput, typeof userInput);
    }
}

function displayError(error) {
    if (document.body.children[0].getAttribute('class') !== "error") {
        let errorMessage = document.createElement('div');
        errorMessage.setAttribute('class', 'error');
        errorMessage.textContent = error;
        document.body.insertBefore(errorMessage, document.body.children[0]);
    }
}

function removeError() {
    for (let element of document.body.children) {
        if (element.getAttribute('class') === "error") {
            document.body.removeChild(element);
        }
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

class ToDoView {

    #createElementWithClass(element, className) {
        let elemWithClass = document.createElement(element);
        elemWithClass.setAttribute("class", className);
        return elemWithClass;
    }

    // sets up the HTML Element that represents the ToDo that will be placed in the DOM
    #createAndReturnSingleToDo() {
        let elemWithClass = this.#createElementWithClass("div", "single-todo");
        elemWithClass.appendChild(this.#createElementWithClass("div", "todo-text"));
        elemWithClass.appendChild(this.#createElementWithClass("button", "delete-button")).textContent = "Delete";
        return elemWithClass;
    }

    createToDo() {
        // retrieve the text entered at the input
        // call the respective controller method to perform ToDo creation
        // set the data retrieved from that function to a variable here to be used
        // to create the ToDo
    }

    getToDo() {
        // retrieve todo from data store (may not be necessary )
    }

    updateToDoStatus() {
        // retrieve the change of status made to the ToDo
        // call the respective controller method to perform the ToDo status change
        // update the status in the UI to match that which was chosen by the user
        // OR
        // update the status based on the value returned by the controller (choose one of these methods)
    }

    updateToDoText() {
        // retrieve the change of text made to the ToDo
        // call the respective controller method to perform the ToDo text change
        // update the text in the UI to match that which the user input
        // OR
        // update the text based on the value returned by the controller (choose one of these methods)
    }

    updateToDoOrder() {
        // retrieve the change of order of ToDos to the ToDo
        // call the respective controller method to perform the ToDo text change
        // redraw the ToDoList based on the new ordering from the backend (model)
    }

    deleteToDo() { // more than likely an action listener for the delete button will wrap this

    }

    displayErrors() {

    }
}

class ToDoController {

    createToDo() {

    }

    sendToDoToModel() {

    }

    updateToDoStatus() {

    }

    updateToDoOrder() {

    }

    getToDo() {

    }

    removeToDo() {

    }

}

class ToDoModel {

    addToDo() {

    }

    removeToDo() {

    }

    updateToDoText() {

    }

    updateToDoStatus() {

    }

    updateToDoOrder() {

    }
}

// first, the constructor is what should build the object
// so follow the order in which it's used outside the class
// to order how to call the functions in the constructor
// hence, make private any methods not needed outside (that will be used by the constructor)
// have todo_text as a parameter to the constructor
// leave todo_body where it is as a property outside the constructor
class Todo {

    static classId = 0;

    // text, id, order
    todo_values = {
        text: "",
        id: 0,
        order: 0
    }
    constructor(text) {
        // update todo counter for every new ToDo created
        this.todo_values.id = Todo.classId;
        Todo.classId += 1;

        this.todo_text = text;

        this.todo_body = this.#createAndReturnSingleToDo();
        this.#setTextContentOfToDoTextElement(this.todo_text);
        this.#addDeleteEventListener();
    }

    #createElementWithClass(element, className) {
        let elemWithClass = document.createElement(element);
        elemWithClass.setAttribute("class", className);
        return elemWithClass;
    }

    // sets up the HTML Element that represents the ToDo that will be placed in the DOM
    #createAndReturnSingleToDo() {
        let elemWithClass = this.#createElementWithClass("div", "single-todo");
        elemWithClass.appendChild(this.#createElementWithClass("div", "todo-text"));
        elemWithClass.appendChild(this.#createElementWithClass("button", "delete-button")).textContent = "Delete";
        return elemWithClass;
    }

    get toDoBody() {
        return this.todo_body;
    }

    get toDoTextElement() {
        return this.toDoBody.querySelector(".todo-text");
    }

    get toDoDeleteBtnElement() {
        return this.toDoBody.querySelector(".delete-button");
    }

    #addDeleteEventListener() {

        // removes todo from local storage, as well as from the on screen list container
        this.toDoDeleteBtnElement.addEventListener('click', () => {

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
            this.toDoDeleteBtnElement.parentNode.remove();
        });
    }

    #setTextContentOfToDoTextElement(userTextContent) {
        this.toDoTextElement.textContent = userTextContent;
        this.todo_values.text = userTextContent;
    }
}

// run only if an array (list) was returned from localstorage and there is at least one todo in the array
if (Array.isArray(todoList) && (todoList.length > 0)) {
    todoList.forEach(element => {
        let temp_todo = new Todo(element.text);
        addSingleToDoToContainer(toDoListContainer, temp_todo.toDoBody);
    });
}