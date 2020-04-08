import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./style.css";
import { Redirect } from 'react-router-dom';
import DeckBrain from "../../components/deckManagement/index";

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUsers: [],
      currentUserHand: [],
      currentPlayedPile: [],
      discard: [],
      currentFourCardsFaceDown: [],
      currentFourCardsFaceUp: [],

    };
  }





  componentDidMount() {

    let tempUser = this.props.location.state.username
    let tempCurrentUsers = this.state.currentusers
    tempCurrentUsers.push(tempUser)

    this.setState({
      currentUsers: tempCurrentUsers,
    })
  }




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


export default Game;