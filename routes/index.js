var express 	= require("express");
var router  	= express.Router();
var passport	= require("passport");
var User 		= require("../models/user");

router.get("/",function(req,res){
	res.render("index");
});


router.get("/register",function(req,res){
	res.render("register");
});

//register
router.post("/register",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req,res, function(){
			req.flash("success","Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

//login
// show login form
router.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
    }), function(req, res){
});
//logout
router.get("/logout",function(req,res){
	req.flash("success","You are logged out !");
	req.logout();
	res.redirect("/");
});

module.exports = router;