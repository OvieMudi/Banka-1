const userSignup = document.getElementById('signup');
const signupBtn = document.getElementById('register');
const api = 'https://deferral-banka-app-1.herokuapp.com/api/v1/auth/signup';

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
      if (response.status === 400) {
        firstNameError.innerHTML = response.error.firstname;
        firstNameError.style.display = 'block';

        lastNameError.innerHTML = response.error.lastname;
        lastNameError.style.display = 'block';

        emailError.innerHTML = response.error.email;
        emailError.style.display = 'block';

        passwordError.innerHTML = response.error.password;
        passwordError.style.display = 'block';

        signupBtn.value = 'REGISTER';

        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
      if (response.status === 201) {
        window.location = './dashboard.html';
        localStorage.setItem('userInfo', JSON.stringify(response.data));
      }
      if (response.status === 409) {
        otherError.innerHTML = response.error;
        signupBtn.value = 'REGISTER';
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    })
    .catch((error) => {
      otherError.innerHTML = 'Failed to connect, please try again!' || error.message;
      setTimeout(() => {
        window.location.reload();
      }, 4000);
    });
});
