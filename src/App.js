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
    positionLon:null
  };
}

  async componentDidMount(){
    const url ='http://api.open-notify.org/iss-now.json';
    const response =await fetch(url);
    const data = await response.json();
    this.setState({ timestamp : data.timestamp });
    this.setState({ positionLat : data.iss_position.latitude });
    this.setState({ positionLon : data.iss_position.longitude});
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
            <div className= "info">24-Hour Clock:{this.dateConverter()}</div>
            <div className="space"><span role="img"aria-label="Clock">⏲⏲⏲⏲⏲⏲</span></div>
            <div className= "info">Latitude:{this.state.positionLat}</div>
            <div className="space"></div>
            <div className= "info">Longitude:{this.state.positionLon}</div>
            <div className="space"><span role="img" aria-label="Compass">🧭🧭🧭🧭🧭🧭</span></div>
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

}

export default App;
