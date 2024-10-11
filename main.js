//Check that Javascript file is loaded
//console.log("script is loaded");

//Declare variables
let completedCount = 0;
let todoId = 1; //Not needed but nice to have=)
const todoArray = [];


//Declare HTML elements
const inputTodo = document.querySelector(".inputTodo");
const addBtn = document.querySelector(".addButton");
const todolist = document.querySelector("ul");
const infoText = document.querySelector(".infoText");
const countTodo = document.querySelector(".countTodo");


function changeStatus(text, status) {
    let changeindex = todoArray.map(t => t.name).indexOf(text);
    todoArray[changeindex].completed = status;
    //console.log(todoArray);
}

//Add a listener to the addButton
addBtn.addEventListener("click", addTodoItem);

//Add listener to the Enterkey
document.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {

        addTodoItem();
    }
});

// Function addTodoItem adds todoItem to todoArray
function addTodoItem() {

    const text = inputTodo.value;

    // Checks if input is empty
    if (text.length == 0) {
        infoText.classList.add("alert"); // Sets a class named alert to infotext
        infoText.innerText = "Input must not be empty";
        setTimeout(function() { //Set a timer that erase alertclass after 10 000 ms so the animation can reload
			infoText.classList.remove("alert");
		}, 5000);
        return;
    }
    else {
         // TODO CHECK IF ANY DUBLETTS
            infoText.innerText = "";
        }

        //Create todoItem and add text to ul
        const todoItem = document.createElement("li");
        todolist.appendChild(todoItem);

        const itemLabel = document.createElement("span");
        itemLabel.innerText = text;
        todoItem.appendChild(itemLabel);

        //Adds a HTML-tagg with trashcan
        const trashcan = document.createElement("span");
        trashcan.innerHTML = "&#128465";
        trashcan.setAttribute("class", "trashcan");
        todoItem.appendChild(trashcan);


        //Add listener to the todoItem
        itemLabel.addEventListener("click", function () {

            if (itemLabel.getAttribute("class") == "completed") {
                completedCount--;
                itemLabel.setAttribute("class", "");
                let todoText = itemLabel.firstChild.textContent;
                changeStatus(todoText, false);
            }
            else {
                completedCount++;
                itemLabel.setAttribute("class", "completed");
                let todoText = itemLabel.firstChild.textContent;
                changeStatus(todoText, true);
            }

            countTodo.innerText = `${completedCount} completed`;

        });

        // add listener to the trashcan
        //On click delete the clicked todoObject in Array and in DOM update competeCount
        trashcan.addEventListener("click", function () {
            todoArray.splice(todoArray.indexOf(todoObject), 1);
            todoItem.remove();
            if (itemLabel.getAttribute("class") == "completed") {
                completedCount--;
                countTodo.innerText = `${completedCount} completed`;
            }
        });


        //Add to object 
        const todoObject = {};// skapar nytt object varje gång
        todoObject.id = todoId;
        todoObject.name = text;
        todoObject.completed = false;
        todoArray.push(todoObject);

        //Set input empty
        todoId++;
        inputTodo.value = "";

    };