var Nonogram = function(){
	var args = Array.prototype.slice.call(arguments),
		callback = args.pop();
	var modules = (args[0] && typeof args[0] === "string") ? args : args[0],
		i;

	if(!(this instanceof Nonogram)){
		return new Nonogram(modules, callback);
	}

	if(!modules || modules === '*' || modules[0] === '*'){
		modules = [];
		for(i in Nonogram.modules){
			if(Nonogram.modules.hasOwnProperty(i)){
				modules.push(i);
			}
		}
	}

	var mLength = modules.length;
	for (i = 0; i < mLength; i++) {
		Nonogram.modules[modules[i]](this);
	}

	callback(this);
}

Nonogram.prototype = {
	design: "SandBox Pattern",
	version: 1.01,
	getName: function(){
		return this.name;
	},
	getSandBox: function(){
		console.log(this);
	},
	gameStatus: false
}

Nonogram.modules = {};