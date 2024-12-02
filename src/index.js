import * as $ from "jquery";

import { loadPage, signUserUp, signUserIn, } from "./model.js";
import { userRecipes, recipeButtonListeners } from "./model.js";

import { getAuth, signOut } from "firebase/auth"; 



const auth = getAuth(); 

const hamburgerMenu = document.querySelector(".hamburger-menu");

const nav = document.querySelector(".nav");

const loginLogoutBtn = $("#login");



hamburgerMenu.addEventListener("click", () => {
    nav.classList.toggle("active")
    // console.log(nav)
})


const changeRoute = () => {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace('#', '') || 'home'; 
    console.log("Current page ID:", pageID);  // Debug log

    
    loadPage(pageID);

    

    // console.log("Current pageID:", pageID); 
    switch (pageID){
        case 'home':
           
                $('.background-wrapper').css('background-image', 'linear-gradient(rgba(242, 92, 84, 0.6), rgba(242, 92, 84, 0.6)), url(../assests/hero.jpg)'); 
                $('.background-wrapper').css('background-color', 'rgba(242, 92, 84, 0.6)'); 
                break;

        case 'login':
            
            $('.background-wrapper').css({
                'background-image': 'none',
                'background-color': '#FFD972',  
                'min-height': '100%'
            });

            break;

        case 'browse':
            
            $('.background-wrapper').css('background-image', 'linear-gradient(rgba(167, 232, 189, 0.6), rgba(167, 232, 189, 0.6)), url(../assests/recipe-hero.jpg)');
            
            break;

        case 'yourRecipe':
            
            $('.background-wrapper').css('background-image', 'linear-gradient(rgba(167, 232, 189, 0.6), rgba(167, 232, 189, 0.6)), url(../assests/recipe-hero.jpg)');

            break;

        case 'create':
            const isLoggedIn = auth.currentUser;  
            
            if(!isLoggedIn) {
                loadPage('login')
            } else { 
                loadPage(pageId)
               
            }
            break;

        default:
            $('.background-wrapper').css('background-image', 'none');
            $('.background-wrapper').css('background-color', 'white');
            
            break;
        
    }

}

const initListeners = () => {
    console.log("Initializing listeners...");
    $("nav a").on("click", (e) => {
        e.preventDefault(); // Prevent default link behavior
        let id = e.currentTarget.id;
        // console.log("Navigating to:", id);
    
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

    
    
}

const loginForm = () => {
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
    
    $(document).on("click", '#login-submit', (e) => {
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





function updateLoginLogoutButton () {
    const isLoggedIn = auth.currentUser;  // Check if user is logged in

    if (isLoggedIn) {
        loginLogoutBtn.html("Logout");  
      
        const userRecipesLink = '<li class="nav-link" id="yourRecipe"><a href="#yourRecipe">Your Recipes</a></li>';
        // console.log("anchor clicked")
       
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
    // attachButtonListeners(); 
    
    loadPage("home");
   
    initListeners(); 

    console.log("dom is ready")
    loginForm();
    

    // Buttons for the recipe listener
    recipeButtonListeners();
    
    
    initURLListener();
    

  
});


