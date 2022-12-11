function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      mapTypeControl: false,
      center: { lat: 9.748917, lng: -83.753428},//la actual es ciudad Quesada// prueba: lat: -33.8688, lng: 151.2195 sidni
      zoom: 13, //coordenadas
    });
    new AutocompleteDirectionsHandler(map);
  }
  
  class AutocompleteDirectionsHandler {
    constructor(map) {
      this.map = map;
      this.originPlaceId = "";
      this.destinationPlaceId = "";
      this.travelMode = google.maps.TravelMode.WALKING;
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(map);
      const originInput = document.getElementById("origin-input");
      const destinationInput = document.getElementById("destination-input");
      const modeSelector = document.getElementById("mode-selector");
      const originAutocomplete = new google.maps.places.Autocomplete(originInput);
      //Especifique solo los campos de datos de lugar que necesita.
      originAutocomplete.setFields(["place_id"]);
      const destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput
      );
      // Especifique solo los campos de datos de lugar que necesita.
      destinationAutocomplete.setFields(["place_id"]);
      //
  
      this.setupClickListener(
        "changemode-transit",
        google.maps.TravelMode.TRANSIT
      );
      this.setupClickListener(
        "changemode-driving",
        google.maps.TravelMode.DRIVING
      );
      this.setupPlaceChangedListener(originAutocomplete, "ORIG");
      this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
  
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
    }
    // Establece un oyente en un botón de radio para cambiar el tipo de filtro en Lugares
    // Autocomplete.
    setupClickListener(id, mode) {
      const radioButton = document.getElementById(id);
      radioButton.addEventListener("click", () => {
        this.travelMode = mode;
        this.route();
      });
    }
    setupPlaceChangedListener(autocomplete, mode) {
      autocomplete.bindTo("bounds", this.map);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
  
        if (!place.place_id) {
          window.alert("Seleccione una opción de la lista desplegable"); //Please select an option from the dropdown list
          return;
        }
  
        if (mode === "ORIG") {
          this.originPlaceId = place.place_id;
        } else {
          this.destinationPlaceId = place.place_id;
        }
        this.route();
      });
    }
    route() {
      if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
      }
      const me = this;
      this.directionsService.route(
        {
          origin: { placeId: this.originPlaceId },
          destination: { placeId: this.destinationPlaceId },
          travelMode: this.travelMode,
        },
        (response, status) => {
          if (status === "OK") {
            me.directionsRenderer.setDirections(response);
          } else {
            window.alert("Solicitud de indicaciones fallida debido a" + status); //Directions request failed due to 
          }
        }
      );
    }
  }
  
  function getRides() {
    const storedList = localStorage.getItem("localRidesList");
    if (storedList != null) {
      return JSON.parse(storedList);
    } 
    return [];
  }
  
  function findRide(){
    const originInput = document.getElementById("origin-input").value;
      const destinationInput = document.getElementById("destination-input").value;
      const list = getRides();
      const tbody = document.querySelector("#rideTable tbody");
      tbody.innerHTML = "";
      let positionRow =0;
      for (var i = 0; i < list.length; i++) {
        if ((list[i].start == originInput)&&(list[i].end == destinationInput)) {
          var row = tbody.insertRow(positionRow);
          positionRow++;
          var nameCell = row.insertCell(0);
          nameCell.innerHTML = list[i].user;
          var startCell = row.insertCell(1);
          startCell.innerHTML = list[i].start;
          var endCell = row.insertCell(2);
          endCell.innerHTML = list[i].end;
          tbody.appendChild(row);
        }
      }
  
  }