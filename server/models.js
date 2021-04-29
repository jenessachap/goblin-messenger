const mongoose = require('mongoose');

console.log("cool, now we're in the models.js file")

const MONGO_URI = "mongodb+srv://goblin:shark@cluster0.kpvr3.mongodb.net/MultiCommunicado?retryWrites=true&w=majority"

console.log("we made it past the db declaration")

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'MultiCommunicado'
})
    .then(()=> console.log('Connected to Mongo DB'))
    .catch(err => console.log(err));

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    senderId: {type: String, required: true},
    senderLang: {type: String, required: true},
    senderUsername: {type: String, required: true},
    receiverUsername: {type: String, required: true},
    receiverId: {type: String, required: true},
    receiverLang: {type: String, required: true},
    sentText: {type: String, required: true},
    transText: {type: String, required: true},
    userTranslation: {type: String, required: true},
    timeSent: { type: Date, default: Date.now}
});
const Messages = mongoose.model('messages', messageSchema);


const userSchema = new Schema({
    username: {type: String},
    password: {type: String},
    language: {type: String}
  });
  
  const User = mongoose.model('User', userSchema);

  const sessionSchema = new Schema({
    cookieID: { type: String, required: true /* , unique: true */ },
    createdAt: { type: Date, expires: 30, default: Date.now }
  });
  
  const Session = mongoose.model('Session', sessionSchema);

module.exports = {
    Messages,
    User,
    Session
};




