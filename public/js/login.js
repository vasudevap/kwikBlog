// Login with username and password 
const loginFormHandler = async (username, password) => {

  // Send a POST request to the API endpoint
  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // If successful, redirect the browser to the profile page
    document.location.replace('/dashboard');
  } else {
    alert("Incorrect username or password");
  }
}
// Sign up with username and password
const signupFormHandler = async (username, password) => {

  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }

}
// Handle event to login or signup
const loginSignupFormHandler = async (e) => {
  e.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#inputUsername').value.trim();
  const password = document.querySelector('#inputPassword').value.trim();

  if (username && password) {

    // if request is to log in with existing credentials
    if (document.querySelector('.loginForm')) {
      loginFormHandler(username, password);
    }

    // if request is to sign up as a new user
    if (document.querySelector('.signupForm')) {
      signupFormHandler(username, password)
    }
  }
}

// listen for event on submit of form
document
  .querySelector('.loginSignupForm')
  .addEventListener('submit', loginSignupFormHandler);
