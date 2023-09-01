const inputTitle = document.getElementById('inputTitle');
const inputDesc = document.getElementById('inputDesc');
const toDoList = document.getElementById('to-do-list');
const doneList = document.getElementById('done-list');
const addBtn = document.getElementById('addBtn');
const searchBtn = document.getElementById('searchBtn');
const inputSearch = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const todoItems = [];
const doneItems = [];
let counter = 1;

function addListItem(title, desc, isDone) { //parameters included so that after I get the items from local storage I know which elements go where
    const newItem = document.createElement('li');
    newItem.classList = 'align-list-items';
    const containerText = document.createElement('div');
    const titleElem = document.createElement('h3');
    titleElem.textContent = title;
    titleElem.classList.add('custom__title');
    const descElem = document.createElement('p');
    descElem.textContent = desc;
    descElem.classList.add('custom__items');
    const cboxElem = document.createElement('input'); 
    cboxElem.type = 'checkbox';
    cboxElem.classList.add('custom__checkbox');
    const removeElem = document.createElement('img');
    removeElem.src = 'new-trash.svg'; 
    removeElem.classList.add('custom__img');
   
    removeElem.addEventListener('click', function () { // find element based on the title and remove from the correct list
        const index = todoItems.findIndex(item => item.title === titleElem.textContent);
        const indexDone = doneItems.findIndex(item => item.title === titleElem.textContent);
    
        if (window.confirm('Are you sure you want to remove this task ?')) { // included prompt for confirmation
            if (newItem.parentNode === toDoList) {
                toDoList.removeChild(newItem);
                if (index !== -1) {
                    todoItems.splice(index, 1);
                }
            } else {
                doneList.removeChild(newItem);
                if (indexDone !== -1) {
                    doneItems.splice(index, 1);
                }
            }
            saveItemToLocalStorage();
        }
        else { // return if cancel is selected
            return;
        }
    });

    cboxElem.addEventListener('click', function () {
        const index = todoItems.findIndex(item => item.title === titleElem.textContent);
        const indexDone = doneItems.findIndex(item => item.title === titleElem.textContent);
    
        if (titleElem.style.textDecoration !== 'line-through') { // append child to the correct list
            if (doneList.firstChild) { // condition in order to add newItem as first list item
                doneList.insertBefore(newItem, doneList.firstChild);
            }
            else {
                doneList.appendChild(newItem);
            }
            newItem.style.backgroundColor = '#009E60';
            titleElem.style.textDecoration = 'line-through';
            descElem.style.textDecoration = 'line-through';
            doneItems.push({
                title: titleElem.textContent,
                desc: descElem.textContent
            });
            if (index !== -1) { // update prior list 
                todoItems.splice(index, 1);
            }
        }
        else {
            if (toDoList.firstChild) { // condition in order to add newItem as first list item
                toDoList.insertBefore(newItem, toDoList.firstChild);
            }
            else {
                toDoList.appendChild(newItem);
            }
            newItem.style.backgroundColor = '#cf352e';
            titleElem.style.textDecoration = 'none';
            descElem.style.textDecoration = 'none';
            todoItems.push({
                title: titleElem.textContent,
                desc: descElem.textContent
            });
            if (indexDone !== -1) { // update prior list
                doneItems.splice(indexDone, 1);
            }
        }
        saveItemToLocalStorage();
    });
    
    // appending children to li element
    newItem.appendChild(cboxElem); 
    containerText.appendChild(titleElem);
    containerText.appendChild(descElem);
    newItem.appendChild(containerText);
    newItem.appendChild(removeElem);

    if (isDone) { // condition in order to display in the correct list 
        if (doneList.firstChild) { // appending as it was before, same logic as on the cbox listener
            doneList.insertBefore(newItem, doneList.firstChild);
        } else {
            doneList.appendChild(newItem);
        }
        doneItems.push({
            title: titleElem.textContent,
            desc: descElem.textContent
        })
        newItem.style.backgroundColor = '#009E60';   
        titleElem.style.textDecoration = 'line-through';
        descElem.style.textDecoration = 'line-through';
        cboxElem.checked = 'true'; // included this because it was not saved elsewhere
    }
    else {
        if (toDoList.firstChild) { // appending as it was before, same logic as on the cbox listener
            toDoList.insertBefore(newItem, toDoList.firstChild);
        } else {
            toDoList.appendChild(newItem);
        }
        todoItems.push({
            title: titleElem.textContent,
            desc: descElem.textContent
        });
    }
    inputTitle.value = '';
    inputDesc.value = '';
    counter++;
}

function searchItems() {
    const searchText = inputSearch.value.toLowerCase(); // created variable so that it can be compared to the text content of the li children (title + desc) 
    const combinedLists = Array.from(toDoList.children).concat(Array.from(doneList.children)); // created 2 arrays from the existing ul lists and combined these 2 together

    combinedLists.forEach(item => { // iterated through the new combined list in order to get the text content
        const title = item.querySelector('h3').textContent.toLowerCase();
        const desc = item.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchText) || desc.includes(searchText)) { // if either texts from title or description includes the searched text then display the li
            item.style.display = 'flex';
        } else {
            item.style.display = 'none'; 
        }

        clearBtn.addEventListener('click', () => { // included clear button listener here because it seemed that it belongs to the same search flow
            inputSearch.value = '';
            item.style.display = 'flex';
        });
    });
}

function saveItemToLocalStorage() { // saved the arrays to the local storage
    localStorage.setItem('todoItems', JSON.stringify(todoItems)); 
    localStorage.setItem('doneItems', JSON.stringify(doneItems));
}

function getItemFromLocalStorage() { // parsed the arrrays saved to local storage
    const storedTodoItems = localStorage.getItem('todoItems');
    if (storedTodoItems) {
        const parsedTodoItems = JSON.parse(storedTodoItems);
        parsedTodoItems.forEach(item => { // iterated through the parsed items 
            addListItem(item.title, item.desc, false);
            // called the 'addListItem' function with the required parameters (title, description and boolean so it gets added to the 'To Do' list)
        });
    }

    const storedDoneItems = localStorage.getItem('doneItems');
    if (storedDoneItems) {
        const parsedDoneItems = JSON.parse(storedDoneItems);
        parsedDoneItems.forEach(item => { // iterated through the parsed items
            addListItem(item.title, item.desc, true);
            // called the 'addListItem' function with the required parameters (title, description and boolean so it gets added to the 'Done' list)
        });
    }
}

//global listeners
searchBtn.addEventListener('click', searchItems); // calls the function
addBtn.addEventListener('click', () => { // included alerts 
    if (inputTitle.value === '' && inputDesc.value === '') {
        alert("What are you doing, sir ?");
        return;
    }
    if (inputTitle.value === '') {
        alert('Add a title, sir!');
        return;
    }
    if (inputDesc.value === '') {
        alert('Add a description, sir!');
        return;
    }  
    addListItem(inputTitle.value, inputDesc.value); // initial call with text content from title and description fields
    saveItemToLocalStorage();
});
window.addEventListener('load', () => { // required for local storage when page loads
    getItemFromLocalStorage();
});