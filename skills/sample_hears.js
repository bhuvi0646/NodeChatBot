
var https = require('follow-redirects').http;
var fs = require('fs');

module.exports = function(controller) {


  controller.hears('test','message_received', function(bot, message) {

    bot.reply(message,'I heard a test');

    send();






  });

  controller.hears('typing','message_received', function(bot, message) {

    bot.reply(message,{
      text: 'This message used the automatic typing delay',
      typing: true,
    }, function() {

      bot.reply(message,{
        text: 'This message specified a 5000ms typing delay',
        typingDelay: 5000,
      });

    });

  });

}


function send()
{
  console.log("send");
  var options = {
    'method': 'POST',
    'hostname': 'zmm2w.api.infobip.com',
    'path': '/omni/1/advanced',
    'headers': {
        'Authorization': 'Basic a3JzLm5hcm9sYUBnbWFpbC5jb206S2V2YWxAMjIwNjE5OTA=',
        'Accept': 'application/json'
    },
    'maxRedirects': 20
};

var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });

    res.on("error", function (error) {
        console.error(error);
    });
});
//var postData = JSON.stringify({"name":"My WHATSAPP-SMS scenarioo","flow":[{"from":"WhatsAppSender","channel":"WHATSAPP"},{"from":"InfoSMS","channel":"SMS"}],"default":true});
var postData = JSON.stringify({"destinations":[{"to":{"phoneNumber":"918866770646"}}],"scenarioKey":"1900F2A77E4DD659AEA697AC52C779C4","sms":{"text":"This is the SMS failover message"},"whatsApp":{"text":"Hi Sushil"}});
//var postData = JSON.stringify({"name":"NEWWHATSAPP","flow":[{"from":"2673702700","channel":"WHATSAPP"},{"from":"2673702700","channel":"SMS"}],"default":true});
//var postData = JSON.stringify({"destinations":[{"to":{"phoneNumber":"918866770646"}}],"scenarioKey":"1900F2A77E4DD659AEA697AC52C779C4","sms":{"text":"This text will be received if WhatsApp communication channel message is not delivered."},"whatsApp":{"locationName":"Name of the location","address":"Address name","longitude":15.946519,"latitude":45.793337}});

req.write(postData);
//F3082671515F997DE69A09F38ABB9582
req.end();

}
