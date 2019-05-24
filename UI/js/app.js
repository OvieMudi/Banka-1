"use strict";
const userLocation = window.location.href;

const goto = (path) => {
  window.location.href = `https://oviemudi.github.io/Banka-1/UI/${path}.html`;
};

const changeElementChildText = (elem, text, status=true) => {
  let originText = elem.innerText;
  if (status) {
    elem.innerText = text;
  } else {
    elem.innerText = originText;
  }
};

const handleUserSingin = () => {
  const loginBtn = document.querySelector('#loginButton');
  const signinForm = document.querySelector('#signinForm');
  const errorMsg = document.querySelector('#errorMsg');
  signinForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    changeElementChildText(loginBtn, 'Please wait...', true);
    const email = e.target.email.value,
          password = e.target.password.value;
    const url = 'https://deferral-banka-app-1.herokuapp.com/api/v1/auth/signin';
    const user = {
      email, password
    };
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-type":"application/json"
      },
      body: JSON.stringify(user),
    }).then( res => res.json())
      .then((res) => {
        if(res.status !== 200) {
          errorMsg.innerText = data.message;
          changeElementChildText(loginBtn, '', false);
        }else {
          window.sessionStorage.banka_token = res.data.token;
          goto('dashboard');
        }
    }).catch(err => {throw err})
})
};


const checkUserLocation = () => {
  let location = userLocation.split('/')[5];
  location = location.split('.')[0];
  if(location !== 'sign-in'
    && location !== 'index'
    && location !== 'register') {
    const token = window.sessionStorage.banka_token;
    if(!token) {
      goto('sign-in')
    } else {
      goto(location)
    }
  }
  switch (location) {
    case 'sign-in':
      handleUserSingin();
      break;
    case 'sign':
      console.log('do somthing');
      break;
    default:
      console.log('happy coding')
  }
};

(function startApp() {
  checkUserLocation();
})();