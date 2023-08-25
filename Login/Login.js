
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getDatabase,  ref, update } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";
import { getAuth,  signInWithEmailAndPassword, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCWohLKTm_5YNPY5sRrXk7Elc9H-UVTAOc",
    authDomain: "authentication-bc2b0.firebaseapp.com",
    databaseURL: "https://authentication-bc2b0-default-rtdb.firebaseio.com",
    projectId: "authentication-bc2b0",
    storageBucket: "authentication-bc2b0.appspot.com",
    messagingSenderId: "739802415032",
    appId: "1:739802415032:web:f53f1d7869be6bb2e7594d",
    measurementId: "G-MBVXC2M2LJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


let login = document.querySelector("#login")

login.addEventListener("click", (e) => {
    var email = document.querySelector("#email").value
    var password = document.querySelector("#password").value

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            const dt = new Date()
            update(ref(database, 'user/' + user.uid), {
                last_login: dt,
            })

            window.location.replace("../home/index.html")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)

        });

})


const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});


// let logout = document.querySelector("#logout")
// logout.addEventListener("click", (e) => {

//     signOut(auth).then(() => {
//         // Sign-out successful.
//         alert("user Logout")
//     }).catch((error) => {
//         // An error happened.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         alert(errorMessage)
//     })
// })