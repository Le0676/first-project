import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shop-list-c1bdf-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemlistInDB = ref(database, "items")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const itemListEl = document.getElementById("items") // Reference to the <ul> element

addButtonEl.addEventListener("click", function() {
    event.preventDefault(); // Prevent default form submission behavior
    let inputValue = inputFieldEl.value


    if (inputValue !== "") {
        push(itemlistInDB, inputValue)

        clearInputFieldEl()

    }
})


onValue(itemlistInDB, function(snapshot) {
    itemListEl.innerHTML = ""; // Clear the list to prevent duplication

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];

            addItemToItemlistEl(currentItem);
        }
    } else {
        itemListEl.innerHTML = "Oops... Looks like your shopping list is empty!";
    }
});



function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function addItemToItemlistEl(item) {
   //itemListEl.innerHTML += `<li>${itemValue}</li>`

   let itemID = item[0]
   let itemValue = item[1]

   let newEL = document.createElement("li")

   newEL.textContent = itemValue

   newEL.addEventListener("dblclick", function() {

    let exactLocationofItemInDB = ref(database, `items/${itemID}`)

    remove(exactLocationofItemInDB)
   })

   itemListEl.append(newEL)
}