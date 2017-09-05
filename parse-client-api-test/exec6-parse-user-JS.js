/**********************************************
 Flesh out the functions signUp, login and logout below and implement the associated parse user registrations, login and logout features.
 NOTE: To show the forms needed to trigger this code make sure you cick the "output" tab above and then press "run with js" button in the output pane that's shown.
 ***********************************************/
Parse.initialize("appidCheng628");
Parse.serverURL = 'https://parse-server-cheng.herokuapp.com/parse';

function signUp(data) {
    console.log("SignUp called", data);
    var newUser = new Parse.User();
    newUser.set("username", data.email);
    newUser.set("password", data.password);
    newUser.set("email", data.email);
    newUser.signUp().then(
        (success) => {
            console.log("Success signUp: " + JSON.stringify(success, null, 2));
        },
        (error) => {
            console.error("Failed signUp: " + JSON.stringify(error, null, 2));
        }
    );
};

function login(data) {
    console.log("Login called", data);
    Parse.User.logIn(data.email, data.password).then(
        (success) => {
            console.log("Success logIn: " + JSON.stringify(success, null, 2));
        },
        (error) => {
            console.error("Failed logIn: " + JSON.stringify(error, null, 2));
        }
    );
};

function logout() {
    console.log("Logout called");
    if(Parse.User.current()){
        Parse.User.logOut().then(
            (success) => {
                console.log("Success logOut: " + JSON.stringify(success, null, 2));
            },
            (error) => {
                console.error("Failed logOut: " + JSON.stringify(error, null, 2));
            }
        );
    }
};

$(document).ready(function() {
    // SignUp Form
    var signupForm = $("#signup-form");
    signupForm.submit(function(e) {
        e.preventDefault();
        var data = {};
        signupForm.serializeArray().map(function(x){data[x.name] = x.value;});
        signUp(data);
    });

    // Login Form
    var loginForm = $("#login-form");
    loginForm.submit(function(e) {
        e.preventDefault();
        var data = {};
        loginForm.serializeArray().map(function(x){data[x.name] = x.value;});
        login(data);
    });

    // Logout Button
    var logoutBtn = $("#logout-btn");
    logoutBtn.click(function(e) {
        e.preventDefault();
        logout();
    });

});