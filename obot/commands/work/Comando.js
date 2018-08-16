const HanddleData = require('./HanddleData.js');
module.exports = {
	ajuda: function(msg){

	},
	start: function(msg){
		var parentName = msg.channel.parent ? msg.channel.parent.name : "none";
		var content = parentName !== "none" ? "Projeto: " + parentName + "\nFeature-task: " + msg.channel.name + "\nContabilizando seu trabalho agora..." : "Oi. Pra contabilizar as horas, primeiro você tem que estar em um canal dentro de um projeto.";


		if(parentName !== "none"){
			var contarHora = function(data){
				var user = msg.author.username;
				var flagProject = false;
				var flagTask = false;

				var flag = false;
				var ijk = [false, false, false];
				for (var i = 0; i < data.project.length; i++) {
					for (var j = 0; j < data.project[i].task.length; j++) {
						for (var k = 0; k < data.project[i].task[j].timeList.length; k++) {
							if(data.project[i].task[j].timeList[k].personName === user && data.project[i].task[j].timeList[k].timeOut === false){
								ijk = [i, j, k];
								flag = true;
							}
						}
					}
				}

				for (var i = 0; i < data.project.length; i++) {
					if(data.project[i].projectName === parentName){
						flagProject = i;
					}
					//console.log(flagProject + ": " +data.project[i].projectName + " " + parentName);
				}
				for (var i = 0; i < data.project[flagProject].task.length; i++) {
					if(data.project[flagProject].task[i].channelName === msg.channel.name){
						flagTask = i;
					}
					//console.log(flagTask + ": " +data.project[flagProject].task[i].channelName + " " + msg.channel.name);
				}
				if(flagProject !== false && flagTask !== false && flag === false){
					data.project[flagProject].task[flagTask].timeList[data.project[flagProject].task[flagTask].timeList.length] = {
						personName: user,
						timeIn: Date.now(),
						timeOut: false
					};
					HanddleData.saveData(data);
					msg.channel.send(content);
				}
				else if(flag){
					msg.channel.send("Talvez vc já tenha começado um projeto...");
				}
				else
					msg.channel.send("erro");

			}; HanddleData.getData(contarHora);
		}
		else
			msg.channel.send(content);
	},
	paraporra: function(msg){
		var content;
		var contarHora = function(data){
			var user = msg.author.username;
			var flag = false;
			var ijk = [false, false, false];

			for (var i = 0; i < data.project.length; i++) {
				for (var j = 0; j < data.project[i].task.length; j++) {
					for (var k = 0; k < data.project[i].task[j].timeList.length; k++) {
						if(data.project[i].task[j].timeList[k].personName === user && data.project[i].task[j].timeList[k].timeOut === false){
							ijk = [i, j, k];
							data.project[i].task[j].timeList[k].timeOut = Date.now();
							flag = true;
						}
					}
				}
			}
			if(flag){
				content = "Projeto: " + data.project[ijk[0]].projectName + "\nFeature-task: " + data.project[ijk[0]].task[ijk[1]].channelName + "\nPausando seu trabalho agora...";
				HanddleData.saveData(data);
				msg.channel.send(content);
			}
			else
				msg.channel.send("Nada pra pausar aqui");

		}; HanddleData.getData(contarHora);
	},
	pause: function(msg){
		var content;
		var contarHora = function(data){
			var user = msg.author.username;
			var flag = false;
			var ijk = [false, false, false];

			for (var i = 0; i < data.project.length; i++) {
				for (var j = 0; j < data.project[i].task.length; j++) {
					for (var k = 0; k < data.project[i].task[j].timeList.length; k++) {
						if(data.project[i].task[j].timeList[k].personName === user && data.project[i].task[j].timeList[k].timeOut === false){
							ijk = [i, j, k];
							data.project[i].task[j].timeList[k].timeOut = Date.now();
							flag = true;
						}
					}
				}
			}
			if(flag){
				content = "Projeto: " + data.project[ijk[0]].projectName + "\nFeature-task: " + data.project[ijk[0]].task[ijk[1]].channelName + "\nPausando seu trabalho agora...";
				HanddleData.saveData(data);
				msg.channel.send(content);
			}
			else
				msg.channel.send("Nada pra pausar aqui");

		}; HanddleData.getData(contarHora);
	}
};