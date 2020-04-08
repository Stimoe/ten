import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Game from "./pages/gamePage/index";
import Login from "./pages/auth/login"
import Register from "./pages/auth/register"
import ChatRoom from "./pages/chatRoom/index"


function App() {

  
  return (

   
      <Router>
        <div>
  
        <Route exact path="/game" component={Game} />
        <Route exact path="/login" component={Login} />  
        <Route exact path="/" component={Register} />   
        <Route exact path="/chat" component={ChatRoom} />  
  
     
      </div>
        </Router>

   

  );
}


export default App
