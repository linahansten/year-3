// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiL7D1h3ZaoXdyoMXbgQ7b8RaUc6jdQ9g",
    authDomain: "pog22-8b683.firebaseapp.com",
    projectId: "pog22-8b683",
    storageBucket: "pog22-8b683.appspot.com",
    messagingSenderId: "793659510891",
    appId: "1:793659510891:web:2fd69d58c30ea247b7e12e",
    databaseURL: "https://chat-prog22-default-rtdb.europe-west1.firebasedatabase.app"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initializes Realtime Database and get a reference service
const db = getDatabase(app);

// create reference, where in the database we want to take info from
const chatRef = ref(db, '/chat');


// listens for database changes
onChildAdded(chatRef, function (data) {

    // create element and append to list element
    const message = document.createElement("li")
    message.innerText = new Date(data.key).toLocaleString("fi-FI") + ": " + data.val(); // copy message from input

    list.appendChild(message)

})

const input = document.querySelector("input");
const list = document.querySelector(".text")

input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {

        // create 'unique' id for message   
        const messageId = new Date().toUTCString()  // 27/10 9.52 message


        // send to database
        set(ref(db, "chat/" + messageId), input.value)


        // clear input
        input.value = "";
    }
})