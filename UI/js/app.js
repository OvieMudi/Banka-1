'use strict';

const userLocation = window.location.href;

const goto = (path) => {
  window.location.href = `https://oviemudi.github.io/Banka-1/UI/${path}.html`;
};

const changeElementChildText = (elem, text) => {
  elem.innerText = text;
};

const handleUserSingin = () => {
  const loginBtn = document.querySelector('#loginButton');
  const signinForm = document.querySelector('#signinForm');
  const errorMsg = document.querySelector('#errorMsg');
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    changeElementChildText(loginBtn, 'LOADING...');
    const email = e.target.email.value;
          const password = e.target.password.value;
    const url = 'https://deferral-banka-app-1.herokuapp.com/api/v1/auth/signin';
    const user = {
      email, password,
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(res => res.json())
      .then((res) => {
        if (res.status !== 200) {
          errorMsg.innerText = res.message.toUpperCase();
          setTimeout(() => {
            errorMsg.innerText = '';
          }, 3000);
          changeElementChildText(loginBtn, 'SIGN IN');
        } else {
          window.sessionStorage.banka_token = JSON.stringify(res.data.token);
          goto('dashboard');
          console.log(res);
        }
      }).catch((err) => {
        throw err;
      });
  });
};


const checkUserLocation = () => {
  let location = userLocation.split('/')[5];
  location = location.split('.')[0];
  if (location !== 'sign-in'
    && location !== ''
    && location !== 'index'
    && location !== 'register') {
    const token = window.sessionStorage.banka_token;
    if (!token) {goto('sign-in')};
    // } else {
    //   goto(location)
    // }
  }
  if (location === 'sign-in') {
    handleUserSingin();
  }
};

(function startApp() {
  checkUserLocation();
}());
