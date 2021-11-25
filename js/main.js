//Get elements from index page 
let inputItem = document.getElementById("todo-item");
let btnAddItem = document.getElementById("btnAdd");
//let ol = document.getElementById("todo-list");
let tbl = document.getElementById("todo-table");

//Initializing empty array for storing table data
let list_items = [];

//Toast message
var snackbarContainer = document.querySelector('#toast-message');

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
        tdItem.className = "mdl-typography--body-1 mdl-typography--text-uppercase mdl-typography--text-center tbl-word-wrap";
        let tdAction = document.createElement("td");

        //Build delete button
        let btnDelete = document.createElement('input');
        btnDelete.type = "button";
        btnDelete.className = "mdl-button mdl-js-button mdl-button--primary";
        btnDelete.value = "Delete";
        btnDelete.alt = "Delete item";

        /*
        //For some strange reason when I create "i" or "span" element with MDL icon class it does not show within the button inside
        //of TD element, but shows if I create it outside of the table.
        //Override of the color does not help.
        let iconAdd = document.createElement("i");
        iconAdd.className = "material-icons";
        iconAdd.innerHTML = "face";
        btnDelete.appendChild(iconAdd);
        */

        //Delete item button logic
        btnDelete.onclick = function (e) {
            tbl.removeChild(tbl.childNodes[i + 2]);
            list_items.pop(i);
            localStorage.setItem("todos", JSON.stringify(list_items));

        }

        //Prioritize item button logic
        let btnUpItem = document.createElement('input');
        btnUpItem.type = "button";
        btnUpItem.className = "mdl-button mdl-js-button mdl-button--accent";
        //btnUpItem.value = "Prioritize";
        btnUpItem.value = "Up";
        btnUpItem.alt = "Priority up";

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
                    //alert("Item is already in the first position.");

                    var data = { message: 'Item is already in the first position.' };
                    snackbarContainer.MaterialSnackbar.showSnackbar(data);
                }
            } else {
                //alert("There is only one item in the list.");
                var data = { message: 'There is only one item in the list.' };
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
            }

        }
        //De-prioritize item button logic
        let btnDownItem = document.createElement('input');
        btnDownItem.type = "button";
        btnDownItem.className = "mdl-button mdl-js-button mdl-button--accent";
        //btnDownItem.value = "De-prioritize";
        btnDownItem.value = "Down";
        btnDownItem.alt = "Priority down";
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
                    //alert("Item is already in the last position.");
                    var data = { message: 'Item is already in the last position.' };
                    snackbarContainer.MaterialSnackbar.showSnackbar(data);
                }
            } else {
                //alert("There is only one item in the list.");
                var data = { message: 'There is only one item in the list.' };
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
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
        inputItem.value = "";
    } else {
        var data = { message: 'Input value cannot be blank.' };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    }

}, false);


function addItemToList(itemToAdd) {
    //build table row
    let tr = document.createElement("tr");
    let tdIndex = document.createElement("td");
    let tdItem = document.createElement("td");
    tdItem.className = "mdl-typography--body-1 mdl-typography--text-uppercase mdl-typography--text-center tbl-word-wrap";
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
                var data = { message: 'Item is already in the first position.' };
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
            }
        } else {
            var data = { message: 'There is only one item in the list.' };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
        }
    }

    btnDown.onclick = function (e) {
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
                var data = { message: 'Item is already in the first position.' };
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
            }
        } else {
            var data = { message: 'There is only one item in the list.' };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);
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
    btnDelete.className = "mdl-button mdl-js-button mdl-button--primary";
    btnDelete.value = "Delete";
    //btnDelete.innerHTML = '<i class="material - icons">add</i>';
    btnDelete.alt = "Delete item";
    //Prioritize item button logic
    //btnUpItem = document.createElement('input');
    btnUp.type = "button";
    btnUp.className = "mdl-button mdl-js-button mdl-button--accent";
    //btnUp.value = "Prioritize";
    btnUp.value = "Up";
    btnUp.alt = "Priority up";
    //De-prioritize item button logic
    //let btnDownItem = document.createElement('input');
    btnDown.type = "button";
    btnDown.className = "mdl-button mdl-js-button mdl-button--accent";
    //btnDown.value = "De-prioritize";
    btnDown.value = "Down";
    btnDown.alt = "Priority down";


}