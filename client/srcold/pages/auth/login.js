import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Redirect} from 'react-router-dom';
import axios from "axios";
import "./style.css";



class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loggedInUser:"",
      redirect: false,
      // url:"https://stimoe.github.io/expressNeonRainServer",
      url:"http://localhost:5000",
      // url:"https://neon-rain-express-server.herokuapp.com",
      // url: "https://neon-rain-game-new.herokuapp.com",
      errors: {}
    };
  }


  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };




  // handleChange = event => {
  //   console.log("change")
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   })
  // }



    handleLoginFormSubmit = event => {
      event.preventDefault();
      axios.post('/api/user/login', { username: this.state.username, password: this.state.password }).then(res => {
        let newStatus= (res.status)
      if(newStatus===200){
          this.setState({ redirect: true })
          // console.log(this.state.redirect)
      }
       
      }).catch(err => {
        console.log(err.response);
        alert("Username already exists or password could not be validated")
      })
      }
    





  
  
  
  render() {
    const { redirect } = this.state;
    const { errors } = this.state;

    // if (redirect) {
    //   return <Redirect to='/storypage'/>;
    // }

 if (redirect) {
   return <Redirect to={{
    pathname: '/chat',
    state: { username: this.state.username }
}}
/>
 }



    return (
      
      <div className="container inputS">
        <div className="landing3">
          <div className="home-wrap3">
            <div className="home-inner3"></div>
          </div>
        </div>
        <div className="nes-container is-rounded is-dark">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/">Register</Link>
                </p>
              </div>
              <form>
                <div className="nes-field is-inline col s12">
                  <label  className="label" htmlFor="username">Username</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.username}
                    error={errors.username}
                    name="username"
                    type="text"
                    className="nes-input nes-pointer neon1 input-box"
                  />
                </div>
                <div className="nes-field is-inline col s12">
                  <label className="label" htmlFor="password">Password</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    name="password"
                    type="password"
                    className="nes-input nes-pointer neon1 input-box"
                  />
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    type="submit"
                    className="loginBtn nes-pointer neon1 mb-3 nes-btn"
                    onClick={this.handleLoginFormSubmit}
                  >
                    Login
                  </button>
      
                </div>
              </form>
            </div>
          </div>
          </div>
        </div>
    );
  }
}
export default Login;