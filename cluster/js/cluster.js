let map = L.map('map').fitWorld();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function eachLayer(layer) { //Pasa cada marcador a formato GeoJSON
  const layerData = layer.toGeoJSON();

  layer.bindPopup(`<h3>${layerData.properties.Nombre}</h3>`); //Fijo en nombre en cada popUp para una vez que pichemos ver el nombre de lo que se trata
}

let layer = omnivore.csv('/cluster/data/actividades.csv', { //para capturar la información de un fichero csv
  latfield: 'Latitud', //Cojo los datos de latitud proporcionados en el csv
  lonfield: 'Longitud', //Cojo los datos de longitud proporcionados en el csv
  delimiter: ';'
  })
  .on('ready', function() {
    map.fitBounds(layer.getBounds()); //Centrar en los datos que tenemos

    let markers = L.markerClusterGroup({ //
      showCoverageOnHover: true, // muestra los bordes que alcanza
      maxClusterRadius: 50 // pixels
    });
    markers.addLayer(layer);//Añado los marcadores al cluster Group
    map.addLayer(markers); //Añado capa de marcadores al mapa

    layer.eachLayer(eachLayer);

  })
  .on('error', function(error) {
    console.log('error')
    console.log(error);
  });
