const fs = require('fs');
module.exports = {
	getData: function(callback){
		fs.readFile('./data/data.json', function(err, data) {
			data = JSON.parse(data);
			callback(data);
		});/*
		fs.stat(parentName+'.json', function(err) {
			var projeto;
			if(err){
				projeto = new pacoca();
				xxx();
			}
			else{
				fs.readFile(parentName+'.json', function(err, data) {
					projeto = JSON.parse(data);
					xxx();
				});
			}
			projeto["task"].inicio[projeto["task"].inicio.length] = Date.now();

			function xxx(){
				fs.writeFile('mynewfile3.txt', JSON.stringify(projeto), function (err) {
					if (err) throw err;
					console.log('Saved!');
				});
			}
		});*/
	},
	saveData: function(projeto, callback){
		fs.writeFile('./data/data.json', JSON.stringify(projeto), function(err, data) {
			console.log("saved");
			if(callback)
				callback(err ? false : true);
		});
	}
};