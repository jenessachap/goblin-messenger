const{ User, Messages, Session }= require('../models');
const { Translate } = require('@google-cloud/translate').v2;
const path = require('path');
const translationController = {};
const projectId = '112305914504973967363';
//the service account file is the file associated with the project on Whit's google drive account
//get in contact with him to figure out how to get a copy that won't be put on github for security reasons
//or to start your own account and set up the serviceAccountFile
//just make sure to not go over 500,000 characters translated, which I know is a lot
//but just try to avoid sending looping calls to translate, ya feel?
const keyFilename = path.resolve(__dirname, './../pandawhaleiterationproject-ce75c9c97be2.json')
const translate = new Translate({projectId, keyFilename});

//function that calls to google Translate API

async function textTranslate(text, friendLanguage) {
    console.log(`this is before api call`)
  let translation = await translate.translate(text, friendLanguage);
  console.log(`this is after api call`)

  console.log('Translation:' + translation);
  //the returned value is an array with the first index being a string,
  //the second index being data about the call
  return translation[0];
}

         
//middleware for storing the message as it is sent in the database
//this message will be sent for translation in the next middleware
//the translated message will be stored in a translated messages database, allowing us to minimize API calls

//request body coming in should be formatted this way for code to work
/* {
    id: the Id of the user sending the message
    senderUsername: the message sender's username
    friendUsername: the message recipient's username
    language: the language code assigned from the initial sender
    message: the actual text to translate
}*/
translationController.findFriend = async (req, res, next) => {
    console.log('findFriend fired');
    console.log(`this is the request for friend lookup ${req.body.username}`);
    //conditional to make sure that the request wasn't sent with any required fields empty
    if (req.body.message == ""){
        res.locals.noMessage = true;
        return res.status(200).json(res.locals);
    }
    if (req.body.friendUsername == ""){
        res.locals.noRecipient = true;
        return res.status(200).json(res.locals);
    }

    // this gets the friend's, info like language, id, etc.
    //Not sure if this req.body.friendUsername is correct, it might actually be req.body.username or possibly recipiant. 
    await User.findOne({username: req.body.targetUsername})
    .then((response) =>{
        console.log(`this is the response ${response}`)

        //check to see if the inputted username is contained in database,
        //if not send back something to say hey nothing found
        if(!response){
            //changed userNotFound to friendNotFound
            res.locals.friendNotFound = true;
            return res.status(200).json(res.locals);
        } else {
            //storing the friend's user info into local.friend
            res.locals.friend = response;
            next();
        }
    })
    .catch((err)=>{
        if (err)next({
            log: `translationController.findFriend: ERROR: Did not properly find friend`,
            message: { err: 'translationController.findFriend: ERROR: Check server logs for details' }
        })
    })
}

//the call to the API that results in the translation of the message after being sent to the database
//this should result in a useable message being returned to the server to be stored in a translated message database
//should also check to make sure that it knows what language the message sent should be sent in
translationController.sendForTranslation = async (req, res, next) => {
    console.log(`this is the request for translation ${req.body}`);

    //check to see if translation is necessary, if not just pass along message
    if (res.locals.friend.language === req.body.language){
        res.locals.translation = req.body.message;
        console.log(`translated text did not need translation: ${res.locals.translation}`)
        next();
    } else {
        res.locals.translation = await textTranslate(req.body.message, res.locals.friend.language)
        next();
    }

}

//the middleware that will handle the creation of the translated message entry in the database
//the translated message will have the ID's of the sender and recipient included to allow for specific lookup of 
//only the desired messages
translationController.createMessage = async (req, res, next) => {
    console.log('createMessage fired');
   await Messages.create({
        senderId: req.body.id,
        senderLang: req.body.language,
        senderUsername: req.body.senderUsername,
        receiverUsername: res.locals.friend.username,
        receiverId: res.locals.friend._id,
        receiverLang: res.locals.friend.language,
        sentText: req.body.message,
        transText: res.locals.translation
      })
    .then((newMessage) => {
        console.log(`we should have a new message in the database`)
          //store the newly created message in locals to be able to send to the API for translation
          res.locals.message = newMessage;
          next();
        })
    .catch((err)=>{
        if (err)next({
           log: `translationController.createMessage: ERROR: Did not properly create message`,
           message: { err: 'translationController.createMessage: ERROR: Check server logs for details' }
    },             console.log(err)
    )
    })
}



// this will get the messages that have been sent to the user and translated
// as well as the messages that the user has sent pre translation.  

translationController.getMessages = async (req, res, next) => {

        console.log(`this is the getMessage`)

    await Messages.find(

        // $and: [
        //     { $or: [{"senderUsername": res.locals.user.username},
        //     {"senderUsername": req.params.username}] },
        //     { $or: [{"receiverUsername": res.locals.user.username}, 
        //     {"receiverUsername": req.params.username}] }
        // ]
        
        { $or: [
            {"senderUsername": res.locals.user.username},
            {"senderUsername": req.params.username}, 
            {"receiverUsername": res.locals.user.username}, 
            {"receiverUsername": req.params.username}
        ]
    })
    .then((messageFeed) => {
        console.log(`we should have an array of messages for the convo feed: ${messageFeed}`)
        res.locals.convoFeed = messageFeed;
        next();
    })
    .catch((err) => {
        if (err)next({
            log: `translationController.getMessages: ERROR: Did not properly get message feed`,
            message: { err: 'translationController.getMessages: ERROR: Check server logs for details' }
     }, console.log(err)
     )
    })

}


module.exports = translationController;
