/* This module kicks in if no Botkit Studio token has been provided */

module.exports = function(controller) {

    controller.on('hello', conductOnboarding);
    controller.on('welcome_back', conductOnboarding);


    controller.hears(['help'],['message_received'],function(bot,message) {

      conductOnboarding(bot, message);
    
    });


    function conductOnboarding(bot, message) {
      

      bot.startConversation(message, function(err, convo) {
        convo.say('Hello human! I am here to help you for your lone payments!');
       


             // set up a menu thread which other threads can point at.
        convo.ask({
          text: 'Are you looking to save on your monthly loan payments?.',
          quick_replies: [
            {
              title: 'Yes!',
              payload: 'Yes!',
            },
            {
              title: 'NO, I like paying more.',
              payload: 'NO, I like paying more.',
            },
            
          ]
        },[
          {
            pattern: 'Yes!',
            callback: function(res, convo) {

              
              yesResponce(convo);

 
            //  convo.gotoThread('yes');
            //bot.beginDialog('biryani');
              convo.next();
            }
          },
          {
            pattern: 'NO, I like paying more.',
            callback: function(res, convo) {
              convo.gotoThread('no');
              convo.next();
            }
          },
          {
            default: true,
            callback: function(res, convo) {
              convo.gotoThread('end');
            }
          }
        ]);






        convo.addMessage({
          text: 'Thank You. If you need help for something type help.'
        },'thankyou');

        convo.addMessage({
          text: 'I do not know how to help with that.'
        },'end');


        convo.addMessage({
          text: 'No Problem. When you\'re reday to consolidate your loan and save money, <br>giving you more financial freedom. <br> just message us back :) '
        },'no');

        convo.addMessage({
          text: 'That\'s great! i\'ll connect you with someone now.' 
        },'chatting');


      //   convo.addQuestion('Perfect! Kindly tell me your email address so that we can get in touch.<br>Thnak You', async(response, convo, bot) => {
      // },'emailId', 'email');
    
     



      convo.addQuestion('Perfect! Kindly tell me your email address so that we can get in touch.', [  
        {
            default: true,
            callback: function(res, convo) {
                // do nothing, allow convo to complete.
                convo.gotoThread('thankyou');
                convo.next();
                 
                
            }
        }
    ], 'emailId', 'email');

    convo.addQuestion('You bet! Please tell me your phone number and we\'ll give you a call shortly :)', [  
      {
          default: true,
          callback: function(res, convo) {
              // do nothing, allow convo to complete.
              convo.gotoThread('thankyou');
              convo.next();
               
              
          }
      }
  ], 'PhoneNo', 'phone');
    
      });

     
    

    }
  
   
    function yesResponce(convo)
    {

     convo.say('Great!');

      convo.ask({
        text: 'What are you looking for spacifically?',
        quick_replies: [
          {
            title: 'Batter rates',
            payload: 'rates',
          },
          {
            title: 'Loan Consolidation',
            payload: 'consolidation',
          },
          {
            title: 'All of the above',
            payload: 'all',
          },
          
          {
            title: 'None of the above',
            payload: 'none',
          },
        ]
      },[
        {
          pattern: 'rates',
          callback: function(res, convo) {
            convo.say('We can certainly help you to provider better interest rate.');
            emailPhoneNone(convo);
            convo.next();
          }
        },
        {
          pattern: 'consolidation',
          callback: function(res, convo) {
            convo.say('We can certainly help you with that');
            emailPhoneNone(convo);
            convo.next();
          }
        },
        {
          pattern: 'all',
          callback: function(res, convo) {
            convo.say('Absolutly! we can help you for both.');
            emailPhoneNone(convo);
            convo.next();
          }
        },
        {
          pattern: 'none',
          callback: function(res, convo) {
            noneOfAbove(convo)
            // convo.gotoThread('none');
            convo.next();
          }
        },
        {
          default: true,
          callback: function(res, convo) {
            convo.gotoThread('end');
          }
        }
      ]);
    }

    function noneOfAbove(convo)
    {
      convo.ask({
        text: 'Hmm...can i pass you along to someone who can understand exactly what you need?',
        quick_replies: [
          {
            title: 'Yes',
            payload: 'Yes',
          },
          {
            title: 'No',
            payload: 'NO',
          }
        ]
      },[
        {
          pattern: 'Yes',
          callback: function(res, convo) {
            emailPhoneNone(convo);
            // convo.gotoThread('Yes');
            convo.next();
          }
        },
        {
          pattern: 'No',
          callback: function(res, convo) {
            convo.gotoThread('no');
            convo.next();
          }
        },
        {
          default: true,
          callback: function(res, convo) {
            convo.gotoThread('end');
          }
        }
      ]);
    }

    function emailPhoneNone(convo)
    {
      convo.ask({
        text: 'How would you prefer to proceed? ',
        quick_replies: [
          {
            title: 'Email me.',
            payload: 'Email me.',
          },
          {
            title: 'Call me.',
            payload: 'Call me.',
          },
          {
            title: 'I\'d ike to keep chatting.',
            payload: 'keep chatting.',
          }
        ]
      },[
        {
          pattern: 'Email me.',
          callback: function(res, convo) {
            convo.gotoThread('email');
            convo.next();
          }
        },
        {
          pattern: 'Call me.',
          callback: function(res, convo) {
            convo.gotoThread('phone');
            convo.next();
          }
        },
        {
          pattern: 'keep chatting.',
          callback: function(res, convo) {
            convo.gotoThread('chatting');
            convo.next();
          }
        },
        {
          default: true,
          callback: function(res, convo) {
            convo.gotoThread('end');
          }
        }
      ]);
    }
        // convo.addMessage({
        //   text: '[Checkout the Github Issue Queue](https://github.com/howdyai/botkit/issues) to find frequently asked questions, bug reports and more.',
        // },'community');

     
  }