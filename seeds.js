var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data = [{
		name:"Post1",
		image:"https://hd.unsplash.com/photo-1445308394109-4ec2920981b1",
		desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse"
	},
	{
		name:"Post2",
		image:"https://hd.unsplash.com/photo-1445308394109-4ec2920981b1",
		desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse"
	},

	{	
		name:"Post3",
		image:"https://hd.unsplash.com/photo-1445308394109-4ec2920981b1",
		desc:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat. Duis aute irure dolor in reprehenderit in voluptate velit esse"
	}
];

function seedDB(){
	Campground.remove({},function(err,removed){
		// if(err){
		// 	console.log(err);
		// }else{
		// 	console.log("Campgrounds have been removed");
		// 	data.forEach(function(camp){
		// 		Campground.create(camp,function(err,camp){
		// 			if(err){
		// 				console.log(err);
		// 			}else{
		// 				console.log(camp);
		// 				Comment.create({
		// 					text:"I wish there would be an internet",
		// 					author:"Homer"
		// 				},function(err,created){
		// 					if(err){
		// 						console.log(err);
		// 					}else{
		// 						camp.comments.push(created);
		// 						camp.save();
		// 						console.log("New comment created");
		// 					}
		// 				});
		// 			}
		// 		});
		// 	});
		// }
	});
}


module.exports = seedDB;

