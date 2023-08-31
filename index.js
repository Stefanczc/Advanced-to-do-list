const inputTitle = document.getElementById('inputTitle');
const inputDesc = document.getElementById('inputDesc');
const itemsList = document.getElementById('to-do-list');
const doneList = document.getElementById('done-list');
const addBtn = document.getElementById('addBtn');
const searchBtn = document.getElementById('searchBtn');
const inputSearch = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const todoItems = [];
const doneItems = [];
let counter = 1;

function addListItem(title, desc, isDone) {
    const newItem = document.createElement('li');
    newItem.classList = 'align-list-items';

    const containerText = document.createElement('div');
    const titleElem = document.createElement('h3');
    titleElem.textContent = title;
    titleElem.style.color = '#fff';
    const descElem = document.createElement('p');
    descElem.textContent = desc;
    descElem.style.color = '#fff';
    const cboxElem = document.createElement('input'); 
    cboxElem.type = 'checkbox';
    cboxElem.style.transform = 'scale(2)'; 
    cboxElem.style.outline = 'none';
    cboxElem.style.cursor = 'pointer';
    const btnElem = document.createElement('img');
    btnElem.style.marginLeft = 'auto';  
    btnElem.src = 'new-trash.svg';      
    btnElem.style.width = '35px';
    btnElem.style.cursor = 'pointer';

    btnElem.addEventListener('click', function () {
        const index = todoItems.findIndex(item => item.title === titleElem.textContent);
        const indexDone = doneItems.findIndex(item => item.title === titleElem.textContent);
    
        if (newItem.parentNode === itemsList) {
            itemsList.removeChild(newItem);
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
    });

    cboxElem.addEventListener('click', function () {
        const index = todoItems.findIndex(item => item.title === titleElem.textContent);
        const indexDone = doneItems.findIndex(item => item.title === titleElem.textContent);
    
        if (titleElem.style.textDecoration !== 'line-through') {
            newItem.classList.add('isDone');
            if (doneList.firstChild) {
                doneList.insertBefore(newItem, doneList.firstChild);
            }
            else {
                doneList.appendChild(newItem);
            }
            newItem.style.backgroundColor = 'green';
            titleElem.style.textDecoration = 'line-through';
            descElem.style.textDecoration = 'line-through';
            doneItems.push({
                title: titleElem.textContent,
                desc: descElem.textContent
            });
            if (index !== -1) {
                todoItems.splice(index, 1);
            }
        }
        else {
            newItem.classList.remove('isDone');
            if (itemsList.firstChild) {
                itemsList.insertBefore(newItem, itemsList.firstChild);
            }
            else {
                itemsList.appendChild(newItem);
            }
            newItem.style.backgroundColor = '#9F1111';
            titleElem.style.textDecoration = 'none';
            descElem.style.textDecoration = 'none';
            todoItems.push({
                title: titleElem.textContent,
                desc: descElem.textContent
            });
            if (indexDone !== -1) {
                doneItems.splice(indexDone, 1);
            }
          
        }
        saveItemToLocalStorage();
    
    });
    
    newItem.appendChild(cboxElem); 
    containerText.appendChild(titleElem);
    containerText.appendChild(descElem);
    newItem.appendChild(containerText);
    newItem.appendChild(btnElem);

    if (isDone) {
        if (doneList.firstChild) {
            doneList.insertBefore(newItem, doneList.firstChild);
        } else {
            doneList.appendChild(newItem);
        }
        doneItems.push({
            title: titleElem.textContent,
            desc: descElem.textContent
        })
        newItem.style.backgroundColor = 'green';   
        titleElem.style.textDecoration = 'line-through';
        descElem.style.textDecoration = 'line-through';
        cboxElem.checked = 'true';
    }
    else {
        if (itemsList.firstChild) {
            itemsList.insertBefore(newItem, itemsList.firstChild);
        } else {
            itemsList.appendChild(newItem);
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
    const searchText = inputSearch.value.toLowerCase(); 
    const combinedLists = Array.from(itemsList.children).concat(Array.from(doneList.children));

    combinedLists.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        const desc = item.querySelector('p').textContent.toLowerCase();

        if (title.includes(searchText) || desc.includes(searchText)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none'; 
        }

        clearBtn.addEventListener('click', () => {
            inputSearch.value = '';
            item.style.display = 'flex';
        });
    });
}

function saveItemToLocalStorage() {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    localStorage.setItem('doneItems', JSON.stringify(doneItems));
}

function getItemFromLocalStorage() {
    const storedTodoItems = localStorage.getItem('todoItems');
    if (storedTodoItems) {
        const parsedTodoItems = JSON.parse(storedTodoItems);
        parsedTodoItems.forEach(item => {
            addListItem(item.title, item.desc, false);
        });
    }

    const storedDoneItems = localStorage.getItem('doneItems');
    if (storedDoneItems) {
        const parsedDoneItems = JSON.parse(storedDoneItems);
        parsedDoneItems.forEach(item => {
            addListItem(item.title, item.desc, true);
        });
    }
}


searchBtn.addEventListener('click', searchItems);

addBtn.addEventListener('click', () => {
    if (inputTitle.value === '' || inputDesc.value === '') {
        return;
    }
    addListItem(inputTitle.value, inputDesc.value);
    saveItemToLocalStorage();
});

window.addEventListener('load', () => {
    getItemFromLocalStorage();
});