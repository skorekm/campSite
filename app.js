var express			= require("express"),
	app 			= express(),
	parser 			= require("body-parser"),
	mongoose 		= require("mongoose"),
	Campground  	= require("./models/campground"),
	Comment 		= require("./models/comment"),
	seedDB      	= require("./seeds.js"),
	passport		= require("passport"),
	LocalStrategy 	= require("passport-local"),
	User			= require("./models/user"),
	methodOverride  = require("method-override"),
	flash			= require("connect-flash");

var campgroundRoutes   = require("./routes/campgrounds.js"),
	commentRoutes 	   = require("./routes/comments.js"),
	authRouthes		   = require("./routes/index.js");


//Setting up body parser
app.use(parser.urlencoded({extended: true}));
//View engine
app.set("view engine", "ejs");
//Connecting to the DB
mongoose.connect("mongodb://localhost/yelpCamp");
app.use(express.static(__dirname+"/public"));
//using method override for the forms actions
app.use(methodOverride("_method"));

//Setting up Passport
app.use(require("express-session")({
	secret:"This is my super secret now",
	resave: false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());
//Logic for navbar, checks if user is logged in
app.use(function(req,res,next){
	res.locals.currentUser 	= req.user;
	res.locals.success		= req.flash("success");
	res.locals.error		= req.flash("error");
	next();
});

//Seeding database
//seedDB();


/////////////////////////
//ROUTES//
////////////////////////
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authRouthes);


////////////////////////////////////
//Listening for server on port 3000
////////////////////////////////////
app.listen(3000, function(){
	console.log("server is up and running !");
});