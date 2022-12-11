document.querySelector("#createUser").addEventListener("click", saveUser);
function saveUser() {
  let name = document.querySelector("#name").value;
  let lastName = document.querySelector("#lastName").value;
  let phone = document.querySelector("#phone").value;
  let password = document.querySelector("#password").value;
  let confirmPassword = document.querySelector("#confirmPassword").value;
  if (name && lastName && phone && password && confirmPassword) {
    if (password == confirmPassword) {
      const newUser = {
        name: name,
        lastName: lastName,
        phone: phone,
        password: password,
        speedAverage: "",
        aboutMe: "",
      };
      console.log(newUser);
      let users = getUsers();
      users.push(newUser);
      localStorageUserList(users);

      alert("¡Se ha registrado exitosamente!"); //You have successfully registered!
      document.querySelector("#name").value = "";
      document.querySelector("#lastName").value = "";
      document.querySelector("#phone").value = "";
      document.querySelector("#password").value = "";
      document.querySelector("#confirmPassword").value = "";
    } else {
      alert("¡Las contraseñas no coinciden!"); //Passwords do not match
    }
  } else {
    alert("Debes llenar todos los espacios"); //You must fill all the spaces
  }
}

function getUsers() {
  const storedList = localStorage.getItem("localUserList");
  if (storedList != null) {
    return JSON.parse(storedList);
  }
  return [];
}

function localStorageUserList(users) {
  localStorage.setItem("localUserList", JSON.stringify(users));
}
//