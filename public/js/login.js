const loginFormHandler = async (username, password) => {

  // Send a POST request to the API endpoint

  console.log("ABOUT TO FETCH **************");

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

const loginSignupFormHandler = async (e) => {
  e.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#inputUsername').value.trim();
  const password = document.querySelector('#inputPassword').value.trim();

  if (username && password) {

    if (document.querySelector('.loginForm')) {
      console.log("login: " + username + " " + password);
      loginFormHandler(username, password);
    }

    if (document.querySelector('.signupForm')) {
      console.log("signup: " + username + " " + password);
      signupFormHandler(username, password)
    }
  }
}

document
  .querySelector('.loginSignupForm')
  .addEventListener('submit', loginSignupFormHandler);
