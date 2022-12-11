document.getElementById('userLogged').innerHTML = sessionStorage.getItem('user');

function getUser() {
  const storedList = localStorage.getItem("localUserList");
  if (storedList != null) {
    return JSON.parse(storedList);
  }
  return [];
}

function loadUserForm() {
  const list = getUser();
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === sessionStorage.getItem("user")) {
      document.getElementById("fullName").readOnly = true;
      document.getElementById("fullName").value =
        list[i].name + " " + list[i].lastName;
      document.getElementById("speedAverage").value = list[i].speedAverage;
      document.getElementById("aboutMe").value = list[i].aboutMe;
    }
  }
}
function editUserChanges() {
  const users = getUser();
  const speedAverage = document.querySelector("#speedAverage").value;
  const aboutMe = document.querySelector("#aboutMe").value;
  for (let i = 0; i < users.length; i++) {
  if (users[i].name === sessionStorage.getItem("user")) {
    users[i].speedAverage = speedAverage;
    users[i].aboutMe = aboutMe;
  }}
  localStorage.setItem("localUserList", JSON.stringify(users));
  alert("Se han guardado los cambios"); //Your changes have been saved.
}
