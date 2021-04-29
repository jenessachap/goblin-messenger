import React, { Component } from 'react';
import './ConvoFeed.css';

class ConvoFeed extends Component {

  render() {

    const ConvoFeedContent = this.props.convoMessages.map((message) => {
      return (
        <div className="ConvoFeedContent-Row" key={message.timeSent} >
          <div className={`ConvoFeedContent-Text ${message.senderUsername === this.props.user.username ? "User" : "Friend"}`}>
            {message.senderUsername === this.props.user.username ? message.sentText : message.transText}
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