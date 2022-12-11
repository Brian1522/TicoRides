function validateLogin() {
    let user = document.getElementById("user").value;
    let password = document.getElementById("passwordUser").value;
    let status = false;
    const list = getUsers();
    for (let i = 0; i < list.length; i++) {
      if (list[i].name == user && list[i].password == password) {
        status = true;
        break;
      } 
    }
    if(status){
        window.location="../dashboard/dashboard.html";
        sessionStorage.setItem('user',user)
        clearInput();
        
    }else{
        alert('Datos Incorrectos');//Incorrect data
    }
  }
  
  //
  
  let inputfocused = "";
  let elements = document.querySelectorAll("input[type='text'],input[type='password']");
  // Por cada input field le añadimos una funcion 'onFocus'
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("focus", function() {
      // Guardamos la ID del elemento al que hacemos 'focus'
      inputfocused = this;
    });
  }
  
  function clearInput() {
    //Utilizamos el elemento al que hacemos focus para borrar el campo.
    inputfocused.value = "";
  }