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
      stationData: []
  };
}

componentDidMount(){
  //SPACE STATION DATA FETCH
  fetch('https://api.wheretheiss.at/v1/satellites/25544?units=miles')
  .then(response => response.json())
  .then(data => this.setState({stationData: data}));
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
            <Header />
            <DataCard station = {this.state.stationData}/>
            <Button
              type="button"
              className="refresh-button" 
              onClick={this.handleClick} 
              variant="outline-light"
              size="lg" >
              {'Refresh'}
            </Button>
            <Footer />
        </div>
    );
  }
}

export default App;


//FOR TESTING
// {/* {console.log(this.state.stationData)} */}
// {/* {console.log(this.state.coordinates)} */}


//   //MAP FETCH (NOT USING CURRENTLY)
//   fetch('https://api.wheretheiss.at/v1/coordinates/37.795517,-122.393693')
//   .then(response => response.json())
//   .then(data2 => this.setState({coordinates: data2}));
// }