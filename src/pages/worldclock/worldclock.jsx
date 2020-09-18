import React from 'react';
import moment from 'moment';
import 'moment-timezone';
import './worldclock.scss';

var cityTimezones = require('city-timezones');

export default class WeatherApp extends React.Component {
    constructor() {
      super();
      this.state = {
        currentTime: moment(),
        cities: {}
      }
    }
    componentDidMount() {
      window.setInterval(() => this.setState({ currentTime: moment() }), 5000)
    }
    myFunction (name,timezone) {
        this.setState({cities: Object.assign(this.state.cities, {[name]: timezone})
        });
    }

    getInputValue(){
      let inputVal = document.getElementById("myInput").value;
      if (inputVal.indexOf(',') === -1) {
        alert('Please separate the name of the city and the country code with a comma! e.g., San Francisco, US')
        return;
      }
      let str1 = inputVal.substring(0, inputVal.indexOf(','));
      let str2 = inputVal.substring(inputVal.indexOf(',')+1, inputVal.length);
      str1 = str1.trim();
      str2 = str2.replace(/\s/g,'');
      str2 = str2.toUpperCase();
      const cityLookup = cityTimezones.lookupViaCity(str1);
      if (cityLookup.length  === 0) {
        alert('Please enter a valid city!');
        return;
      }
      let inputTimezone;
      for (let i = 0; i < cityLookup.length; i++) {
        let country = cityLookup[i].country;
        country = country.replace(/\s/g,'');
        country = country.toUpperCase();
        if (cityLookup[i].iso2 === str2 || cityLookup[i].iso3 === str2 || country === str2) {
          inputTimezone = cityLookup[i].timezone;;
        }
      }
      if (!inputTimezone) {
        alert('Please enter a valid country code! e.g., US or USA');
        return;
      }
      this.myFunction(str1,inputTimezone);
    }

    render() {
      const { cities, currentTime } = this.state;
      return (
        <div>
        <div className="panels" style={{position: "relative"}}>
          {
            Object
              .keys(cities)
              .map(cityName =>
                   <City name= {cityName}
                         timeZone = {cities[cityName]}
                         currentTime = {currentTime}
                         key={cityName}
                   />)
          }
        </div>  
        <div className="form-inline md-form mr-auto mb-4" style={{position: "absolute", bottom: 40, right:60}}>
        <input className="form-control mr-sm-2" type="text" placeholder="Enter City, Country Code e.g. New York, US" id="myInput" style={{width: 300}}/>
        <button className="btn purple-gradient btn-sm my-0 waves-effect waves-light" type="submit" onClick={() => this.getInputValue()} >Add City</button>
      </div> 
      </div>
      )
      
    }
  }
  
  class City extends React.Component {
    constructor(props) {
      super(props);
      const { timeZone, currentTime } = this.props;
      this.state = {
              weatherData: {},
              localTime: currentTime.tz(timeZone).format('HH:mm dddd'),
              currentHour: currentTime.tz(timeZone).format('HH'),
              open: false,
              bgGradient: ''
      }
      this.getWeatherInfo = this.getWeatherInfo.bind(this);
      this.updateCurrentTime = this.updateCurrentTime.bind(this);
      this.toggleOpen = this.toggleOpen.bind(this);
    };
    async getWeatherInfo(id) {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${id}&units=metric&appid=f641c437ce774025fb4d9ae68b01b5a5`).then(res => res.json());
      const weatherInfo = {
        temp: res.main.temp,
        desc: res.weather[0].main,
        icon: `icon-${res.weather[0].icon}`
      };
      this.setState({
        weatherData: weatherInfo
      })
    }
    setGradient(currentHour) {
        if (currentHour < 3) {
          this.setState({ bgGradient : 'night-2'});
        } else if (currentHour < 6) {
          this.setState({ bgGradient : 'dawn'});
        } else if (currentHour < 9) {
          this.setState({ bgGradient : 'morning'});
        } else if (currentHour < 12) {
          this.setState({ bgGradient : 'afternoon-1'});
        } else if (currentHour < 15) {
          this.setState({ bgGradient : 'afternoon-2'});
        } else if (currentHour < 18) {
          this.setState({ bgGradient : 'evening-1'});
        } else if (currentHour < 21) {
          this.setState({ bgGradient : 'evening-2'});
        } else if (currentHour < 24) {
          this.setState({ bgGradient : 'night-1'});
        }
    }
    updateCurrentTime() {
      const { timeZone, currentTime } = this.props;
      this.setState({ localTime: currentTime.tz(timeZone).format('dddd HH:mm') });
      this.setGradient(this.state.currentHour);
    }
    componentDidMount() {
      const { name } = this.props;
      this.getWeatherInfo(name);
      window.setInterval(() => this.updateCurrentTime(), 5000);
      this.setGradient(this.state.currentHour);
    }
    toggleOpen() {
      const currentState = this.state.open;
      this.setState({ open: !currentState });
    }
    render() {
      const { name, bgImg } = this.props;
      const { localTime } = this.state;
      const { desc, temp, icon } = this.state.weatherData;
      const activeClass = this.state.open ? 'open': '';
      const gradientClass = this.state.bgGradient;
      return (
        <div className={`panel ${activeClass} ${gradientClass}`}
             onClick={this.toggleOpen}
          >
          <div>
            <h2>{ name }</h2>
            <p>{ localTime }</p>
          </div>
            <div className="weather-icon">
              <i className={icon}></i>
          {temp ?
              <span> { desc } { temp }°C </span>
              : ''
          }
            </div>
        </div>
      )
    }
  }




  


