import * as $ from "jquery";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";

import {app} from "./firebaseConfig"

const auth = getAuth(app)

export const loadPage = (pageID) => {
    $.get(`pages/${pageID}.html`, (data) => {
        $('#app').html(data); 
    }).fail(() => {
        console.error(`Failed to load page: ${pageID}`);
    });
};


// Sign-up function
export const signUserUp = (firstName, lastName, email, password) => {
    console.log("Attempting to sign up:", firstName, lastName, email, password);

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => { 
            alert("Sign-up successful!");
            window.location.hash = "#home"; 
        })
        .catch((error) => {
            console.error("Sign-up error:", error.message);
            alert(`Error:` + error);
        });
};

// Sign-in function
export const signUserIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("User signed in:", user);
            window.location.hash = "#home";  
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            alert(`Error: ${errorMessage}`);
        });
};



