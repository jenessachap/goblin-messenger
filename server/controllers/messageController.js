const { Messages } = require('../models');
const messageController ={}

messageController.getRecentMessages = (req, res, next) => {
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  
  console.log(res.locals.user);

  try{
    const username = res.locals.user.username;
    
    const recentReceivedArr = Messages.aggregate([
      {
        '$match': {
          'senderUsername': username
        }
      }, {
        '$sort': {
          'timeSent': -1
        }
      }, {
        '$group': {
          '_id': '$receiverUsername', 
          'msgText': {
            '$first': '$sentText'
          }, 
          'timeSent': {
            '$first': '$timeSent'
          }
        }
      }
    ])
    .exec()

    console.log('second func')
    const recentSentArr = Messages.aggregate([
      {
        '$match': {
          'receiverUsername': username
        }
      }, {
        '$sort': {
          'timeSent': -1
        }
      }, {
        '$group': {
          '_id': '$senderUsername', 
          'msgText': {
            '$first': '$transText'
          }, 
          'timeSent': {
            '$first': '$timeSent'
          }
        }
      }
    ])
    .exec()
    
    Promise.allSettled([recentReceivedArr, recentSentArr])
      .then(msgArrays => {
        const recentMessagesObj = {}
        msgArrays[0].value.map(msgObj => recentMessagesObj[msgObj._id] = { ...msgObj })
        msgArrays[1].value.map(msgObj => {
          if (!recentMessagesObj[msgObj._id] || msgObj.timeSent > recentMessagesObj[msgObj._id].timeSent)
          recentMessagesObj[msgObj._id] = { ...msgObj }
        })

        const recentMessagesArr = Object.values(recentMessagesObj);
        recentMessagesArr.sort((a,b) => {
          b.timeSent - a.timeSent
        });

        res.locals.recentMessages = recentMessagesArr;
        return next()
      })
      .catch(err => next({
        log: `Error in getRecentMessagesArray. ERRL ${err}`,
        message: `Error in getRecentMessagesArray`
      }))

  } catch (err) {
    next({
      log: `Error in getRecentMessagesArray. ERRL ${err}`,
      message: `Error in getRecentMessagesArray`
    });
  }
}


module.exports = messageController;

