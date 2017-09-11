/**********************************************
 Create a chat application!
 This chat application works but requires the user to refresh the page to load new messages.
 Flesh out the TODO sections below, use live queries to convert this app into a real-time chatting application.
 ***********************************************/
Parse.initialize("appidCheng628");
Parse.serverURL = 'https://parse-server-cheng.herokuapp.com/parse';

var MESSAGES = [];
var ChatMessage = Parse.Object.extend("ChatMessage");
var QUERY = new Parse.Query("ChatMessage");

function renderMessages() {
    // This renders the full list of messages to the screen
    var $messagesEl = $("#messages");
    $messagesEl.empty();
    for( var i = 0; i < MESSAGES.length; i++ ) {
        var message = MESSAGES[i];
        var name = message.get("name");
        var content = message.get("content");
        var ts = message.get("createdAt");
        var hours = ts.getHours();
        var minutes = ts.getMinutes();
        var seconds = ts.getSeconds();
        var time = hours + ":" + minutes + ":" + seconds;
        var msgEl = "<li style='margin-top 3px; margin-bottom: 3px;'> <button onclick='return deleteMessage(true, this)' value='" + message.id + "' class='btn btn-danger btn-xs delBtn'>Delete Msg</button> <i>(" + time + ")</i> <b>" + content + "</b> - @" + name + "</li>";
        $messagesEl.append(msgEl);
    }
}

function loadMessages(data) {
    QUERY.descending("createdAt");
    QUERY.find().then(function(results) {
        MESSAGES = results;
        renderMessages();
    });
}

function sendMessage(data) {
    // Save a chat message to parse and then render it on the screen
    var message = new ChatMessage();
    message.set("name", data.name);
    message.set("content", data.content);
    message.save().then(function(obj) {
        console.log("Message saved!");
    }, function(err) {
        alert(err.message);
    });
}

function addMessage(message) {
    console.log("Adding chat message the front of the messsages list");
    MESSAGES.unshift(message);
    renderMessages();
}

function deleteMessage(userClickFlag, message) {
  var delQuery = new Parse.Query("ChatMessage");
  
  var delMsgId = "";
  
  if(userClickFlag){
     delMsgId = $(message).val();
     delQuery.equalTo("objectId", $(message).val());
     delQuery.first().then(function(delMsg){
     delMsg.destroy().then(
        function (success) {
          console.log("Delete Success!" + success);
        },
        function (error) {
          console.log("Delete Fail!" + error);
        });
    });
  } else {
    delMsgId = message;
  }
  for(var i=0;i<MESSAGES.length;i++){
    if(MESSAGES[i].id == delMsgId){
      MESSAGES.splice(i,1);
    }
  }
    renderMessages();
}

function subscribeMessages() {
    console.log("Subscribing to new messages from parse");
    // TODO: Subscribe to the chat messages on the server with a live query and re-render the message list automatically.
    var subscription = QUERY.subscribe();

    subscription.on('create', function(newMsg) {
        console.log("subscription create: " + newMsg);
        addMessage(newMsg);
    });

    subscription.on('delete', function(msg){
        console.log("subscription delete: " + msg.id);
        deleteMessage(false, msg.id);
    });

}

function doPing() {
    // TODO: flesh this out AFTER watching the section on cloud code
}

$(document).ready(function() {

    // Load all the existing messages for this room
    loadMessages();

    // Listen for new messages
    subscribeMessages();

    // Handle when the user wants to send a message
    var chatForm = $("#chat-form");
    chatForm.submit(function(e) {

        e.preventDefault();
        var data = {};
        chatForm.serializeArray().map(function(x){data[x.name] = x.value;});
        sendMessage(data);
        $("#message").val("");
    });

    // Handle when the user wants to send a message
    $("#ping-btn").click(function(e) {
        e.preventDefault();
        doPing();
    });
});