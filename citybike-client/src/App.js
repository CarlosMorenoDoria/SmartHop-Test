import React from "react";
import socketIOClient from "socket.io-client";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import ReactDOM from 'react-dom';
import {IconLocation} from './components/iconlocation'
function App(){
  const endpoint= "http://127.0.0.1:4001";
  const socket = socketIOClient(endpoint,{'forceNew':true});
  
  let coords = {
    lat: 25.790654,
    lng: -80.1300455,
    zoom: 12
  };  
  const position=[coords.lat,coords.lng];
  let info ={}
  socket.on('messages', function(data){
    render(data)
  })
  function render(data) {
    info.data=data;
    let array = info.data.network.stations
    let element =
      <div className="map">
        <h1> City Bikes in Miami </h1>
        <Map center={position} zoom={coords.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            array.map(item => (
              <Marker  key={[item.latitude,item.longitude]} position={[item.latitude, item.longitude]} icon ={IconLocation}>
                <Popup>
                  Adress= {item.name} <br /> Empty Slots= {item.empty_slots}<br/> Free Bikes = {item.free_bikes}
                </Popup>
              </Marker>
            ))
          }
        </Map>
      </div>;
    
    ReactDOM.render(element, document.getElementById('root'));
  
  }  

  return (
    null 
    
);
}
export default App;
