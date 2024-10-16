let h2 = document.querySelector('h2');
var map;

function success(pos){
    h2.textContent = `latitude:${pos.coords.latitude}, longitude${pos.coords.longitude}`;

    if (map === undefined){
        map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 13);
    } else {
        map.remove();
        map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 13);
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
        .bindPopup('você está aqui!')
        .openPopup();
}
function error(err){
    h2.textContent = `Erro ao obter localização`;
}

var watchID = navigator.geolocation.watchPosition(success,error, {
    enableHighAccuracy : true, //pega a localização mais precisa do usuario
    timeout: 5000, //se demorar dms pra pegar a locazação do usuario desista tempo  de 5seg
    maximumAge: 0 
});

//navigator.geolocation.clearWatch(watchID);

