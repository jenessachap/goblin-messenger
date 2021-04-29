import React, { Component } from 'react';
import RecentConvoButton from './RecentConvoButton'
import NewMessage from './NewMessage';
import MessageBox from './MessageBox';
import './RecentConvos.css';
import './RecentConvoButton.css';
import ConvoFeed from './ConvoFeed'


class RecentConvos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentConvos: [],
    }

    //bind this to onclick
    this.handleConvoClick = this.handleConvoClick.bind(this)
  }

  //   switch(this.props.view) {
  //       case "convofeed":
  //     content.push(<ConvoFeed allMessageconvoKey={this.state.convo} />);
  //       default:
  //     break;
  // }

  handleConvoClick(convoName) {
    this.props.newView('convofeed');
    this.props.setConvoName(convoName);
    this.props.updateConvoMessages(convoName);
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


  render() {
    console.log(this.state)
    const recentConvoArray = [];
    for (let i = 0; i < this.state.recentConvos.length; i += 1) {
      recentConvoArray.push(<RecentConvoButton
        handleConvoClick={this.handleConvoClick}
        newView={this.props.newView}
        user={this.props.user}
        setConvoName={this.props.setConvoName}
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