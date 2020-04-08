import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./style.css";
import { Redirect } from 'react-router-dom';
import ChatComponent from "../../components/chatRoom/index";
class ChatRoom extends Component {

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
    let tempCurrentUsers = this.state.currentUsers
    tempCurrentUsers.push(tempUser)
        this.setState({
          currentUser: tempCurrentUsers,
        })
      }


    render() {
        return (
            <div>
          
              <div className="face-up-cards">
              <ChatComponent


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