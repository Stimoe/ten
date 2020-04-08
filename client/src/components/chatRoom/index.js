import React from "react";
import "./style.css";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function ChatRoom(props) {
  return (
    <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <nav class="navbar navbar-default" role="navigation">
              <div class="container-fluid">
                <div class="navbar-header">
                  <a class="navbar-brand">Ten Card Game</a>
                </div>
            
                <ul class="nav navbar-nav navbar-right">
                  <li>
                    <a href="#">
                      You are <strong id="whoami"></strong> 
                      <span id="my_skill" class="badge"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="panel panel-default">
              <div class="panel-heading">Online Users</div>
              <div class="list-group" id="online-users"></div>
            </div>
          </div>
          <div class="panel panel-default">
            <button type="submit" class="btn btn-default" id="start-match">Start Game</button>
            <div class="panel-heading">Potential Game</div>
            <div class="list-group" id="potential-game-players"></div>
            
          </div>
          <div class="col-md-6">
            <div class="panel panel-default">
              <div class="panel-heading">Live Chat</div>
              <ul class="list-group" id="chat-output"></ul>
              <div class="panel-body">
                <form id="chat">
                  <div class="input-group">
                    <input type="text" class="form-control" id="chat-input" />
                    <span class="input-group-btn">
                      <button type="submit" class="btn btn-default">Send Message</button>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
          </div>
          </div>
  );
}

export default ChatRoom;







{/* <Container>
<Row>
<Col>1 of 1</Col>
</Row>
<Row>
<Col md={4}>Chat Room


</Col>
  <Col md={{ span: 4, offset: 4 }}>{`Potential Game`}
  <Button variant="primary">Join Potential Game</Button>{' '}
  <Button variant="primary">Start Potential Game</Button>{' '}
  </Col>
</Row>

</Container> */}