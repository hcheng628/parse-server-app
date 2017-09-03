/**********************************************
 # Basic Queries #
 Using the classes Player and Team which should have been populated in your parse database in the Getting Started section, create queries which answer the following questions.
 1 - Who is the youngest player?
 2 - What has the largest jerseyNumber?
 3 - How many players who play in position "Keeper" also have a nationality of "Wales"?
 4 - What are the names of the 11th, 12th and 13th most expensive players?
 ***********************************************/
Parse.initialize("appidCheng628");
Parse.serverURL = 'https://parser-server-app.herokuapp.com/parse';

// 1
var player = new Parse.Query("Player");
player.descending("dateOfBirth");
player.first().then(playerObj => {
    console.log( "The Youngest Player: " + playerObj.get("name") + " with DOB: " + playerObj.get("dateOfBirth"));
}, (playerObj, playerErr) => {
    console.error("Failed: " + playerErr);
});


// 2
player = new Parse.Query("Player");
player.descending("jerseyNumber");
player.first().then(
    playerObj => {
    console.log( "Player: " + playerObj.get("name") + " has the largest Jersey Number: " + playerObj.get("jerseyNumber"));
},
(playerObj, playerErr) => {
    console.error("Failed: " + playerErr);
}
);

// 3
player = new Parse.Query("Player");
player.equalTo("position","Keeper");
player.equalTo("nationality","Wales");
player.count().then(
    totalCount => {
    console.log( totalCount + " players are playing Keeper position and comes from Wales.");
},
(playerErr) => {
    console.error("Failed: " + playerErr);
}
);

// 4
player = new Parse.Query("Player");
player.descending("marketValue");
player.skip(10);
player.limit(3);
player.find().then(
    playerList => {
    console.log("The 11th, 12th and 13th most expensive players:");
playerList.forEach((eachPlayer) => {
    console.log(eachPlayer.get("name") + " with " + eachPlayer.get("marketValue"));
});
},
(playerList, playListErr) => {
    console.error("Failed: " + playListErr);
}
);
