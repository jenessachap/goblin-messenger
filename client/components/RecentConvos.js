import React, { Component } from 'react';
import RecentConvoButton from './RecentConvoButton'
import NewMessage from './NewMessage';
import MessageBox from './MessageBox';
import './RecentConvos.css';
import './RecentConvoButton.css';


class RecentConvos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentConvos: [],
      convo: null,
      allMessages: []
    }

    //bind this to onclick
    this.handleConvoState = this.handleConvoState.bind(this)
  }

  //   switch(this.props.view) {
  //       case "convofeed":
  //     content.push(<ConvoFeed allMessageconvoKey={this.state.convo} />);
  //       default:
  //     break;
  // }

  handleConvoState(convoKey) {
    this.props.newView('convofeed');
    this.setState({ convo: convoKey });
  }


  componentDidMount() {
    fetch('/messages/recent')
      .then(data => data.json())
      .then(data => {
        console.log(data)
        this.setState({ recentConvos: data })
        // this.props.updateMessages(data);
        // this.props.newView('convofeed'); //this changes the state view
      })
      .catch((error) => console.log(`there's an error: ${error}`))
  }

  componentDidUpdate() {
    fetch('/messages/:convokey')
      .then(data => data.json())
      .then(data => {
        console.log(data)
        this.setState({ allMessages: data })
        // this.props.updateMessages(data);
        // this.props.newView('convofeed'); //this changes the state view
      })
      .catch((error) => console.log(`there's an error: ${error}`))

  }


  render() {
    console.log(this.state)
    const recentConvoArray = [];
    for (let i = 0; i < this.state.recentConvos.length; i += 1) {
      recentConvoArray.push(<RecentConvoButton
        handleConvoState={this.handleConvoState}
        convoKey={i}
        convo={this.state}
        newView={this.props.newView}
        user={this.props.user}
        convoName={this.state.recentConvos[i]._id}
        lastMsgText={this.state.recentConvos[i].msgText}
      />)

    }

    return (
      <div className="FriendContainer">
        {recentConvoArray}
      </div>
    );
  }
}

export default RecentConvos;