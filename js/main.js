//Get elements from index page 
let inputItem = document.getElementById("todo-item");
let btnAddItem = document.getElementById("btnAdd");
//let ol = document.getElementById("todo-list");
let tbl = document.getElementById("todo-table");

//Initializing empty array for storing table data
let list_items = [];

//functionality to execute on windows loading
window.onload = function (e) {

    //load to do items from localStorage into array
    list_items = JSON.parse(localStorage.getItem("todos"));

    //iterate through array
    for (let i = 0; i < list_items.length; i++) {

        //build table dynamically and populate table data with array items
        let item = list_items[i];
        let itemIndex = (i + 1);
        let tr = document.createElement("tr");
        let tdIndex = document.createElement("td");
        let tdItem = document.createElement("td");
        let tdAction = document.createElement("td");

        //Build delete button
        let btnDelete = document.createElement('input');
        btnDelete.type = "button";
        btnDelete.className = "btnAction";
        btnDelete.value = "🛑";
        btnDelete.alt = "Delete item";

        //Delete item button logic
        btnDelete.onclick = function (e) {
            tbl.removeChild(tbl.childNodes[i + 2]);
            list_items.pop(i);
            localStorage.setItem("todos", JSON.stringify(list_items));

        }

        //Prioritize item button logic
        let btnUpItem = document.createElement('input');
        btnUpItem.type = "button";
        btnUpItem.className = "btnAction";
        btnUpItem.value = "⬆️";
        btnUpItem.alt = "Up";

        btnUpItem.onclick = function (e) {
            if (list_items.length > 1) {
                if (i > 0) {
                    //get current and previous items
                    let currentItem = list_items[i];
                    let previousItem = list_items[i - 1];
                    //switch their places in the array
                    list_items[i] = previousItem;
                    list_items[i - 1] = currentItem;
                    //get data from their tables
                    let previousItemIndex = tbl.rows[i].cells[0].innerHTML;
                    let currentItemIndex = tbl.rows[i + 1].cells[0].innerHTML;
                    //update their positions in the table
                    console.log("Current item index: " + i);
                    console.log(previousItemIndex);
                    console.log(currentItemIndex);
                    //update table data
                    tbl.rows[i].cells[1].innerHTML = currentItem;
                    tbl.rows[i + 1].cells[1].innerHTML = previousItem;
                    //save the data in the local storage
                    localStorage.setItem("todos", JSON.stringify(list_items));

                } else {
                    alert("Item is already in the first position.");
                }
            } else {
                alert("There is only one item in the list.");
            }

        }
        //De-prioritize item button logic
        let btnDownItem = document.createElement('input');
        btnDownItem.type = "button";
        btnDownItem.className = "btnAction";
        btnDownItem.value = "⬇️";
        btnDownItem.alt = "Down";
        btnDownItem.onclick = function (e) {
            if (list_items.length > 1) {
                if (i + 1 < list_items.length) {
                    //get current and previous items
                    let currentItem = list_items[i];
                    let nextItem = list_items[i + 1];
                    //switch their places in the array
                    list_items[i] = nextItem;
                    list_items[i + 1] = currentItem;
                    //get data from their tables
                    let currentItemIndex = tbl.rows[i + 1].cells[0].innerHTML;
                    let nextItemIndex = tbl.rows[i + 2].cells[0].innerHTML;
                    //update their positions in the table
                    console.log("Item " + currentItem + " and index " + currentItemIndex + " . Array index is " + i);
                    console.log("Item " + nextItem + " and index " + nextItemIndex + ". Array index is " + (i + 1));
                    //update table data
                    tbl.rows[i + 1].cells[1].innerHTML = nextItem;
                    tbl.rows[i + 2].cells[1].innerHTML = currentItem;
                    //save the data in the local storage
                    localStorage.setItem("todos", JSON.stringify(list_items));

                } else {
                    alert("Item is already in the last position.");
                }
            } else {
                alert("There is only one item in the list.");
            }
        }

        //Append table data to table row
        tr.appendChild(tdIndex);
        tr.appendChild(tdItem);
        tr.appendChild(tdAction);
        //append data to table data
        tdIndex.appendChild(document.createTextNode(itemIndex));
        tdItem.appendChild(document.createTextNode(item));
        //append action buttons to table data
        tdAction.appendChild(btnDelete);
        tdAction.appendChild(btnUpItem);
        tdAction.appendChild(btnDownItem);
        //append table row to table
        tbl.appendChild(tr);

    }
}

document.querySelector("#btnAdd").addEventListener("click", function (event) {
    //prevent page from reloading when "add" button is pressed
    event.preventDefault();

    //Check if the input is blank
    if (!isBlank(inputItem.value)) {
        addItemToList(inputItem.value);
    } else {
        //placeholder styling
        inputItem.style.borderColor = "red";
    }

}, false);


