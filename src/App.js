import React, {Component} from 'react';
import './App.css';
import { Header } from './components/header/header.component.jsx';
import { Footer } from './components/footer/footer.component.jsx';
import { DataCard } from './components/data-card/data-card.component.jsx';
import { Button } from 'react-bootstrap';

class App extends Component {

  constructor() {
    super();
  this.state ={
      stationData: [],
      coordinates: []
  };
}

componentDidMount(){
  //SPACE STATION DATA FETCH
  fetch('https://api.wheretheiss.at/v1/satellites/25544?units=miles')
  .then(response => response.json())
  .then(data => this.setState({stationData: data}));
  
  //MAP FETCH
  fetch('https://api.wheretheiss.at/v1/coordinates/37.795517,-122.393693')
  .then(response => response.json())
  .then(data2 => this.setState({coordinates: data2}));
}
  

  //Refresh Data when button clicked
 handleClick = () => {
   fetch('https://api.wheretheiss.at/v1/satellites/25544?units=miles')
  .then(response => response.json())
  .then(data => this.setState({stationData: data}));
 }



render() {
  return(
        <div className= "container">
          {/* {console.log(this.state.stationData)} */}
          {/* {console.log(this.state.coordinates)} */}
            <Header />
            <DataCard station = {this.state.stationData}/>
            <Button
              type="button" 
              onClick={this.handleClick} 
              variant="primary"> Refresh
            </Button>
            <div className="map-section">
              <a href={this.state.coordinates.map_url}>See Map (****Still working on****) </a>
            </div> 
            <Footer />
        </div>
    );
  }
}

export default App;
