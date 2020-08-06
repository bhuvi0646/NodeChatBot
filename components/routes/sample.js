module.exports = function(webserver, controller) {

// add custom routes for your web server here.

webserver.get('/sample', function(req,res) {
  
    res.send('Sample route');
  
});

webserver.post('/receive', function(req, res) {

    console.log(req.body.results);
    
    // respond to Slack that the webhook has been received.
    res.status(200).end();
    

    // Now, pass the webhook into be processed
   // controller.handleWebhookPayload(req, res);

});




}
