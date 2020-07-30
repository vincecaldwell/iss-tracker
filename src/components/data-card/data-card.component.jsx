
import React from 'react';
import "./data-card.styles.css";
 

//rounds numbers to 2 decimal places
const roundNumber = (props) => {
var currentNumber = props;
var roundedNumber= (Math.floor(currentNumber * 100))/100;
return roundedNumber
}


//Converts from unix timestamp to 24 hour clock
const dateConverter = (props) => {
    var unix_timestamp = props;
    var date= new Date(unix_timestamp *1000);
    var hours= date.getHours();
    var minutes ="0" + date.getMinutes();
    var seconds= "0" + date.getSeconds();
    var formatedTime= hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formatedTime;}


//EXPORT of information
export const DataCard = ({station, dateFormat}) => (
    <div className="data-container">
        <div className="space">
            <span role="img" aria-label="Rocket">🚀🚀🚀🚀🚀🚀</span>
        </div>
        <div className= "info">Name: {station.name}</div>
        <div className= "info ">24-Hour Clock: {dateConverter(station.timestamp)}</div>
        <div className= "info">Current View: {station.visibility}</div>
        {/* <div className= "info">Units of Measurement: {station.units}</div> */}
        <div className="space">
            <span role="img" aria-label="Compass">🧭🧭🧭🧭🧭🧭</span>
        </div>
        <div className= "info">Latitude: {station.latitude}</div>
        <div className= "info">Longitude: {station.longitude}</div>
        <div className= "info">How Fast: {roundNumber(station.velocity)} mph</div>
        <div className= "info">How High: {roundNumber(station.altitude)} miles</div>
    </div>
)