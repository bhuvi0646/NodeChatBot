module.exports = function(controller) {

    controller.on('message_received', function(bot, message) {

        bot.reply(message, {
            text: 'I do not know how to respond to that message yet.',
            quick_replies: [
                {
                  title: 'Help',
                  payload: 'help',
                },
              ]
        });

    });

    

}