function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function() {
  // DOM is loaded and ready for manipulation here
  let objetos = {};
  var checkbox = document.getElementsByClassName('pru');
  for (let x = 0; x < checkbox.length; x++){
    checkbox[x].addEventListener( 'change', function() {
      if(checkbox[x].checked) {
        objetos[checkbox[x].getAttribute('data-name')] = checkbox[x].getAttribute('data-id');
      } else {
        delete objetos[checkbox[x].getAttribute('data-name')]
      }
      let nombre = Object.keys(objetos);
      document.getElementById('ame-select').innerHTML = nombre;
    });
  }

  apiStatus();

});

function apiStatus () {
  var req = new XMLHttpRequest();
  req.open('GET', 'http://0.0.0.0:5001/api/v1/status/', false);
  req.send(null);
  if (req.status == 200){
    let conectado = document.getElementById('api_status');
    conectado.className = 'available';
  } else {
    let conectado = document.getElementById('api_status');
    conectado.className = '';
  }
}