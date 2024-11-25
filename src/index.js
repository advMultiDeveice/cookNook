import * as $ from "jquery";

import { loadPage, signUserUp, signUserIn } from "./model.js";
import { getAuth, signOut } from "firebase/auth"; 

const auth = getAuth(); 

const hamburgerMenu = document.querySelector(".hamburger-menu");

const nav = document.querySelector(".nav");

const loginLogoutBtn = $("#login");

hamburgerMenu.addEventListener("click", () => {
    nav.classList.toggle("active")
    // console.log(nav)
})


function changeRoute() {
    let hashTag = window.location.hash;
    let pageID = hashTag.replace('#', '') || 'yourRecipe'; 
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
    $(document).ready(function() {
        $("#login-submit").on("click", (e) => {
            e.preventDefault(); 
            console.log("Login button clicked!");  // Log when the login button is clicked
        
            const email = $("#login-email").val();
            const password = $("#login-password").val();
        
            console.log("Signing in with:", email, password);
            signUserIn(email, password);
        });
    });


    $("#login-submit").on("click", function() {
        alert("Button clicked!");
    });





    loginLogoutBtn.on("click", () => {
        const isLoggedIn = auth.currentUser;  // Check if user is logged in

        if (isLoggedIn) {
            console.log("Logging out...");
            logoutUser();  // Log the user out
        } else {
            console.log("Redirecting to login...");
            window.location.hash = "#login";  
        }
    });

}

const updateLoginLogoutButton = () => {
    const isLoggedIn = auth.currentUser;  // Check if user is logged in

    if (isLoggedIn) {
        loginLogoutBtn.css("Logout");  
    } else {
        loginLogoutBtn.css("Login");  
    }
}

auth.onAuthStateChanged(user => {
    updateLoginLogoutButton();  // Update the button text based on auth state

    if (user) {
        
        window.location.hash = "#home";
        loadPage("home"); 
    }
});

const logoutUser = () => {
    signOut(auth)  // Use Firebase's signOut to log out the user
        .then(() => {
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
    
    initURLListener();
    updateLoginLogoutButton();  
});


