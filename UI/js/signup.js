const userSignup = document.getElementById('signup');
const signupBtn = document.getElementById('register');
const api = 'http://localhost:3000/api/v1/auth/signup';

const firstNameError = document.getElementById('firstNameError');
const lastNameError = document.getElementById('lastNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const otherError = document.getElementById('otherErrorContainer');

userSignup.addEventListener('submit', (event) => {
  event.preventDefault();

  signupBtn.value = 'loading..';

  const firstname = document.getElementById('firstname').value;
  const lastname = document.getElementById('lastname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname,
      lastname,
      email,
      password,
    }),
  })
    .then(res => res.json())
    .then((response) => {
      if (response.status === 201) {
        window.location = './dashboard.html';
      }
      if (response.status === 409) {
        otherError.innerHTML = response.error;
      }
      if (response.status === 400) {
        if (response.error.firstname) {
          firstNameError.innerHTML = response.error.firstname;
        }
        if (response.error.lastname) {
          lastNameError.innerHTML = response.error.lastname;
        }
        if (response.error.email) {
          emailError.innerHTML = response.error.email;
        }
        if (response.error.password) {
          passwordError.innerHTML = response.error.password;
        }
      }
    })
    .catch((error) => {
      otherError.innerHTML = 'Failed to connect, please try again!' || error.message;
    });
});
