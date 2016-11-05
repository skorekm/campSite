var mongoose = require("mongoose");

//Creating Schema for DB
var camgroundSchema = new mongoose.Schema({
	name:String,
	image:{type:String,default:"https://hd.unsplash.com/photo-1445308394109-4ec2920981b1"},
	desc:String,
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	},
	comments:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Comment"
	}]
});

//Setting up a model
module.exports = mongoose.model("Campground", camgroundSchema);