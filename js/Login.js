function toggleForm(formType) {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");

  if (formType === 'login') {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  } else {
    signupForm.style.display = "block";
    loginForm.style.display = "none";
  }
}

// (Sign Up)
function signUp(event) {
  event.preventDefault();

  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const repassword = document.getElementById("repassword").value;
  const error = document.getElementById("error");

  if (password !== repassword) {
    error.textContent = "Passwords do not match!";
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    error.textContent = "Email is already registered!";
    return;
  }

  users.push({ fullname, email, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert("Registration successful!");
  window.location.href = "pages/ModeMediaSelector.html";
}


// (Login)
function login(event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const loginError = document.getElementById("login-error");

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    alert("Login successful!");
    window.location.href = "pages/ModeMediaSelector.html";
  } else {
    loginError.textContent = "Invalid email or password!";
  }
}

