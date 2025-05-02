
let submitBtn = document.querySelector('.submit-btn')
// document.getElementById('loginForm').addEventListener('submit', handleSubmit);
document.getElementById('loginForm').addEventListener('click', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  const loadSpinner = `<div class="loader"></div>`;
  submitBtn.innerHTML = ""
  submitBtn.innerHTML = loadSpinner
  submitBtn.classList.add("loading")
  const form = event.target;

  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: form.email.value,
        password: form.password.value
      })
    });
    const data = await response.json();
    handleStatus(data);

    if (data.access_token) {
      console.log('Success:', data);
      saveJWTToken(data.access_token)
      handleNavigate(data.access_token)
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function saveJWTToken(token) {
  if (token) {
    localStorage.setItem('local_events_jwt', token);
  } else {
    console.warn("No token provided to save.");
  }
}

function getJWTToken() {
  const jwtToken = localStorage.getItem('local_events_jwt')

  if (jwtToken) {
    return jwtToken
  } else {
    console.warn("No token provided to save.");
  }
}

const callback = async (token) => {
  console.log("callback", token)

  try {
    return fetch('http://127.0.0.1:5000/api/v1/auth/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({token: token}),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    })

  } catch (error) {
    console.error('Error:', error);
  }
}


function handleNavigate(token){
  setTimeout(() => {
    submitBtn.innerHTML = "Sign in"
    callback(token)
    // window.location.href = "/listings";
  }, [3000])
}


function handleStatus(response){
  let statusBar = document.getElementById("status-bar")
  let successBar = document.getElementById("success-bar")
  let errorBar = document.getElementById("error-bar")
  let fixedNav = document.querySelector('.header-container')

  if(response.access_token){
    successBar.style.display = "absolute"
    statusBar.style.display = "absolute"
    successBar.style.zIndex = 9999999999
    statusBar.style.zIndex = 9999999999

    fixedNav.style.display = 0

    if(successBar){
      let successTxt = document.querySelector(".success-text")
      successTxt.innerHTML = "User successfully signed in"
    }
    setTimeout(() => {successBar.style.display = "none"}, 3000);
    setTimeout(() => {statusBar.style.display = "none"}, 3000);
    setTimeout(() => {fixedNav.style.display = 9999999999}, 3000);
  }
  else{
    errorBar.style.display = "block"
    if(errorBar){
      let errorTxt = document.querySelector(".error-text")
      errorTxt.innerHTML = response.error
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