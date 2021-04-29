import React, { Component } from 'react';
import './RecentConvoButton.css'

class RecentConvoButton extends Component {
    constructor(props) {
        super(props)


    }
    render(props) {

        console.log(this.props.convoName)

        //onclick functionality I believe should be linked up with redux, and currently I just slapped this page together with react.
        return (
            <button className="FriendContainerButton" onClick={() => this.props.handleConvoState(this.props.convoKey)}>
                {/* //top bolded friend name */}
                <div className="FriendName">{this.props.convoName}</div>
                {/* most recent message, needs conditional for if sent self, render "sentText" else "transText"  */}
                <div className="MostRecentText">{this.props.lastMsgText}</div>
            </button>
        )
    }
}
export default RecentConvoButton;

