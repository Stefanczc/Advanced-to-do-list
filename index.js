const inputTitle = document.getElementById('inputTitle');
const inputDesc = document.getElementById('inputDesc');
const itemsList = document.getElementById('to-do-list');
const doneList = document.getElementById('done-list');
const addBtn = document.getElementById('addBtn');
const searchBtn = document.getElementById('searchBtn');
const inputSearch = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');

let counter = 1;


function addListItem() {
    const newItem = document.createElement('li');
    newItem.classList = 'align-list-items';

    if (inputTitle.value === '' || inputDesc.value === '') {
        return;
    }

    const containerText = document.createElement('div');

    const titleElem = document.createElement('h3');
    titleElem.textContent = inputTitle.value;

    const descElem = document.createElement('p');
    descElem.textContent = inputDesc.value;

    const cboxElem = document.createElement('input'); 
    cboxElem.type = 'checkbox';
    cboxElem.style.transform = 'scale(2)'; //add these styles to a class
    cboxElem.style.outline = 'none';
    cboxElem.style.cursor = 'pointer';

    const btnElem = document.createElement('img');
    btnElem.style.marginLeft = 'auto';   //add these styles to a class
    btnElem.src = 'new-trash.svg';      
    btnElem.style.width = '35px';
    btnElem.style.cursor = 'pointer';

    newItem.appendChild(cboxElem); 
    containerText.appendChild(titleElem);
    containerText.appendChild(descElem);
    newItem.appendChild(containerText);
    newItem.appendChild(btnElem); 

    if (itemsList.firstChild) {
        itemsList.insertBefore(newItem, itemsList.firstChild);
    } else {
        itemsList.appendChild(newItem);
    }

    cboxElem.addEventListener('click', function () {
        
        if (titleElem.style.textDecoration !== 'line-through') {          //add these styles to a class (maybe toggle class ?)
            if (doneList.firstChild) {
                doneList.insertBefore(newItem, doneList.firstChild);
            }
            else {
                doneList.appendChild(newItem);
            }
            newItem.style.backgroundColor = 'green';   
            titleElem.style.textDecoration = 'line-through';
            descElem.style.textDecoration = 'line-through';
        }
        else {
            if (itemsList.firstChild) {
                itemsList.insertBefore(newItem, itemsList.firstChild);
            }
            else {
                itemsList.appendChild(newItem);
            }
            newItem.style.backgroundColor = 'red';
            titleElem.style.textDecoration = 'none';
            descElem.style.textDecoration = 'none';
        }
    })

    btnElem.addEventListener('click', function () {
        if (newItem.parentNode === itemsList) {
            itemsList.removeChild(newItem);
        } else {
            doneList.removeChild(newItem);
        }
    });

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

searchBtn.addEventListener('click', searchItems);
addBtn.addEventListener('click', addListItem);