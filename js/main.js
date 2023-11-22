document.addEventListener("DOMContentLoaded", () => {
    main();
});

function main() {
    let toDoListContainer = document.getElementsByClassName("todo-container")[0];
    let addToDoBtn = document.getElementsByClassName("add-todo-btn")[0];
    let deleteBtnList = document.getElementsByClassName("delete-button");
    let delBtnClickFunctionApplied = false; // flag to check which delete buttons have eventListener

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

        for (let delBtnIdx = 0; delBtnIdx < deleteBtnList.length; delBtnIdx++) {

            // TODO: create linked list to track when buttons are deleted
            // may need to have a linked list of sorts for the list that will track which buttons
            // have event listeners attached to them, because if a button gets deleted in the middle 
            // of the list, it can simply be removed 

            // only add an event listener to the buttons that do not have one on it already which 
            // will be determined by a flag (true/false indicator) for each button 
            deleteBtnList[delBtnIdx].addEventListener('click', () => {
                console.log(`Delete button index: ${delBtnIdx}`);


                // 1. first, grab the id of that specific button
                // 2. convert the id to a  number
                // 3. use the id of the delete button to determine the todo (the delete button's parent) to delete
                // to reassign id numbers to make sure each consecutive todo is numbered properly (in case 
                // the todo was not deleted from the end) by cycling through the list and either
                // just setAttribute ("id", new_id_val) if that will allow the old value to be replaced
                // or remove the id attribute, then reassign it with the new value 
            });
        }
    });

}