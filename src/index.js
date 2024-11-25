import * as $ from "jquery";

import { loadPage, signUserUp, signUserIn } from "./model.js";
import { getAuth, signOut } from "firebase/auth"; 

const auth = getAuth(); 

const hamburgerMenu = document.querySelector(".hamburger-menu");

const nav = document.querySelector(".nav");

const loginLogoutBtn = $("#login");


const userRecipes = [];

function addRecipeListeners(){
    $("#ingredBtn").on("click", function(){

    })
    $("#instructBtn").on("click", function(){
        
    })
    $("#subtmitBtn").on("click", function(){
        
    })
}


function removeRecipeListeners(){
    
    $("#submitBtn").off("click");
    $("#instructBtn").off("click");
    $("#ingredBtn").off("click");
}



hamburgerMenu.addEventListener("click", () => {
    nav.classList.toggle("active")
    // console.log(nav)
})


function changeRoute() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace('#', '') || 'home'; 
    console.log("Current page ID:", pageID);  // Debug log

    
    loadPage(pageID);

    console.log("Current pageID:", pageID); 
    
    if (pageID === 'home') {
        console.log("Changing to home background");
        $('.background-wrapper').css('background-image', 'linear-gradient(rgba(242, 92, 84, 0.6), rgba(242, 92, 84, 0.6)), url(../assests/hero.jpg)'); 
        // $('.background-wrapper').css('background-color', 'rgba(242, 92, 84, 0.6)'); 
        
    } else if (pageID === 'login') {
        console.log("Changing to login background");
        $('.background-wrapper').css({
            'background-image': 'none',
            'background-color': '#FFD972',  
            'min-height': '100%'
        });
        
    }  else if (pageID === 'browse') {
        console.log("Changing to browse background");
        $('.background-wrapper').css('background-image', 'linear-gradient(rgba(167, 232, 189, 0.6), rgba(167, 232, 189, 0.6)), url(../assests/recipe-hero.jpg)');

    }  else if (pageID === 'yourRecipe') {
        console.log("Changing to browse background");
        $('.background-wrapper').css('background-image', 'linear-gradient(rgba(167, 232, 189, 0.6), rgba(167, 232, 189, 0.6)), url(../assests/recipe-hero.jpg)');

    } else {
        console.log("Changing to default background");
        $('.background-wrapper').css('background-image', 'none');
        $('.background-wrapper').css('background-color', 'white');
    }
}

function initListeners() {
    console.log("Initializing listeners...");
    $("nav a").on("click", (e) => {
        e.preventDefault(); // Prevent default link behavior
        let id = e.currentTarget.id;
        console.log("Navigating to:", id);
    
        // Change the hash to the new page
        window.location.hash = `#${id}`;
    
        // Load the page content for the selected route
        loadPage(id);
        nav.classList.toggle("active");
    });

    // Close the navigation menu when clicking anywhere in the nav
    $("nav").on("click", (e) => {
        e.preventDefault();
        nav.classList.remove("active");
    });

    // Sign-up form logic
    $(document).on('click', '#signup-submit', (e) => {
        e.preventDefault();
    
        const firstName = $("#signup-fname").val();
        const lastName = $("#signup-lname").val();
        const email = $("#signup-email").val();
        const password = $("#signup-password").val();
    
        console.log("Signing up with:", firstName, lastName, email, password);
        signUserUp(firstName, lastName, email, password);
    });


    

    // Sign-In form logic
    
    $("#login-submit").on("click", (e) => {
        e.preventDefault(); 
        console.log("Login button clicked!");  // Log when the login button is clicked
    
        const email = $("#login-email").val();
        const password = $("#login-password").val();
    
        console.log("Signing in with:", email, password);
        signUserIn(email, password);
    });
 


    $("#login-submit").on("click", function() {
        alert("Button clicked!");
    });





    loginLogoutBtn.on("click", () => {
        const isLoggedIn = auth.currentUser;  
    
        if (isLoggedIn) {
            console.log("Logging out...");
            signOut(auth)  // Sign out the user
                .then(() => {
                    alert("User logged out");  
                    console.log("User logged out");
                    updateLoginLogoutButton();  
                })
                .catch((error) => {
                    console.error("Error logging out: ", error);
                });
        } else {
            console.log("Redirecting to login...");
            window.location.hash = "#login"; 
        }
    });
    
}


function recipeListener(){
    console.log("recipe Listener!!!")
    $("#ingredBtn").on("click", function () {
        
        console.log("Ingredient button clicked");
        // console.log($("#ingredBtn"))
        // let currentIngredCount = $(".ingreds input").length;
        // currentIngredCount++;
        // $(".ingreds").append(
        //     `<input type="text" id="ingred${currentIngredCount}" placeholder="ingredient ${currentIngredCount}">`
        // );
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
    
    $("#submitBtn").on("click", function () {
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
}


function updateLoginLogoutButton () {
    const isLoggedIn = auth.currentUser;  // Check if user is logged in

    if (isLoggedIn) {
        loginLogoutBtn.html("Logout");  
      
        const userRecipesLink = '<li class="nav-link" id="yourRecipe"><a href="#yourRecipe">Your Recipes</a></li>';
        console.log("anchor clicked")
       
        if (!$("#yourRecipe").length) { 
            $(".nav--ul__one").append(userRecipesLink);
            $("#yourRecipe").on("click", function (e) {
                e.preventDefault(); // Prevent default navigation behavior
                console.log("Navigating to Your Recipes...");  
                window.location.hash = "#yourRecipe"; // Update the hash
                changeRoute(); // Trigger the route change manually
            });
        }

    } else {
        loginLogoutBtn.html("Login");
        // Remove the "Your Recipes" link if user logs out
        $("#your-recipes-link").remove();
    }
};


auth.onAuthStateChanged(user => {
    updateLoginLogoutButton();  // Update the button text based on auth state

    if (user) {
        window.location.hash = "#home";
        loadPage("home"); 
    }
});

const logoutUser = () => {
    signOut(auth)  
        .then(() => {
            alert("user logged out");
            console.log("User logged out");
        })
        .catch((error) => {
            console.error("Error logging out: ", error);
        });
};





function initURLListener() {
   
    
    $(window).on('hashchange', changeRoute);
    
    changeRoute();
}

$(document).ready(function () {
    loadPage("home");
   
    initListeners(); 
    recipeListener()
    initURLListener();
    
    updateLoginLogoutButton();  
});


