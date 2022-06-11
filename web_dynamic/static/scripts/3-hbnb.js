function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function () {
  // DOM is loaded and ready for manipulation here
  let objetos = {};
  var checkbox = document.getElementsByClassName('pru');
  for (let x = 0; x < checkbox.length; x++) {
    checkbox[x].addEventListener('change', function () {
      if (checkbox[x].checked) {
        objetos[checkbox[x].getAttribute('data-name')] = checkbox[x].getAttribute('data-id');
      } else {
        delete objetos[checkbox[x].getAttribute('data-name')]
      }
      let nombre = Object.keys(objetos);
      document.getElementById('ame-select').innerHTML = nombre;
    });
  }

  apiStatus();
  fetchPlaces();

});

function apiStatus() {
  var req = new XMLHttpRequest();
  req.open('GET', 'http://0.0.0.0:5001/api/v1/status/', false);
  req.send(null);
  if (req.status == 200) {
    let conectado = document.getElementById('api_status');
    conectado.className = 'available';
  } else {
    let conectado = document.getElementById('api_status');
    conectado.className = '';
  }
}

function fetchPlaces() {
  // Ejemplo implementando el metodo POST:
  async function postData(url = '', data = {}) {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  postData('http://0.0.0.0:5001/api/v1/places_search/')
    .then(data => {
      console.log(data)
      for (const place of data) {
        console.log(place.name);
        var lugar=document.getElementById("buscar");
        let element = document.createElement("place");
        let textohtml = "<article><div class='title_box'><h2>" + place.name + "</h2><div class='price_by_night'>" + place.price_by_night + " $</div>" +
        "</div>" +
        "<div class='information'>" +
        "<div class='max_guest'>" + place.max_guest + "Guest(s)</div>" +
        "<div class='number_rooms'> " + place.number_rooms + "Bedroom(s)</div>" +
        "<div class='number_bathrooms'> " + place.number_bathrooms + "Bathroom(s)</div>" +
        "</div>" +
        "<div class='description'>" + place.description + "</div></article>";
        element.innerHTML=(textohtml);
        lugar.appendChild((element))
    } return data;
    });
}