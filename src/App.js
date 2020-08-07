import React, {Component} from 'react';
import './App.css';
import { Header } from './components/header/header.component.jsx';
import { Footer } from './components/footer/footer.component.jsx';
import { DataCard } from './components/data-card/data-card.component.jsx';
import { Button } from 'react-bootstrap';

const API = 'https://api.wheretheiss.at/v1/satellites/25544?units=miles';


class App extends Component {
  constructor() {
    super();
  this.state ={
      stationData: [],
      isLoading: false,
      error: null
  };
}

//SPACE STATION DATA FETCH
componentDidMount(){
  this.setState({ isLoading: true });
  fetch(API)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .then(data => this.setState({stationData: data, isLoading: false}))
    .catch(error => this.setState({ error, isLoading: false }));
}
  

  

  //Refresh Data when button clicked
 
  handleClick = () => {

  fetch(API)
    .then(response => response.json())
    .then(data => this.setState({stationData: data}));
  }





render() {
  const { stationData, isLoading, error } = this.state;

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return(
        <div className= "container">
            <Header />
            <DataCard station = {stationData}/>
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
