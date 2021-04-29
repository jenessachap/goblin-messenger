import React, { Component } from 'react';
import RecentConvoButton from './RecentConvoButton'
import NewMessage from './NewMessage';
import MessageBox from './MessageBox';
import './RecentConvos.css';
import './RecentConvoButton.css';


class RecentConvos extends Component {
  constructor (props){
    super(props);
    this.state = {
      recentConvos: []
    }
  }
  componentDidMount() {
    fetch('/messages/recent')
    .then(data => data.json())
    .then(data => {
      console.log(data)
      this.setState({recentConvos: data})
      // this.props.updateMessages(data);
      // this.props.newView('userpage'); //this changes the state view
    })
    .catch((error) => console.log(`there's an error: ${error}`))

  }  
  render (){
console.log(this.state)
    const recentConvoArray = [];
    for (let i = 0; i < this.state.recentConvos.length; i += 1){
      recentConvoArray.push(<RecentConvoButton convoName={this.state.recentConvos[i]._id} lastMsgText={this.state.recentConvos[i].msgText}/>)

    }  
 
    return (
      <div className="FriendContainer">
        {recentConvoArray}
      </div>
    );
  }
}

export default RecentConvos;