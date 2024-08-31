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
    /* console.log(todoList); */
    /* console.log(todo.todo_values); */
}

function addToDo() {

    let userInput = todoInput.value;
    //userInput = "Task"; // remove and uncomment code above to allow actual user input
    if (userInput !== null && userInput !== "") {
        createToDo(userInput);
        todoInput.value = "" // clear input area after todo's successful submission
    } else {
        alert("No ToDo entered!");
        console.log(userInput, typeof userInput);
    }
}

todoInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        addToDo();
    }
});
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
        /* console.log(`@ creating delete button: ${todoList}`); */
        this.getToDoDeleteBtnElement().addEventListener('click', () => {
            // this will also need code to remove the todo from local storage
            // find the index of current todo.todo_values
            // then remove it from the list
            let idx = todoList.findIndex(values => values.id === this.todo_values.id);

            if (idx !== -1) { // to make sure this does not run if an error occurs while getting the
                // id of the deleted element

                todoList.splice(idx, 1);

                // find all todos that come after the id of the deleted todo and update their ids
                todoList.forEach(element => {
                    if (element.id > idx) {
                        element.id = idx;
                        idx += 1;
                    }
                })
                // ensure a new todo's id immediately numerically follows the current last todo's id
                Todo.classId = idx;
            }

            localStorage.setItem('todos', JSON.stringify(todoList));

            this.getToDoDeleteBtnElement().parentNode.remove();
        });
    }

    setTextContentOfToDoTextElement(userTextContent) {
        this.getToDoTextElement().textContent = userTextContent;
        this.todo_values.text = userTextContent
    }

    addSingleToDoToContainer(tdlContainer, theSingleToDo) {
        tdlContainer.appendChild(theSingleToDo);
    }
}
// check if the todo list is empty
// if it is not empty, then cycle through each todo in the list and create it in the todo container
// given the todolist does not contain the object, but the todo values, todo objects will
//  have to be created in the loop

// run only if an array (list) was returned from localstorage and there is at least one todo in the array
if (Array.isArray(todoList) && (todoList.length > 0)) {
    todoList.forEach(element => {
        let temp_todo = new Todo();
        temp_todo.createAndReturnSingleToDo();
        temp_todo.setTextContentOfToDoTextElement(element.text);
        addSingleToDoToContainer(toDoListContainer, temp_todo.getToDoBody());
        //todoList.push(todo.todo_values); // don't need this since the list was already populated via localstorage
        temp_todo.addDeleteEventListener();
        console.log(temp_todo.classId);

        //localStorage.setItem('todos', JSON.stringify(todoList)); // don't need this since we pulled from localstorage already
    });
}
// when the delete button on a todo is clicked
// that todo should be removed from the todoList