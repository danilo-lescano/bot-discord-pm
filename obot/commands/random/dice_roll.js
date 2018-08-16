const commando = require("discord.js-commando");

class DiceRollCommand extends commando.Command{
    constructor(client){
        super(client, {
            name: 'roll',
            group: 'random',
            memberName: 'roll',
            description: 'Roll a die',
            args: [
                {
                    key: 'dado',
                    prompt: 'd6',
                    type: 'string'
                },
            ],
        });
    }
    async run(message, {dado}){
        dado = dado || "d6";
        var dice = parseInt(dado.split('d')[1]);
        var roll = Math.floor(Math.random() * dice) + 1;
        
        message.delete();
        message.reply("You rolled a " + roll + " out of " + dado);
        console.log("You rolled a " + roll + " out of " + dado);
    }
}

module.exports = DiceRollCommand;