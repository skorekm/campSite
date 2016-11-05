var express = require("express");
var router  = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");


router.get("/campgrounds",function(req,res){
	Campground.find({},function(err,campgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/campgrounds",{camps:campgrounds});
		}
	});
});

router.post("/campgrounds",middleware.isLogged, function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id:req.user._id,
		username:req.user.username
	};
	var newCamp = {name:name,image:image,desc:desc,author:author}
	Campground.create(newCamp, function(err,newCamp){
		if(err){
			console.log(err);
		}else{
			res.redirect("campgrounds");
		}
	});
});

router.get("/campgrounds/new",middleware.isLogged ,function(req,res){
	res.render("campgrounds/newCamp");
});

router.get("/campgrounds/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,camp){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show",{campground:camp});
		}
	});
});
router.get("/campgrounds/:id/edit",middleware.userCampgroundOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			res.redirect("/");
		}else{
			res.render("campgrounds/edit",{campground:campground})
		}
	});
});
router.put("/campgrounds/:id",middleware.userCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updated){
		if(err){
			res.redirect("/");
		}else{
			console.log(updated);
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
router.delete("/campgrounds/:id",middleware.userCampgroundOwnership, function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err,removed){
		if(err){
			res.redirect("/campgrounds")
		}else{
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;