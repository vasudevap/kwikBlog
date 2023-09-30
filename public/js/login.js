const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#inputUsername').value.trim();
  const password = document.querySelector('#inputPassword').value.trim();

  console.log("EMAIL: ", email, " PASS: ", password);

  if (email && password) {
    // Send a POST request to the API endpoint

    console.log("ABOUT TO FETCH **************");

    // const response = await fetch('/api/users/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ email, password }),
    //   headers: { 'Content-Type': 'application/json' },
    // });

    // if (response.ok) {
    //   // If successful, redirect the browser to the profile page
    //   document.location.replace('/profile');
    // } else {
    //   alert(response.statusText);
    // }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const user_firstname = document.querySelector('#fname-signup').value.trim();
  const user_lastname = document.querySelector('#lname-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (user_firstname && user_lastname && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ user_firstname, user_lastname, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
