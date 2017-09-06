/**********************************************
1) Login with the username and password you created in the previous section.
2) Make the blog post created in function createBlogPostWithACL readable by everyone but only writable by you.
HINT: Use an ACL
3) Flesh out the ensureRoles function, create a role called "Admin" and make sure the currently logged in user has write access and is a member.
4) Make the blog post created in function createBlogPostWithRole readable by everyone but only writable by all Admins.
HINT: Use the role you created in the ensureRoles function
***********************************************/
Parse.initialize("appidCheng628");
Parse.serverURL = 'https://parse-server-cheng.herokuapp.com/parse';

function ensureRoles() {
	var promise = new Parse.Promise();
    var roleAcl = new Parse.ACL();
    roleAcl.setReadAccess(Parse.User.current(), true);
    roleAcl.setWriteAccess(Parse.User.current(), true);
    var adminRole = new Parse.Role("Admin", roleAcl);
    adminRole.save().then(
      success => {
        console.log("Admin Role Created!" + JSON.stringify(success, null, 2));
        adminRole.getUsers().add(Parse.User.current());
        adminRole.save().then(
          success => {
            console.log("Admin Role added User(s)" + JSON.stringify(adminRole, null, 2));
            promise.resolve();	
          }
        );
      },
      error => {
        console.error(error);
      }
    );
	return promise;
}

function createBlogPostWithACL() {
	var promise = new Parse.Promise();
	var BlogPost = Parse.Object.extend("BlogPost");
	var post = new BlogPost();
	post.set("cotent", "This is some content");
	post.set("published", true);
	var postAcl = new Parse.ACL();
    postAcl.setPublicReadAccess(true);
    postAcl.setWriteAccess(Parse.User.current(),true);
    post.setACL(postAcl);
	post.save().then(function() {
		console.log("Saved blog post with ACL " + post.id);
		promise.resolve();		
	});		
	return promise;
}

function createBlogPostWithRole() {
	var promise = new Parse.Promise();
	var BlogPost = Parse.Object.extend("BlogPost");
	var post = new BlogPost();
	post.set("cotent", "This is some content");
	post.set("published", true);
    var postAcl = new Parse.ACL();
    postAcl.setPublicReadAccess(true);
    postAcl.setRoleWriteAccess("Admin", true);
    post.setACL(postAcl);
	post.save().then(function() {
		console.log("Saved blog post with ACL " + post.id);
		promise.resolve();		
	});
	return promise;
}

Parse.User.logIn("chenghongyu628@gmail.com", "abc123cba321")
	.then(createBlogPostWithACL)
	.then(ensureRoles)
	.then(createBlogPostWithRole);