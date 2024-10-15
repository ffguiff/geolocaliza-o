let h2 = document.querySelector('h2');

function success(pos){
    h2.textContent = `latitude:${pos.coords.latitude}, longitude${pos.coords.longitude}`;
}
function error(err){
    h2.textContent = `usuario não autorizou a pagina a receber a sua localização`;
}

var watchID = navigator.geolocation.watchPosition(success,error, {
    enableHighAccuracy : true, //pega a localização mais precisa do usuario
    timeout: 5000 //se demorar dms pra pegar a locazação do usuario desista tempo  de 5seg

});

//navigator.geolocation.clearWatch(watchID);