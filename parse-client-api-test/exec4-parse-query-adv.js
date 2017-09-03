/**********************************************
# Advanced Queries #

Using the classes Player and Team which should have been populated in your parse database in the Getting Started section, create queries which answer the following questions.

1 - How many players do NOT play in a team with a teamCode of either MCFC, SCFC or LFC? 
2 - Print out the names of the players who have a jersey number of less than 10 OR greater than 50?
3 - Print out the names the players who play in teams whos team name starts with Man and who's position is Keeper?

***********************************************/
Parse.initialize("appidCheng628");
Parse.serverURL = 'https://parser-server-app.herokuapp.com/parse';

// 1
var playerQ = new Parse.Query("Player");
playerQ.notContainedIn("teamCode", ["MCFC", "SCFC", "LFC"]);
playerQ.count().then(
    (resCount) => {
    console.log("Total of " + resCount + " players do NOT play in a team with a teamCode of either MCFC, SCFC or LFC");
},
(resCount, resErr) => {
    console.error("Failed: " + resErr);
}
);

// 2
var playerQA = new Parse.Query("Player");
playerQA.lessThan("jerseyNumber", 10);
var playerQB = new Parse.Query("Player");
playerQB.greaterThan("jerseyNumber", 50);
var compoundQuery = Parse.Query.or(playerQA, playerQB);

compoundQuery.find().then(
    (resListObj) => {
    console.log("These are the players who have a jersey number of less than 10 OR greater than 50");
resListObj.forEach((eachPlayer) => {
    console.log(eachPlayer.get("name"));
});
},
(resListObj, resErr) => {
    console.error("Failed: " + resErr);
}
);

// 3
// matchesKeyInQuery Approach:
var playerQ = new Parse.Query("Player");
playerQ.equalTo("position","Keeper");
var teamQ = new Parse.Query("Team");
teamQ.startsWith("name", "Man");

playerQ.matchesKeyInQuery("teamCode", "code", teamQ);
playerQ.find().then(
  (playerList) => {
    console.log("These are the names the players who play in teams whos team name starts with Man and who's position is Keeper");
    playerList.forEach((eachPlayer) => {
      console.log(eachPlayer.get("name"));
    });
  },
  (playerList, playerListErr) => {
    console.error("Failed: " + resErr); 
  }
);

// matchesQuery Approach:
var playerQ = new Parse.Query("Player");
var teamQ = new Parse.Query("Team");

teamQ.startsWith("name","Man");
playerQ.equalTo("position","Keeper");
playerQ.matchesQuery("team" , teamQ);

playerQ.find().then(
  (playerList) => {
    console.log("These are the names the players who play in teams whos team name starts with Man and who's position is Keeper");
          console.log(playerList);

    playerList.forEach((eachPlayer) => {
      console.log(eachPlayer.get("name"));
    });
  },
  (playerList, playerListErr) => {
    console.error("Failed: " + resErr); 
  }
);

