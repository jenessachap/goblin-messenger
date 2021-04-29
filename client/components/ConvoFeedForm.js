import React, { Component } from 'react';
import './ConvoFeedForm.css';

class ConvoFeedForm extends Component {
  render() {
    return (
      <div className="ConvoFeedForm-Container">
        <form className="ConvoFeedForm-Form">
          <label >
            Message
            <input type="text" name="message" />
          </label>
          <input type="submit" value="Send" />
        </form>
      </div>
    )
  };
};

export default ConvoFeedForm;