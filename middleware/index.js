var Campground	= require("../models/campground");
var Comment		= require("../models/comment");

var middlewareObj = {};

middlewareObj.isLogged = function (req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Please log in first !");
	res.redirect("/login");
}

middlewareObj.userCommentOwnership = function (req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.commentId,function(err,found){
			if(err){
				res.redirect("back");
			}else{
				if(found.author.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");
				}
			}
		});
	}else{
		res.redirect("back");
	}
}


middlewareObj.userCampgroundOwnership = function (req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,found){
			if(err){
				req.flash("error","Campground not found");
				res.redirect("/campgrounds");
			}else{
				if(found.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","You are not allowed to do that.");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error","Please log in first !");
		res.redirect("back");
	}
}

module.exports = middlewareObj;