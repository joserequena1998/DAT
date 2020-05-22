let latitud=39.3241472;
let longitud=-3.4834814;
let zoom = 14;

let map = L.map('map').setView([latitud,longitud], zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.on('click', function(e){
  setPointData(e.latlng);
})

map.on('click', function(e){
  setPointData1(e.latlng);
})

function setPointData1(position) {
  document.getElementById('lat1').innerHTML = position.lat;
  document.getElementById('lng1').innerHTML = position.lng;
}

function setPointData(position) {
  document.getElementById('lat').innerHTML = position.lat;
  document.getElementById('lng').innerHTML = position.lng;
}

let marker = L.marker([latitud,longitud], {
  draggable: 'true'
}).addTo(map);


marker.on('dragstart', function() { // Elemento dragstar ==> donde hemos empezado a arrastrar
	let position1 = marker.getLatLng(); //Creamos una nueva posición
  marker
    .setLatLng(position1) //Se guarda posicion
    .bindPopup(position1)
    .update();
  setPointData1(position1); //Lammanos a la funcion SetPointData para obtener así la long como la lat
});

marker.on('dragend', function() { // Elemento dragend ==> cuando hemos terminado de arrastrar
  let position = marker.getLatLng(); //Creamos una nueva posición
  marker
    .setLatLng(position) //Cuando se deje de arrastrar el marcador se guarda las coordenadas en la que se está
    .bindPopup(position)
    .update();
  setPointData(position); //Lammanos a la funcion SetPointData para obtener así la long como la lat
});
