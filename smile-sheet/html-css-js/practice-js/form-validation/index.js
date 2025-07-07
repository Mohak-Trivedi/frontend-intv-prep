const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkInputs();
})

function checkInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  let allChecksPassed = true;

  if (usernameValue === '') {
    setErrorFor(username, 'Username cannot be blank.');
    allChecksPassed = false;
  } else {
    setSuccessFor(username);
  }

  if (emailValue === '') {
    setErrorFor(email, 'Email cannot be blank.');
    allChecksPassed = false;
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Not a valid email.');
    allChecksPassed = false;
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === '') {
    setErrorFor(password, 'Username cannot be blank.');
    allChecksPassed = false;
  } else {
    setSuccessFor(password);
  }

  if (password2Value === '') {
    setErrorFor(password2, 'Password2 cannot be blank.');
    allChecksPassed = false;
  } else if (password2Value !== passwordValue) {
    setErrorFor(password2, 'Passwords do not match.');
    allChecksPassed = false;
  } else {
    setSuccessFor(password2);
  }

  if (allChecksPassed) {
    alert('Form Submitted Successfully!');
  }
}

function setErrorFor(element, errorMessage) {
  // set style for error
  const parentElement = element.parentElement;
  parentElement.className = 'form-controller error';

  // set error message
  const small = parentElement.querySelector('small');
  small.innerText = errorMessage;
}

function setSuccessFor(element) {
  // set style for success
  const parentElement = element.parentElement;
  parentElement.className = 'form-controller success';
}

function isEmail(value) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(value);
}