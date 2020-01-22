# workoutTracker

# Homework 12: Markup for Code

## Directions:

Use ```node server.js``` to run the app in the console. It logs a link in the console: you can:
- ctrl + click or cmd + click the link in the console to open the program in your default browser, or
- open your favorite browser and navigate to the link provided in the console.

### Develop\config\middleware\isAuthenticated
This file is for restricting the routes a user is allowed to visit if they are not logged in. If they are logged in, they can continue their request to the restricted route. If the user is not logged in, they will be redirected to the login page.

### Develop\config\config.json
Datasets for development, test, and production with username, host, dialect, password, database parameters. It is currently pointing to the database locally stored on my machine, with no password required.

### Develop\config\passport.js
*Passport* is authentication middleware for *Node.js*. It allows a developer to enable functionality for logging in to a website. It is required on line 1 in this file to allow us to pass in both the db and *Sequelize* to help authenticate a user. The database itself is set as a requirement on line 4 from the  file path pointing to the **models** folder. On line 7 is the block *Passport* uses to build a constructor to form a query to the database looking for a user to authenticate. We are telling *Passport* that we want to be able to log in with a username and password. In this case, we are using an email address in lieu of a traditional user generated username. The function then runs to find the user with the specific email using the *Sequelize* findOne. ```findOne()``` translates to a ```SELECT``` statement with a ```WHERE``` condition specifying the user’s email account in the corresponding column. If there is no user with the email, it sends a message of “Incorrect email.” If there is a user with the given email but the password is incorrect, it will send the message “Incorrect password.” If none of the above, it returns the user. *Sequelize* needs to serialize and deserialize the user in order to keep the authentication state across http requests, so we implement this boilerplate code to allow for that. Lastly, *Passport* is exported.

### Develop\models\index.js
On line one, we declare the usage of ```strict``` mode, meaning that any bad sql syntax will throw an error. Global variables are assigned in order to require npm packages, ```basename``` returns the second portion of the path and files the extension (```module.filename```), and the ```config``` requires the ```config.json``` file. The ```process.env``` property returns an ```object``` containing the user environment or, in this case, development. We also have an empty object for our *Sequelize* methods to use for data storage.

Lines 11 to 15 are for the *Sequelize* ```constructor``` to determine how it builds out a user profile not authenticate when checking against a database. It will either use the parameters given over the web or use the ones hardcoded into the ```config``` file. In this case, since we are specifically looking only in the development dataset, it will only use those credentials. 

Lines 18 to 31 are utilizing the file system (```fs```) package to read through the ```config``` and use the *Sequelize* model to build an authentication query based on the parameters we gave it. We then loop through the object keys and take the property name of the object database. If the property on the database object has the ```associate``` property as a nested property, it then calls the ```associate``` function. 

### Develop\models\user.js
On line 2, we require the *Bcrypt* package. *Bcrypt* is used for password hashing. On line 4 we begin building  the ```user``` model, which is them imported into the ```passport.js``` file to create the sql query to the db. To do this, we first define the email datatype as a string that cannot be null and has to be unique. We then assign a sql datatype to the password field, which is also a string that cannot be null. 

A custom method is then created for use in the model - it checks if an unhashed password entered can be compared to the hashed password that is stored inside the database. Before a user is created, we automatically hash the password.



### Develop\public\js\login.js
In the ```document.ready()```, global variables are assigned in order to hook to the inputs on the page. When submitted, we first prevent default form functions and assign whatever was in the input to a variable. We then validate that what was inputted follows the rules of our model. If we have both an email and a password, we run a function to empty the form. 

The ```loginUser()``` function then posts to the ```api/login``` route and, if it is successful, redirects to the ```/members``` route while also running a catch for any errors.



### Develop\public\js\members.js
In the ```document.ready()```, we perform a ```GET``` request to the ```/api/user_data``` route  in order to figure out which user is logged in. It will then display that user in the ```span``` with the class ```member-name```



### Develop\public\js\signup.js
In the ```document.ready()```, local variables are assigned in order to hook to the ```input``` fields on the page.  When the sign up button is clicked, we first prevent any default form functions and validate the ```userData``` information (email and password), and if the information is accurate, the ```signUpUser()``` function is run, posting to the ```/api/signup``` route. If this runs successfully, the user is redirected to the ```/members``` route. If it is unsuccessful, we log errors and throw an ```alert```.



### Develop\routes\api-routes.js
This file is using ```express``` to define where our api routes are pointing to. On lines 2 and 3 we are requiring the usage of our database models and *Passport*. All of our routes are wrapped in an ```export``` so that we can use them anywhere else in the program. 

The first route uses *Passport* to authenticate against our local strategy. If the credentials are valid, we allow them to hit the ```/members``` route. If not, an error is caught using the code established in ```passport.js```.

The second route is for a user to enter credentials for the first time. It uses *Sequelize* to run the ```create()``` function in order to pass the info into the *Sequelize* constructor. if the credentials are ok, it redirects with a ```307``` to the ```/login route```. If not, the ```401``` error is thrown.

The third route is a simple route running when the user decides to leave the page and abandon their session. It redirects to the default ```/``` route. 

The fourth and final route is simply grabbing user info. We don't want to pass back anything except the users email address and id, sending a password, even if hashed, is bad practice and a potential security threat. If the user is not logged in, an empty object is sent to us.



### Develop\routes\html-routes.js
This file is using ```express``` to define where our html routes are pointing to. On lines 2 and 5 we require the ```path``` node module and the ```isAuthenticated``` module exported form our ```../middleware``` folder. All routes are exported for use anywhere in the program.

On the default ```/``` route, the user is prompted to login or signup. If they login with an existing account, they get to go to the ```/members``` route. If they do not, they can elect to signup, in which this case they are sent to the ```/signup``` route via the ```sendFile()```

For the ```/login``` route, lines 19 to 21 function identically to the default ```/``` route, just from a different page. It sends the information via the ```sendFile()``` in this ```/login``` route. 

In the last route, the ```/members``` route, if the user is authenticated using ```isAuthenticated```, they are sent the member's page to view. 



### Develop\public\stylesheets\style.css
This document applies ```margin-top: 50px``` to anything that is inside a ```form``` tag and has either ```signup``` or ```login``` as a class.

### Develop\public\login.html
Two stylesheets are linked (bootstrap and the style.css file). A nav bar and container are used to hold the forms for the log in, where there are form inputs for the user’s email address and password. There is a button for login and a sign up link. Jquery script is linked at the bottom of the page.

### Develop\public\members.html
This page has a logout link and also welcomes a member. Same stylesheets, nav bar, and jquery links as login page.

### Develop\public\signup.html
Html page for the sign up form. There are input forms for email and passwords, along with an error message. There is a submit button to sign up and also a link to the login page. Same stylesheets, nav bar, and jquery links as previous html pages.

### Develop\routes\package json
NPM packages needed to run the program.

### Develop\routes\server.js
First we require various NPM packages, *Passport*, the server’s ```PORT``` and the ```db``` and assign them to variables. This page also creates the ```express``` app and configures the middleware needed for the authentication, and uses sessions to keep track of the users login status. Routes to html and api are required and then the database is synced, and there is a message logging the user’s success.









