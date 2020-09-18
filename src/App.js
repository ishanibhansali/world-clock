import React from 'react';
import './App.css';
import { Route,Link } from "react-router-dom";

// pages
import WeatherApp from './pages/worldclock/worldclock';
import NavBar from './pages/navbar/navbar';
import Stopwatch from './pages/stopwatch/stopwatch';
import Timer from './pages/timer/timer';



class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        modalState: true
    };
    this.handleShow = this.handleShow.bind(this);
  }

  handleShow() {
      this.setState({ modalState: !this.state.modalState });
  }
  render() {
    return (
      <div>
        <div className={"modal fade" + (this.state.modalState ? " show d-block" : " d-none")} id="centralModalWarning" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
          <div className="modal-dialog modal-notify modal-warning" role="document">
     
            <div className="modal-content" >
       
              <div className="modal-header">
                <p className="heading lead">Meet the World Clock!</p>

                <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={this.handleShow}>
                  <span aria-hidden="true" class="white-text">&times;</span>
                </button>
              </div>
       
              <div className="modal-body">
                <div className="text-center">
                  <img src="https://media.giphy.com/media/5trWFgPM0fKYTj5XrH/giphy.gif"></img>
                  <p>At its core, this clock application lets you add multiple cities to keep track of time, day of the week, and weather.</p>
                  <p>Search cities using the format name, country code, e.g., San Francisco, US. Click the Add City button to add the city to your home screen.</p>
                </div>
              </div>
       
              <div className="modal-footer justify-content-center">
                <a type="button" className="btn btn-outline-warning waves-effect" data-dismiss="modal" onClick={this.handleShow}>Skip</a>
              </div>
            </div>
     
          </div>
        </div>
      
        <div id="app">
          <NavBar/>
          <Route exact path = "/world-clock" component = {WeatherApp}/>
          {/* <Route exact path = "/alarm" component = {Alarm}/> */}
          <Route exact path = "/world-clock/timer" component = {Timer}/>
          <Route exact path = "/world-clock/stopwatch" component = {Stopwatch}/>   
        </div>
      </div>
    
    );
  }
}

export default App;

