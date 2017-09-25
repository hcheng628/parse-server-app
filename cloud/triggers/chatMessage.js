Parse.Cloud.beforeSave("ChatMessage", function(request, response) {
    if (!request.object.get("name") || request.object.get('content')) {
        response.error("Both username and content cannot be empty!");
    }
});