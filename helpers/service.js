const nodemailer = require('nodemailer')
const expo = require('expo-server-sdk')
const Fuse = require('fuse.js')

 async function sendmail(params) {
    let res = process.env.MAIL_AUTH
     let config = JSON.parse(res)
    var transporter = nodemailer.createTransport(config);
  
    let options = {
        from: 'ayush.ashu01@gmail.com', // sender address
        to: config.auth.user, // list of receivers
        subject: 'yup its workingg', // Subject line
        html: '<p> Name : ' + 'Akash' + '</p></br><p> Email : ' + 'ayush.ashu01@gmail.com' + '</p></br><p>UP and running : ' + 'hahaha' + '</p>'// plain text body
      }
      try{
      let mail = await transporter.sendMail(options) 
        return mail

      }
      catch(e){
        return e
      }
  
  }

  function search(data, searchKey){
    var options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 50,
      minMatchCharLength: 1
    }
    options.keys = ['name']
  
    var fuse = new Fuse(data, options)
  
    let values = fuse.search(searchKey)
  
    return values;
  }

  const handlePushTokens = (message) => {
    // Create the messages that you want to send to clents
    let notifications = [];
    for (let pushToken of savedPushTokens) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
  
      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
  
      // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
      notifications.push({
        to: pushToken,
        sound: 'default',
        title: 'Message received!',
        body: message,
        data: { message },
      })
    }
  
    // The Expo push notification service accepts batches of notifications so
    // that you don't need to send 1000 requests to send 1000 notifications. We
    // recommend you batch your notifications to reduce the number of requests
    // and to compress them (notifications with similar content will get
    // compressed).
    let chunks = expo.chunkPushNotifications(notifications);
  
    (async () => {
      // Send the chunks to the Expo push notification service. There are
      // different strategies you could use. A simple one is to send one chunk at a
      // time, which nicely spreads the load out over time:
      for (let chunk of chunks) {
        try {
          let receipts = await expo.sendPushNotificationsAsync(chunk);
          console.log(receipts);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }

  const saveToken = (token) => {
    if (savedPushTokens.indexOf(token === -1)) {
      savedPushTokens.push(token);
    }
  }
  

  module.exports = {
    sendmail : sendmail,
    search : search,
    saveToken : saveToken,
    handlePushTokens : handlePushTokens,
  }