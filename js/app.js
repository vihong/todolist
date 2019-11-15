// Select the Elements
const clearElement = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const listElement = document.getElementById('list');
const inputElement = document.getElementById('input');

// Class names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_TROUGH = 'lineThrough';

// Variables
let LIST, id;

// get item from localStorage
let data = localStorage.getItem('TODO');

//check if data is empty or not
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST); //load the list to the user interface
} else {
    LIST = [];
    id = 0;
}

function loadList(array) {
    array.forEach((item) => {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Show today's date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("fr-FR", options);


//--------------------------------      addToDo()    ------------------------------------------//
function addToDo(toDo, id, done, trash) {
    if (trash) { return; };

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_TROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
                `;
    const position = "beforeend";


    listElement.insertAdjacentHTML(position, item);
}
//-------------------------------------------------------------------------------------


// trigger addTodo() when pressing the Enter key
document.addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        const toDo = inputElement.value;

        //if the input isn't empty
        if (toDo) {
            addToDo(toDo);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            // add item to localStorage (this code must be added where LIST is updated)
            localStorage.setItem('TODO', JSON.stringify(LIST));
            id++;
        }
        inputElement.value = "";
    }
});

document.getElementById('plusIcon').addEventListener('click', (event) => {
    const toDo = inputElement.value;

    //if the input isn't empty
    if (toDo) {
        addToDo(toDo);

        LIST.push({
            name: toDo,
            id: id,
            done: false,
            trash: false
        });
        // add item to localStorage (this code must be added where LIST is updated)
        localStorage.setItem('TODO', JSON.stringify(LIST));
        id++;
    }
    inputElement.value = "";
});


//--------------------------------      completeToDo()    ------------------------------------------//
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_TROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
    localStorage.setItem('TODO', JSON.stringify(LIST));

}


//-------------------------------------------------------------------------------------


//--------------------------------      removeToDo()    ------------------------------------------//
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
    localStorage.setItem('TODO', JSON.stringify(LIST));

}


list.addEventListener('click', (event) => {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == 'complete') {
        completeToDo(element);
    }
    else if (elementJob == 'delete') {
        removeToDo(element);

    }
    // add item to localStorage (this code must be added where LIST is updated)
    localStorage.setItem('TODO', JSON.stringify(LIST));
});



// addToDo("task2");
// addToDo("task3");

// clear localStorage
clearElement.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

