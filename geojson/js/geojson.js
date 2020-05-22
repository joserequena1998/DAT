let map = L.map('map').fitWorld();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let geojson;

fetch('/geojson/data/pintxos-euskadi.geojson') //Capturar la informacion del geojson
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    setDataProperties(json);
    map.fitBounds(geojson.getBounds()); //Para centrarme en el mapa de donde estoy.
  })

function setDataProperties(json) {
  geojson = L.geoJSON(json, {
    style: function(feature) {

      return {
        weight: 3,
      }
    }
  })
  .bindPopup(function(layer){
    return layer.feature.properties.documentname + "<br>" + layer.feature.properties.address + "<br>" + layer.feature.properties.phone;
  })
  .addTo(map);
}
