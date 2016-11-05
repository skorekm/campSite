var express 	= require("express");
var router  	= express.Router();
var Campground  = require("../models/campground");
var Comment 	= require("../models/comment");
var middleware  = require("../middleware");


router.get("/campgrounds/:id/comments/new",middleware.isLogged ,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground:campground});
		}
	})
});

router.post("/campgrounds/:id/comments",function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment,function(err,created){
				if(err){
					console.log(err);
					res.redirect("/campgrounds/"+ req.params.id +"/comments/new");
				}else{
					created.author.id = req.user._id;
					created.author.username = req.user.username;
					created.save();
					campground.comments.push(created);
					campground.save();
					req.flash("success","Successfully added comment !");
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}
	});
});
router.get("/campgrounds/:id/comments/:commentId/edit",middleware.userCommentOwnership,function(req,res){
	Comment.findById(req.params.commentId,function(err,found){
		if(err){
			res.redirect("back");
			console.log(err);
		}else{
			res.render("comments/edit",{campground_id:req.params.id,comment:found});
		}
	})
});
router.put("/campgrounds/:id/comments/:commentId",middleware.userCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.commentId,req.body.comment,function(err,updated){
		if(err){
			console.log(err);
		}else{
			req.flash("success","Comment updated successfully");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
router.delete("/campgrounds/:id/comments/:commentId",middleware.userCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.commentId,function(err,removed){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			req.flash("success","Comment removed successfully");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});


module.exports = router;