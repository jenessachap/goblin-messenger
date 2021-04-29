const { Messages } = require('../models');
const path = require('path');
const sandboxController ={}

sandboxController.getFirstMessageInConvo = (req, res, next) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');

  const username = "Jenessa"
  try{

    Messages
    .find({ senderUsername : username })
    .aggregate([
      {
        "$group" : {
          "_id" : "$receiverUsername",
          "doc" : { "$first" : "$$ROOT" }
        }
      }
    ])
    .exec((error, response) => {
      if (error) console.log(error);
      else console.log(response);
      return next();
    })     
    } catch (err) {
      console.log(err);
    }
}


module.exports = sandboxController;

