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
    const auth = getAuth();  // Get auth instance
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;  
            console.log("User signed in:", user);
            
            
            window.location.hash = "#home";  
            loadPage("home");  
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            alert(`Error: ${errorMessage}`);
        });
};



export const userRecipes = [];

export const recipeButtonListeners = () => {
    // Log when "createBtn" is clicked
    $("#createBtn").on("click", function () {
        console.log("Attach File button clicked");
    });

    // Log when "ingredBtn" is clicked
    $("#ingredBtn").on("click", function () {
        console.log("Ingredient button clicked");
    });

    $("#instructBtn").on("click", () => {
        console.log("Instruction button clicked");
        let currentInstructCount = $(".instructs input").length;
        currentInstructCount++;
        $(".instructs").append(
            `<input type="text" id="instruct${currentInstructCount}" placeholder="instruction ${currentInstructCount}">`
        );
        console.log("Instruction added");
    });

    $("#submitBtn").on("click", function() {
        let recipe = {
            recipeName: $("#recipeName").val(),
            recipeImage: $("#imageURL").val(),
            ingredients: [],
            instructions: [],
        };
    
        $(".ingreds input").each(function () {
            recipe.ingredients.push($(this).val());
        });
    
        $(".instructs input").each(function () {
            recipe.instructions.push($(this).val());
        });
    
        userRecipes.push(recipe);
        alert("Recipe submitted");
        $(".form input").val(""); // Reset all input fields
        console.log(userRecipes);
    });
            console.log("recipe listener?")

}
