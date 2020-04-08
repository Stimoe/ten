import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./style.css";
import { Redirect } from 'react-router-dom';

class ChatRoom extends Component {



    render() {
        return (
            <div>
          
              <div className="face-up-cards">
              <DeckBrain
// readPlayed={this.handlePlayedCards}
// newDeck2={this.state.finalNewCards}
// readPlayed={this.handlePlayedCards}

// updateDeck={this.newDeck}
drawn={this.drawn}
/>
              </div>
            </div>
    
          );
    }

}



export default ChatRoom;

  /* <InputGroup size="lg">
  <InputGroup.Prepend>
    <InputGroup.Text id="inputGroup-sizing-lg">Large</InputGroup.Text>
  </InputGroup.Prepend>
  <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
</InputGroup> */