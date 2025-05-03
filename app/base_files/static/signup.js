document.getElementById('signupForm').addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const base_url = window.location.origin

  await fetch(`${base_url}/api/v1/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      password: form.password.value
    })
  })
    .then(res => res.json())
    .then(data => {
      handleStatus(data)
      console.log('Success:', data)
    })
    .catch(error => console.error('Error:', error));
}

function handleStatus(status){
  let statusBar = document.getElementById("status-bar")
  let successBar = document.getElementById("success-bar")
  let errorBar = document.getElementById("error-bar")

  if(status.message){
    successBar.style.display = "block"
    if(successBar){
      let successTxt = document.querySelector(".success-text")
      successTxt.innerHTML = status.message
    }
    setTimeout(() => {successBar.style.display = "none"}, 3000);
  }
  else{
    errorBar.style.display = "block"
    if(errorBar){
      let errorTxt = document.querySelector(".error-text")
      errorTxt.innerHTML = status.error
    }
    setTimeout(() => {errorBar.style.display = "none"}, 3000);
  }
}

function loadSVG() {
  const searchIcon = document.getElementsByClassName('search-button');
  const dropDown = document.getElementsByClassName('dropdown-button');
  if (searchIcon){
      fetch('/static/svg/searchIcon.js')
        .then(res => res.text())
        .then(res => {
          const svgMatch = res.match(/<svg[\s\S]*?<\/svg>/);
          const matches = [...res.matchAll(/<svg[\s\S]*?<\/svg>/g)];
          searchIcon[0].innerHTML = svgMatch;
        });
  }
  if (dropDown){
      fetch('/static/svg/userIcon.js')
        .then(res => res.text())
        .then(res => {
          const svgMatch = res.match(/<svg[\s\S]*?<\/svg>/);
          const matches = [...res.matchAll(/<svg[\s\S]*?<\/svg>/g)];
          dropDown[0].innerHTML = svgMatch;
        });
    }
}