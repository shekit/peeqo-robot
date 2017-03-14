const path = require('path')

module.exports = function(){

	var glasses = $("#glasses");

	var custom = {}

	custom.glassPics = ["glass1.png", "glass2.png", "glass3.png", "glass4.png"]

	custom.changeGlasses = function(){
		var randomGlass = custom.glassPics[Math.floor(Math.random()*(custom.glassPics.length))]
		var glassPath = path.join(__dirname,"../images","glasses",randomGlass)
		glasses.attr({'src':glassPath});
	}

	return custom
}