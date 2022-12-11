document.getElementById('userLogged').innerHTML = sessionStorage.getItem('user');
drawRidesTable();

function getRides() {
  const storedList = localStorage.getItem("localRidesList");
  if (storedList != null) {
    return JSON.parse(storedList);
  } 
  return [];
}
//

function drawRidesTable() {
  const list = getRides();
  const tbody = document.querySelector("#rideTable tbody");
  tbody.innerHTML = ""; // para agregar codigo en html
  let positionRow =0;
  for (let i = 0; i < list.length; i++) {
    if (list[i].user == sessionStorage.getItem("user")) {
      const row = tbody.insertRow(positionRow);
      positionRow++;
      const nameCell = row.insertCell(0);
      nameCell.innerHTML = list[i].rideName;
      const startCell = row.insertCell(1);
      startCell.innerHTML = list[i].start;
      const endCell = row.insertCell(2);
      endCell.innerHTML = list[i].end;

      const inputSelect = document.createElement("input");
      inputSelect.type = "radio";
      inputSelect.value = list[i].rideName;
      inputSelect.setAttribute("name", "select");
      const selectCell = row.insertCell(3);
      selectCell.appendChild(inputSelect);
      tbody.appendChild(row);
    }
  }
}
var rideNameSelected;

$("#rideTable tbody tr").on("click", function (e) {
    rideNameSelected = $(this)
    .addClass("selected")
    .siblings()
    .removeClass("selected")
    .end()
    .find('input[type="radio"]')
    .prop("checked", true)
    .val();
});

// funcion eliminar ride
function deleteRide() {
  let rides = [];
  const list = getRides();
  if (rideNameSelected !== undefined) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].rideName === rideNameSelected) {
        let confirmation = confirm(
          "Vas a eliminar el viaje: " + //You going to delete the ride:
            list[i].rideName +
            "¿Está seguro?" //. Are you sure?
        );
        if (confirmation) {
          rides = list;
          rides.splice(i, 1);
          localStorage.setItem("localRidesList", JSON.stringify(rides));
          drawRidesTable();
        } else {
          alert("Este viaje no ha sido eliminado.");//This ride has not been deleted
        }
      }
    }
  } else {
    alert("sSleccione un viaje para continuar");//Select a ride to continue
  }
}
//funcion para guardar cambios
function saveChanges() {
  let rides = [];
  const list = getRides();
  for (let i = 0; i < list.length; i++) {
    if (list[i].rideName === rideNameSelected) {
      rides = list;
      rides.splice(i, 1);
      localStorage.setItem("localRidesList", JSON.stringify(rides));
      editRideChanges();
      drawRidesTable();
    }
  }
  alert("Cambios guardados");//Changes saved
}

document.querySelector("#delete").addEventListener("click", deleteRide);
// funcion para ver ride
function loadRideForm(isReadOnly) {
  const list = getRides();
  alert(rideNameSelected);
  if (rideNameSelected !== undefined) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].rideName === rideNameSelected) {

        document.getElementById("rideName").readOnly = isReadOnly;
        document.getElementById("start").readOnly = isReadOnly;
        document.getElementById("end").readOnly = isReadOnly;
        document.getElementById("description").readOnly = isReadOnly;
        document.getElementById("start").readOnly = isReadOnly;
        document.getElementById("departure").readOnly = isReadOnly;
        document.getElementById("arrival").readOnly = isReadOnly;
        document.getElementById("editRide").disabled = isReadOnly;
        document.getElementById("reset").disabled = isReadOnly;


        document.getElementById("rideName").value = list[i].rideName;
        document.getElementById("start").value = list[i].start;
        document.getElementById("end").value = list[i].end;
        document.getElementById("description").value = list[i].description;
        document.getElementById("start").value = list[i].start;
        document.getElementById("departure").value = list[i].departure;
        document.getElementById("arrival").value = list[i].arrival;
        const days = list[i].days;
        const splitDays = days.split(", ");
        const radioDays = document.getElementsByName("day");
        for (let x = 0; x < radioDays.length; x++) {
          if (splitDays.includes(radioDays[x].value)) {
            radioDays[x].checked = true;
          } 
        }
      }
    }
  } else {
    alert("Seleccione un viaje para continuar"); // Select a ride to continue
  }
}


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
// funcion editar ride
function editRideChanges() { 
  let rides = getRides();
  let rideName = document.querySelector("#rideName").value;
  let start = document.querySelector("#start").value;
  let end = document.querySelector("#end").value;
  let description = document.querySelector("#description").value;
  let departure = document.querySelector("#departure").value;
  let arrival = document.querySelector("#arrival").value;
  const editedRide = {
    user: sessionStorage.getItem("user"),
    rideName: rideName,
    start: start,
    end: end,
    description: description,
    departure: departure,
    arrival: arrival,
    days: selectedDays,
  };
  rides.push(editedRide);
  localStorage.setItem("localRidesList", JSON.stringify(rides));
  alert("Se han guardado los cambios.");//Your changes have been saved.
}
document.querySelector("#editRide").addEventListener("click", saveChanges);
