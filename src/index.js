import * as $ from "jquery";

import { loadPage, signUserUp, signUserIn } from "./model.js";

const hamburgerMenu = document.querySelector(".hamburger-menu");

const nav = document.querySelector(".nav");

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
        $('.background-wrapper').css('background-image', 'url(../assests/hero.jpg)'); 
        $('.background-wrapper').css('background-color', 'rgba(242, 92, 84, 0.6)'); 
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
    $("#login-submit").on("click", (e) => {
        e.preventDefault(); 

        const email = $("#login-email").val();
        const password = $("#login-password").val();

        console.log("Signing in with:", email, password);
        signUserIn(email, password);
    });
}

function initURLListener() {
    
    $(window).on('hashchange', changeRoute);
    
    changeRoute();
}

$(document).ready(function () {
    loadPage("home");
    initListeners();
    initURLListener();
});
