const { User, TransMess, SentMess } = require('../models');
const path = require('path');
const sandboxController ={}

sandboxController.getFirstMessageInConvo = (req, res, next) => {
  SentMess.find(
    { $or : [{ senderUsername : "pink" }, { recevieverUsername : "pink" }]})
    .aggregate([
      {
        "$group" : {
          "_id": ""
        }
      }
    ])
}


module.exports = sandboxController;

