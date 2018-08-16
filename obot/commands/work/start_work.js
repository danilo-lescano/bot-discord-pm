const commando = require("discord.js-commando");

class StartWorkCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'start',
            group: 'work',
            memberName: 'start',
            description: 'Iniciar a contagem de horas na task',
        });
    }
    async run(message, args){
        message.reply(args);
        console.log(args);
    }
}

module.exports = StartWorkCommand;

/*
const mysql = require('mysql');

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "sesi@0952",
	database: "discordserver",
});
function tryResult(query) {
	connection.query(query, dataValues, function(err, result, fields){
		var flag = false;
		if (err){
			console.log(err);
			res.writeHead(200, {'Content-Type': "application/json"});
			res.end("[]");
		}
		else if(result){
			console.log(result);
			res.writeHead(200, {'Content-Type': "application/json"});
			res.end(JSON.stringify(result));
		}
		else{
			console.log(result);
			res.writeHead(200, {'Content-Type': "application/json"});
			res.end("[]");
		}
	});
}*/