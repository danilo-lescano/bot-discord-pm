const Comando = require('./commands/work/Comando.js');
const CheckMsg = require('./commands/work/CheckMsg.js');
const HanddleData = require('./commands/work/HanddleData.js');

const Discord = require('discord.js');


const bot = new Discord.Client();


bot.on("ready", function() {
	console.log("estou pronto!");
	var updateData = function(data){
		var channels;//type e name
		var projectFlag;
		var taskFlag;
		var parent;

		channels = bot.guilds.first().channels.array();//type e name
		for (const channel of bot.guilds.first().channels.values()) {
			//console.log("type: " + channel.type + "    name: " + channel.name);
			projectFlag = taskFlag = false;
			parent = "none";
			if(channel.type === "text" && channel.parentID !== undefined){
				parent = bot.guilds.first().channels.find("id",channel.parentID) ? bot.guilds.first().channels.find("id",channel.parentID).name : "none";
			}
			if(parent !== "none"){

				for (var j = 0; j < data.project.length; j++) {
					if(data.project[j].projectName === parent)
						projectFlag = j;
				}
				if (projectFlag === false) {
					data.project[projectFlag = data.project.length] = {
						projectName: parent,
						task: []
					};
					HanddleData.saveData(data);
				}
				for (var j = 0; j < data.project[projectFlag].task.length; j++) {
					if(data.project[projectFlag].task[j].channelName === channel.name)
						taskFlag = j;
				}
				if (taskFlag === false) {
					data.project[projectFlag].task[data.project[projectFlag].task.length] = {
						channelName: channel.name,
						timeList: []
					};
					HanddleData.saveData(data);
				}
			}
		}
	};setInterval(
		HanddleData.getData//(updateData);
		, 5000, updateData);
});

bot.on("message", (message) => {
	var comando = CheckMsg(message, Comando);
	if(!message.author.bot) console.log(message.content);
		//console.log(message.channel.parent.name);
	if(comando == false || message.author.bot) return;
	else if (comando.exists !== false) {
		Comando[comando.nome](message);
	}
	else{
		message.reply("comando não existe");
	}
});

bot.on("guildMemberAdd", (member) => { //welcome message
	if(member.user.bot) return;
	if(member.guild.channels.find("name", "chat-aleatorio")){
		member.guild.channels.find("name", "chat-aleatorio").send(member.user.username + " Bem vindo ao servidor do time de inovação do Sesi!");

		var idRole = member.guild.roles.find("name", "User").id;
		if(idRole){
			console.log(idRole);
			member.addRole(member.guild.roles.find("name", "User"))
			.then(console.log)
			.catch(console.error);
		}
	}
});

bot.on("channelCreate", (channel) => { //projeto iniciado
	if(channel.type != "category")return;
	else{
		var guild = bot.guilds.first();
		guild.createChannel("geral", "text")
		.then((chan)=>{
			chan.setParent(channel)
			.then((updated) =>{console.log(updated.parentID = channel.id);})
			.catch(console.error);

			guild.fetchAuditLogs()
			.then((GuildAuditLogs)=>{
				var criador = GuildAuditLogs.entries.find("createdTimestamp", channel.createdTimestamp) ? GuildAuditLogs.entries.find("createdTimestamp", channel.createdTimestamp).executor.username : "who?";
				chan.send("PROJETO -- " + channel.name + " -- foi iniciado por: " + criador + " com sucesso!");
			})
			.catch(console.error);
		})
		.catch(console.error);
	}
});
bot.on("error", (err) => {
	console.log("UM ERRO SELVAGEM APARECEU!");
});
bot.login('NDcxNjk5ODQ3MjgwNDU5Nzc2.Djoopw.zOj-AtdXsd-40kM8Tlhel-9a6xY');

//import Library from 'some-library';
/*const Commando = require('discord.js-commando');
const bot = new Commando.Client();

bot.registry.registerGroup('random', 'Roalgem de dados');
bot.registry.registerGroup('work', 'Gerenciar horas');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on("ready", () => {
console.log("I am ready!");
});

bot.on("message", (message) => {
if (message.content.startsWith("ping")) {
message.channel.send("pong!");
}
});

bot.login('NDcxNjk5ODQ3MjgwNDU5Nzc2.Djoopw.zOj-AtdXsd-40kM8Tlhel-9a6xY');*/