let inputItem = document.getElementById("todo-item");
let button = document.getElementById("btnAdd");
let ol = document.getElementById("todo-list");
let tbl = document.getElementById("todo-table");

let list_items = [];



window.onload = function (e) {

    list_items = JSON.parse(localStorage.getItem("todos"));

    for (let i = 0; i < list_items.length; i++) {

        let item = list_items[i];
        let itemIndex = (i + 1);
        let tr = document.createElement("tr");
        let tdIndex = document.createElement("td");
        let tdItem = document.createElement("td");
        let tdAction = document.createElement("td");

        tr.appendChild(tdIndex);
        tr.appendChild(tdItem);
        tr.appendChild(tdAction);
        tdIndex.appendChild(document.createTextNode(itemIndex));
        tdItem.appendChild(document.createTextNode(item));
        tbl.appendChild(tr);

    }

}






document.querySelector("#btnAdd").addEventListener("click", function (event) {
    event.preventDefault();

    if (!isBlank(inputItem.value)) {
        addItemToList(inputItem.value);

    } else {
        inputItem.style.borderColor = "red";
    }


}, false);


function addItemToList(itemToAdd) {
    let tr = document.createElement("tr");
    let tdIndex = document.createElement("td");
    let tdItem = document.createElement("td");
    let tdAction = document.createElement("td");
    let newIndex = (list_items.length + 1);

    tr.appendChild(tdIndex);
    tr.appendChild(tdItem);
    tr.appendChild(tdAction);
    tdIndex.appendChild(document.createTextNode(newIndex));
    tdItem.appendChild(document.createTextNode(itemToAdd));
    tbl.appendChild(tr);

    list_items.push(itemToAdd);

    localStorage.setItem("todos", JSON.stringify(list_items));
}

//Credit for the below function - thanks @Jano González
//https://stackoverflow.com/questions/154059/how-can-i-check-for-an-empty-undefined-null-string-in-javascript
function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}