function addItemToList(itemToAdd) {
    //build table row
    let tr = document.createElement("tr");
    let tdIndex = document.createElement("td");
    let tdItem = document.createElement("td");
    let tdAction = document.createElement("td");
    let newIndex = (list_items.length + 1);
    //append table data to table row
    tr.appendChild(tdIndex);
    tr.appendChild(tdItem);
    tr.appendChild(tdAction);
    //append data to table data
    tdIndex.appendChild(document.createTextNode(newIndex));
    tdItem.appendChild(document.createTextNode(itemToAdd));
    //create delete button
    let btnDelete = document.createElement('input');
    //Delete item button logic
    btnDelete.onclick = function (e) {
        tbl.removeChild(tbl.childNodes[newIndex + 1]);
        list_items.pop(newIndex);
        localStorage.setItem("todos", JSON.stringify(list_items));
    }
    //functionality for these two buttons to follow
    let btnUp = document.createElement('input');
    let btnDown = document.createElement('input');
    //add properties to the action buttons
    addActionButtons(btnDelete, btnUp, btnDown);
    //Up/Down functionality
    btnUp.onclick = function (e) {
        if (list_items.length > 1) {
            if (newIndex - 1 > 0) {
                //establish "i" value of new item
                let i = newIndex - 1;
                //get current and previous items
                let currentItem = list_items[i];
                let previousItem = list_items[i - 1];
                //switch their places in the array
                list_items[i] = previousItem;
                list_items[i - 1] = currentItem;
                //get data from their tables
                let previousItemIndex = tbl.rows[i].cells[0].innerHTML;
                let currentItemIndex = tbl.rows[i + 1].cells[0].innerHTML;
                //update their positions in the table
                console.log("Current item index: " + i);
                console.log(previousItemIndex);
                console.log(currentItemIndex);
                //update table data
                tbl.rows[i].cells[1].innerHTML = currentItem;
                tbl.rows[i + 1].cells[1].innerHTML = previousItem;
                //save the data in the local storage
                localStorage.setItem("todos", JSON.stringify(list_items));

            } else {
                alert("Item is already in the first position.");
            }
        } else {
            alert("There is only one item in the list.");
        }
    }

    btnDownItem.onclick = function (e) {
        if (list_items.length > 1) {
            if (newIndex < list_items.length) {
                //establish "i" value of new item
                let i = newIndex - 1;
                //get current and previous items
                let currentItem = list_items[i];
                let nextItem = list_items[i + 1];
                //switch their places in the array
                list_items[i] = nextItem;
                list_items[i + 1] = currentItem;
                //get data from their tables
                let currentItemIndex = tbl.rows[i + 1].cells[0].innerHTML;
                let nextItemIndex = tbl.rows[i + 2].cells[0].innerHTML;
                //update their positions in the table
                console.log("Item " + currentItem + " and index " + currentItemIndex + " . Array index is " + i);
                console.log("Item " + nextItem + " and index " + nextItemIndex + ". Array index is " + (i + 1));
                //update table data
                tbl.rows[i + 1].cells[1].innerHTML = nextItem;
                tbl.rows[i + 2].cells[1].innerHTML = currentItem;
                //save the data in the local storage
                localStorage.setItem("todos", JSON.stringify(list_items));

            } else {
                alert("Item is already in the last position.");
            }
        } else {
            alert("There is only one item in the list.");
        }
    }

    //append action buttons to table data
    tdAction.appendChild(btnDelete);
    tdAction.appendChild(btnUp);
    tdAction.appendChild(btnDown);
    //append table row to table
    tbl.appendChild(tr);
    //add todo item to the array of todo items
    list_items.push(itemToAdd);
    //save the array in the local storage
    localStorage.setItem("todos", JSON.stringify(list_items));
}

//Credit for the below function - thanks @Jano González
//https://stackoverflow.com/questions/154059/how-can-i-check-for-an-empty-undefined-null-string-in-javascript
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function addActionButtons(btnDelete, btnUp, btnDown) {
    //Build delete button
    //btnTemp = document.createElement('input');
    btnDelete.type = "button";
    btnDelete.className = "btnAction";
    btnDelete.value = "🛑";
    btnDelete.alt = "Delete item";
    //Prioritize item button logic
    //btnUpItem = document.createElement('input');
    btnUp.type = "button";
    btnUp.className = "btnAction";
    btnUp.value = "⬆️";
    btnUp.alt = "Priority up";
    //De-prioritize item button logic
    //let btnDownItem = document.createElement('input');
    btnDown.type = "button";
    btnDown.className = "btnAction";
    btnDown.value = "⬇️";
    btnDown.alt = "Priority down";
}