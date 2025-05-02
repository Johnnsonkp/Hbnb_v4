handleSwitch()
getPlacesData()
handleUserAuth()

window.addEventListener('beforeunload', () => {
  document.body.classList.add('fade-out');
});

async function getUserInfo(){
  try {
    const response = await fetch('http://127.0.0.1:5000/api/v1/users/current_user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch listings:', error);
  }
}

function handleUserAuth(){
  const dropDown = document.querySelector('.dropdown-button');
  const userAuthDetails = document.getElementById("user-auth-details");
  const userIsAuth = getJWTToken()

  if(userIsAuth){
    let div = document.createElement('div')

    getUserInfo()
      .then((data) => {
        if(data.first_name){
          dropDown.classList.add('auth-badge')
          dropDown.innerHTML = `<div class="inner-badge-div">${data.first_name[0]}</div>`

          userAuthDetails.innerHTML = `<div class="user-auth-dropdown">
            <div class="inner-badge">${data.first_name[0]}</div>
            ${data.first_name} ${data.last_name} 
            ${data.email}
          </div>`

        }else{
          console.log("isUserAuth", data.msg)
        }
    })
  }
  else {
    fetch('/static/svg/unAuthorisedUser.js')
      .then(res => res.text())
      .then(res => {
        const svgMatch = res.match(/<svg[\s\S]*?<\/svg>/);
        const matches = [...res.matchAll(/<svg[\s\S]*?<\/svg>/g)];
        dropDown[0].innerHTML = svgMatch;
      });
  }
}

function getJWTToken() {
  const jwtToken = localStorage.getItem('local_events_jwt')

  if (jwtToken) {
    console.log("getJWTToken", jwtToken)
    return jwtToken
  } else {
    console.warn("No token provided to save.");
  }
}


function getCities(arr){
  let cities_div = document.getElementById("cities")

  if(cities_div){
    cities_div.innerHTML += '<div class="div"></div>'
    cities_div.style.display = 'flex'
    cities_div.style.flexWrap = 'wrap'

    for(let i = 0; i < 5; i ++){

      getPicFromUnsplash(arr[i])
      .then((data) => {
        let params = new URLSearchParams({search: arr[i]});
        let url = `http://127.0.0.1:5000/listings?${params.toString()}`;

        let img_src = data.results[i].urls.full
        cities_div.innerHTML += `<a href="${url}" class="cities-card"> <img src="${img_src}" class="" lazy></img>  <span class="inner">${arr[i]}</span> </a>`
      })
    }
  }
}

async function loadRadialPoints(res){
  let origin = window.location.origin
  
  let radialCircle = document.getElementsByClassName('bg-circularLight');
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < res.length; i++) {
    let div = document.createElement('a');
    div.href = `${origin}/place/${res[i].id}` 

    div.classList.add("radial-pin");
    div.innerHTML = `<svg class="" fill="currentColor"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
        <path class=""
            d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </svg>`

    const angle = (i / res.length) * Math.PI * 2;
    const radius = 150 + Math.random() * 480;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    div.style.position = "absolute"; 
    div.classList.add("reverse-rotating")
    div.style.top = `${y}px`;
    div.style.left = `${x}px`;
    radialCircle[0].appendChild(div);
  }
}

function getPlacesData(){
  const filterContainer = document.getElementsByClassName('sponsor-container');
  let a = document.createElement('a');
  if (filterContainer){
    fetch('http://127.0.0.1:5000/api/v1/places/all')
      .then(res => res.json())
      .then(res => {
        let arr = []
        let city_arr = []
        let city_res = res

        loadRadialPoints(res)
        res.filter((listing_1) => !arr.includes(listing_1.property_type) && arr.push(listing_1.property_type))
        city_res.filter((listing_1) => !city_arr.includes(listing_1.city) && city_arr.push(listing_1.city))

        for(let i = 0; i < arr.length; i++){
          if(arr[i] !== null){
            let a = document.createElement('a');

            const params = new URLSearchParams({
              category: arr[i],
            });
          
            const url = `http://127.0.0.1:5000/listings?${params.toString()}`;

            a.classList.add("sponsor-link")
            a.style.padding = '5px'
            a.style.paddingLeft = '10px'
            a.style.paddingRight = '10px'
            a.style.borderRadius = '8px'
            a.style.backgroundColor = '#F4F4F4'
            a.style.color = '#333'
            a.style.fontWeight = '600'
            a.style.fontSize = '14px'
            a.href = url
            a.innerHTML = arr[i]
            filterContainer[0].appendChild(a);
          }
        }
        addPropertyTypesToDropDown(arr)
        getCities(city_arr)
    });
  }
}

async function handleSwitch(){
  const slideBtn = await document.querySelectorAll(".btn-switch")
  if (slideBtn){
    slideBtn.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        slideBtn[0].classList.remove('active')
        slideBtn[1].classList.remove('active')

        if(slideBtn[index].textContent == btn.textContent){
          btn.classList.toggle("active")
        }
      })
    })
  }
}

async function getPicFromUnsplash(city) {
  const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${city} location`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Version': 'v1',
      'Authorization': `Client-ID d7zJhS8h-i0PEiAIM5TgjKJswwA85CDDse62dQAaTb8`,
    },
    mode: 'cors'
  })
  const data = await response.json();
  return data;
}

document.getElementsByClassName('search-button')[0].addEventListener("click", function(event){
  event.preventDefault()

  const searchText = document.querySelector('.search-box-inner input[type="text"]').value;
  const category = document.querySelector('.select-input-field').value;
  const dateInputs = document.querySelectorAll('.date-input');
  const checkInDate = dateInputs[0].value;
  const checkOutDate = dateInputs[1].value;

  const params = new URLSearchParams({
    search: searchText,
    category: category,
    checkin: checkInDate,
    checkout: checkOutDate,
  });

  const url = `http://127.0.0.1:5000/listings?${params.toString()}`;
  return window.location.href = url
});

function addPropertyTypesToDropDown(arr){
  const category = document.querySelector('.select-input-field')

  for(let i = 0; i < arr.length; i++){
    if(arr[i] !== null){
      category.innerHTML += `<option value="${arr[i]}">${arr[i]}</option>`
    }
  }
}