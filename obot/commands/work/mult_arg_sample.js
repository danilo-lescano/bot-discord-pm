const commando = require("discord.js-commando");

class SayCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'dm',
            group: 'work',
            memberName: 'dm',
            description: 'Sends a message to the user you mention.',
            examples: ['dm @User Hi there!'],
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to send the DM to?',
                    type: 'user'
                },
                {
                    key: 'content',
                    prompt: 'What would you like the content of the message to be?',
                    type: 'string'
                }
            ]
        });    
    }

    run(msg, { user, content }) {
        return user.send(content);
    }
}

module.exports = SayCommand;