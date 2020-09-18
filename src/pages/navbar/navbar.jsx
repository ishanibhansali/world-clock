import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
    return (

      <nav className="navbar fixed-top navbar-expand-lg navbar-dark scrolling-navbar">


        <div className="container">
        
        
            <Link to="/world-clock" className="navbar-brand">
                <strong>World Clock</strong>
            </Link>
        
        
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
        
        
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
        
                
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">  
                    <Link to="/world-clock" className="nav-link" >Time
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/world-clock/stopwatch" className="nav-link" >Stopwatch</Link>
                </li>
                <li className="nav-item">
                    <Link to="/world-clock/timer" className="nav-link" >Timer</Link>
                </li>
                </ul>
        
        
            </div>
        
        
        </div>
        
      
      </nav>
            
    );
}

export default NavBar;