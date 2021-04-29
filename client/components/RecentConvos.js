import React, { Component } from 'react';

import NewMessage from './NewMessage';
import MessageBox from './MessageBox';


class RecentConvos extends Component {
    constructor (props){
        super(props)
    }
    render (props){

        const allConversations = [ 
            {
              senderId: "6084d06d159e890779753ea0",
              senderLang: "en",
              senderUsername: "pink",
              receiverUsername: "goku",
              receiverId: "608622d8e574bf6e7Qwff32c",
              receiverLang: "es",
              sentText: "Hello Friend",
              transText: "Hola amigo",
              timeSent: 1619566886,
            },
            {
              senderId: "6084d06d159e890779753ea0",
              senderLang: "en",
              senderUsername: "pink",
              receiverUsername: "brian",
              receiverId: "608622d8kl74bf6e741ff32c",
              receiverLang: "es",
              sentText: "Hello Enemy",
              transText: "Hola enemiga",
              timeSent: 1619568852,
            },
            {
              senderId: "608622d8e571236e741ff32c",
              senderLang: "es",
              senderUsername: "kerri",
              receiverUsername: "pink",
              receiverId: "6084d06d159e890779753ea0",
              receiverLang: "en",
              sentText: "Tengo Hambre",
              transText: "I'm hungry",
              timeSent: 1619678952,
            },
            {
              senderId: "6084d06d159e890779753ea0",
              senderLang: "en",
              senderUsername: "pink",
              receiverUsername: "mtDew",
              receiverId: "6084d0def59e890779753ea0",
              receiverLang: "es",
              sentText: "I'm hungry",
              transText: "Tengo Hambre",
              timeSent: 1619677782,
            },
            {
              senderId: "608622drr574bf68441ff32c",
              senderLang: "es",
              senderUsername: "russ",
              receiverUsername: "pink",
              receiverId: "6084d06d159e890779753ea0",
              receiverLang: "en",
              sentText: "Tengo Hambre",
              transText: "I'm hungry",
               timeSent: 1619679252,
            },
            {
              senderId: "6084d06d159e890779753ea0",
              senderLang: "en",
              senderUsername: "pink",
              receiverUsername: "Chipotle",
              receiverId: "6084d06ttre890779753ea0",
              receiverLang: "es",
              sentText: "I'm hungry",
              transText: "Tengo Hambre",
              timeSent: 1619778952,
            },
          ];
        //   console.log(this.props)
        const userLoggedInLanguage = this.props.language
        const recentConvoArray = [];
        for (let i = 0; i < allConversations.length; i += 1){
            //container for most recent friend and message
            <div className="FriendContainer">
                {/* //top bolded friend name */}
                <div className="FriendName">{allConversations[i].senderUsername}</div>
                {/* most recent message, needs conditional for if sent self, render "sentText" else "transText"  */}
                <div className="MostRecentText">{}</div>
            </div>
        }
        
    
 
    return (
     
        <div>
            {recentConvoArray}
        </div>

    );
    }
}

export default RecentConvos;