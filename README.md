https://in-info-web4.luddy.indianapolis.iu.edu/~joroper/advWebDev/cookNook/

To run my website, you need to run 


npm install firebase 

To run the app you can use the command 

npm serve


I had issues with a couple of things, they will be fixed soon.

This application is a website about cooking recipes. You can add, edit, create and delete recipes of your choosing but only after you log in! You can browse at recipes and see the home page while being logged out. But to get the premium stuff you have to create an account/login!

This application uses injection, mvc, dist and src folder structure with webpack as well. The application is run through the dist folder which contains my app.js, assests, css and scss, pages and index. While my js files are run in src. The src folder is where we develop and dynamically change things with javascript. For example, things are added to the page when a user logs in. That is what the src folder is for. The dist folder loads the compiled app.js file which reads the application and injects content onto the page!
