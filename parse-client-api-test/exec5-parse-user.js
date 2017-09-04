Parse.initialize("appidCheng628");
Parse.serverURL = 'https://parse-server-cheng.herokuapp.com/parse';

const userEmail = "chenghongyu628@gmail.com"; 
const userPassword = "abc123cba321";

var newUser = new Parse.User();

newUser.set("username", userEmail);
newUser.set("password", userPassword);
newUser.set("email",userEmail);

// newUser.signUp().then(
//   (success) => {
//     console.log("Success signUp: " + JSON.stringify(success, null, 2));
//   },
//   (error) => {
//     console.error("Failed signUp: " + JSON.stringify(error, null, 2));
//   }
// );

var currentUser = Parse.User.current();

if(currentUser){
  console.log("Logging Out Current User: " + JSON.stringify(currentUser, null, 2));
  Parse.User.logOut().then(
  (success) => {
    console.log("Success logOut: " + JSON.stringify(success, null, 2));
  },
  (error) => {
    console.error("Failed logOut: " + JSON.stringify(error, null, 2));
  }
  );
}else {
  Parse.User.logIn(userEmail, userPassword).then(
  (success) => {
    console.log("Success logIn: " + JSON.stringify(success, null, 2));
    Parse.User.requestPasswordReset(userEmail).then(
      (success) => {
        console.log("Success requestPasswordReset: " + JSON.stringify(success, null, 2));
      },
      (error) => {
        console.error("Failed requestPasswordReset: " + JSON.stringify(error, null, 2));
      }
    );
    
  },
  (error) => {
    console.error("Failed logIn: " + JSON.stringify(error, null, 2));
  }
  ); 
}

