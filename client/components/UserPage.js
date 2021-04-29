import React from 'react';
import NewMessage from './NewMessage';
import MessageBox from './MessageBox';

const UserPage = (props) => {
  let content = [];
  switch (props.view) {
    case 'newmessage':
      content.push(
        <NewMessage
          key={900}
          info={props.info}
          key={999}
          id='newmsg'
          send={props.send}
        />
      );
    default:
      break;
  }
  return (
    <div>
      <div className='userPageContainer'>
        <div className='userNavBar'>
          <button className='NavButton' onClick={() => props.logout(null)}>
            Logout
          </button>
          {/* <button
                        className="NavButton"
                    >Back</button> */}
          <button
            className='userNavBarButton'
            onClick={() => props.newView('newmessage')}
          >
            New Friend
          </button>
          {/* <button className="userNavBarButton" onClick={() => props.newView('sentmessages')}>Sent Messages</button>
                    <button className="userNavBarButton" onClick={() => props.newView('userpage')}>My messages</button> */}
          <button
            className='userNavBarButton'
            onClick={() => {
              props.setConvoName(null);
              props.newView('userpage');
            }}
          >
            Home
          </button>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default UserPage;

/************************************************************
        Commented this section out for now since the backend has been updated. 
        the below commentd out section was expecting to recieve two separate objects one for 
        sent messages and one for recieved messages from the database.
        Now we have combined those messages into one object, with the recent backend Pull Request. 
        example: 
            {
                _id: 608a04445cd478eb0dba4649,
                senderId: '6087239565b8635e9e7aab50',
                senderLang: 'hi',
                senderUsername: 'Jenessa',
                receiverUsername: 'Brian',
                receiverId: '608a04065cd478eb0dba4647',
                receiverLang: 'es',
                sentText: 'Its a translation app. ',
                transText: 'Es una aplicación de traducción.',
                timeSent: 2021-04-29T00:56:36.502Z,
                __v: 0
            },{
                _id: 608a04525cd478eb0dba464a,
                senderId: '6087239565b8635e9e7aab50',
                senderLang: 'hi',
                senderUsername: 'Jenessa',
                receiverUsername: 'Brian',
                receiverId: '608a04065cd478eb0dba4647',
                receiverLang: 'es',
                sentText: 'It is translating all of our messages',
                transText: 'Está traduciendo todos nuestros mensajes.',
                timeSent: 2021-04-29T00:56:50.003Z,
                __v: 0
            }
            

            The app works with this below section commented out for now, we needed to do this to submit a PR 
        for now. 
        *************************************************************/

// case "userpage":
//     if (props.messages.received.length === 0) {
//         content.push(<div className="emptyMessages" >You have no messages!</div>)
//         break;
//     }
//     console.log(props.messages.received)
//     for (let i = props.messages.received.length - 1; i >= 0; i--) {
//         content.push(<MessageBox id={i} username={'From: ' + props.messages.received[i].senderUsername} message={props.messages.received[i]} />)
//     }
//     break;
// case "sentmessages":
//     //check if messages have arrived
//     if (props.messages.sent.length === 0) {
//         content.push(<div className="emptyMessages" >You haven't sent any messages yet! Send a new message above!</div>)
//         break;
//     }
// create a new message for every message received
// for (let i = props.messages.sent.length - 1; i >= 0; i--) {
//     content.push(<MessageBox id={i} username={'To: ' + props.messages.sent[i].receiverUsername} message={props.messages.sent[i]} />)
// }
// break;
