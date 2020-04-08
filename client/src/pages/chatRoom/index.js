import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { Redirect } from 'react-router-dom';
import Chatroom from "../../components/Chatroom/Chatroom";

class ChatRoomNew extends Component {

    constructor(props) {
        super(props);
        this.state = {
          username: '',
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
          currentUsers: tempCurrentUsers,
          username: tempUser
        }, () =>{
            // this.getUsers()
        })
      }

      // getUsers = () => {
      //   axios.get('/api/user/activeUsers', {
      //       // params: {
      //       //   username: user
      //       // }
      //     })
      //     .then(res => {
      //    console.log(res)

      //     })

   
    
 
      // }


    render() {
        return (
            <div>
          
              <div className="chat">
              <Chatroom


/>
              </div>
            </div>
    
          );
    }

}



export default ChatRoomNew;

