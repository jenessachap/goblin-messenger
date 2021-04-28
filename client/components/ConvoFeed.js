import React, { Component } from 'react';
import './ConvoFeed.css';

class ConvoFeed extends Component {
  render() {

    const conversationMessage = [
      {
        senderId: "6084d06d159e890779753ea0",
        senderLang: "en",
        senderUsername: "pink",
        receiverUsername: "goku",
        receiverId: "608622d8e574bf6e741ff32c",
        receiverLang: "es",
        sentText: "Hello Friend",
        transText: "Hola amigo",
        //https://stackoverflow.com/questions/36550263/how-create-a-date-field-with-default-value-as-the-current-timestamp-in-mongodb
        timeSent: 1619566886, //unix timestamp ()
      },
      {
        senderId: "6084d06d159e890779753ea0",
        senderLang: "en",
        senderUsername: "pink",
        receiverUsername: "goku",
        receiverId: "608622d8e574bf6e741ff32c",
        receiverLang: "es",
        sentText: "Hello Enemy",
        transText: "Hola enemiga",
        //https://stackoverflow.com/questions/36550263/how-create-a-date-field-with-default-value-as-the-current-timestamp-in-mongodb
        timeSent: 1619568852, //unix timestamp ()
      },
      {
        senderId: "608622d8e574bf6e741ff32c",
        senderLang: "es",
        senderUsername: "goku",
        receiverUsername: "pink",
        receiverId: "6084d06d159e890779753ea0",
        receiverLang: "en",
        sentText: "Tengo Hambre",
        transText: "I'm hungry",
        timeSent: 1619678952, //unix timestamp ()
      },
    ]
    const ConvoFeedContent = conversationMessage.map((message) => {
      return (
        <div className="ConvoFeedContent-Row" key={message.timeSent}>
          <div className={`ConvoFeedContent-Text ${message.senderUsername === "pink" ? "User" : "Friend"}`}>
            {message.transText}
          </div>
        </div>
      )
    })

    return (
      <div className="ConvoFeed-Container">
        {ConvoFeedContent}
      </div>
    )
  }
};

export default ConvoFeed;