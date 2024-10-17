let h2 = document.querySelector('h2');
var map;
var marker;

function success(pos) {
    h2.textContent = `latitude: ${pos.coords.latitude}, longitude: ${pos.coords.longitude}`;

    if (map === undefined) {
        map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 13);
    } else {
        map.remove();
        map = L.map('mapid').setView([pos.coords.latitude, pos.coords.longitude], 13);
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adiciona o marcador com a opção "draggable: true"
    marker = L.marker([pos.coords.latitude, pos.coords.longitude], { draggable: true }).addTo(map)
        .bindPopup('Você está aqui!')
        .openPopup();

    // Listener para capturar a nova posição do marcador após arrastá-lo
    marker.on('dragend', function (e) {
        var newPos = e.target.getLatLng();
        h2.textContent = `Nova posição: Latitude: ${newPos.lat}, Longitude: ${newPos.lng}`;
        marker.setLatLng(newPos).update();  // Atualiza o marcador com a nova posição
    });
}

function error(err) {
    h2.textContent = `Erro ao obter localização: ${err.message}`;
}

var watchID = navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true, // Obter a localização mais precisa possível
    timeout: 5000, // Tempo de espera máximo de 5 segundos
    maximumAge: 0  // Não usa localização em cache
});
