//jshint esversion:6
//jshint esversion:8

import React, {Component} from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
  this.state ={
    timestamp: null,
    positionLat: null,
    positionLon:null,
    altitude: null,
    velocity: null,
    visibility: null,
    units: "miles",
    map_url : ""

  };
}

  async componentDidMount(){
    const url ='https://api.wheretheiss.at/v1/satellites/25544?units=miles';
    const response =await fetch(url);
    const data = await response.json();
    this.setState({ timestamp : data.timestamp });
    this.setState({ visibility : data.visibility });
    this.setState({ positionLat : data.latitude });
    this.setState({ positionLon : data.longitude});
    this.setState({ velocity : data.velocity });
    this.setState({ altitude : data.altitude });

    const url2 ='https://api.wheretheiss.at/v1/coordinates/37.795517,-122.393693';
    const response2 =await fetch(url2);
    const data2 = await response2.json();
    this.setState({ map_url : data2.map_url });
}



render() {
  return(
    <div>
      {this.state.timstamp ?  (
        <div>loading...</div>
      ) : (

        <div className= "container">
          <h1 className="title">Where is the ISS?</h1>
          <div>
            <div className="space"><span role="img" aria-label="Rocket">🚀🚀🚀🚀🚀🚀</span></div>
            <div className= "info">24-Hour Clock: {this.dateConverter()}</div>
            <div className= "info">Current View: {this.state.visibility}</div>
            <div className="space"><span role="img"aria-label="Clock">⏲⏲⏲⏲⏲⏲</span></div>
            <div className= "info">Latitude: {this.state.positionLat}</div>
            <div className="space"></div>
            <div className= "info">Longitude: {this.state.positionLon}</div>
            <div> <a href={this.state.map_url}>See Map (****Still working on****) </a></div>

            <div className="space"><span role="img" aria-label="Compass">🧭🧭🧭🧭🧭🧭</span></div>
            <div className= "info">How Fast: {this.numberRoundVel()}</div>
            <div className= "info">How High: {this.numberRoundAlt()}</div>
            <div className= "info">Units of Measurement: {this.state.units}</div>
          </div> 
        </div>
      )}
    </div>
  );

}
  dateConverter =() => {
    var unix_timestamp = this.state.timestamp;
    var date= new Date(unix_timestamp *1000);
    var hours= date.getHours();
    var minutes ="0" + date.getMinutes();
    var seconds= "0" + date.getSeconds();
    var formatedTime= hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formatedTime;
  }

  numberRoundAlt = () => {
    var roundAlt = this.state.altitude
    var roundedAlt= (Math.floor(roundAlt * 100))/100
    return roundedAlt
  }


  numberRoundVel = () => {
  var roundVel = this.state.velocity
  var roundedVel= (Math.floor(roundVel * 100))/100
  return roundedVel
  }

}

export default App;
