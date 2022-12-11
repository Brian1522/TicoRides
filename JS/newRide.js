document.getElementById('userLogged').innerHTML = sessionStorage.getItem('user');

let selectedDays;
function getCheckboxValues(form) {
  let values = [];
  const days = form.day;

  for (let i = 0, iLen = days.length; i < iLen; i++) {
    if (days[i].checked) {
      values.push(days[i].value);
    }
  }
  selectedDays = values.join(", ");
}
//

document.querySelector("#createRide").addEventListener("click", saveRide);
function saveRide() {
  const rideName = document.querySelector("#rideName").value;
  const start = document.querySelector("#start").value;
  const end = document.querySelector("#end").value;
  const description = document.querySelector("#description").value;
  const departure = document.querySelector("#departure").value;
  const arrival = document.querySelector("#arrival").value;

  if (rideName && start && end && description && departure && arrival) {
    const newRide = {
      user: sessionStorage.getItem("user"),
      rideName: rideName,
      start: start,
      end: end,
      description: description,
      departure: departure,
      arrival: arrival,
      days: selectedDays,
    };
    console.log(newRide);
    let rides = getRides();
    rides.push(newRide);
    localStorageRidesList(rides);
    alert("¡Tu viaje ha sido registrado con éxito!"); //Your ride has been registered successfully!

    document.querySelector("#rideName").value="";
  document.querySelector("#start").value="";
  document.querySelector("#end").value="";
  document.querySelector("#description").value="";
  document.querySelector("#departure").value="--:--";
  document.querySelector("#arrival").value="--:--";

  } else {
    alert("Debes llenar todos los espacios"); //You must fill all the spaces
  }
}

function getRides() {
  const storedList = localStorage.getItem("localRidesList");
  if (storedList != null) {
    return JSON.parse(storedList);
  }
  return [];
}

function localStorageRidesList(rides) {
  localStorage.setItem("localRidesList", JSON.stringify(rides));
}

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    mapTypeControl: false,
    center: { lat: 10.34375, lng: -84.42886}, //coordenadas ecocampus
    zoom: 13,
  });
  new AutocompleteDirectionsHandler(map);
}
// autocompletador api google maps
class AutocompleteDirectionsHandler {
  constructor(map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.WALKING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);
    const originInput = document.getElementById("start");
    const destinationInput = document.getElementById("end");
    const originAutocomplete = new google.maps.places.Autocomplete(originInput);
    // Especifique solo los campos de datos del lugar que necesita
    originAutocomplete.setFields(["place_id"]);
    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput
    );
    // Especifique solo los campos de datos del lugar que necesita
    destinationAutocomplete.setFields(["place_id"]);

    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
  }
  //Establece un oyente en un botón de radio para cambiar el tipo de filtro en Lugares
   // Autocompletar.
}
