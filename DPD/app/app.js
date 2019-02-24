/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/
const application = require("application");
const backendService = require("~/services/backend-service");
const usersService = require("~/services/user-service");

backendService.setup();

application.start({ moduleName: usersService.currentUser() ? "home/home-page" : "login/login-page" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
