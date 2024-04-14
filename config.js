const mode = 1;

const host_local = "http://localhost:8080";
const host_remote = "https://coffee-order-backend-latest.onrender.com";

function getHost() {
  return mode === 0 ? host_local : host_remote;
}

function isLoggedIn() {
  return localStorage.getItem("token") !== null;
}

function getToken() {
  return localStorage.getItem("token");
}

function saveToken(token) {
  localStorage.setItem("token", token);
  updateNavBar();
}

function deleteToken() {
  localStorage.removeItem("token");
  updateNavBar();
}

let config = {
  isLoggedIn: () => isLoggedIn(),
  host: () => getHost(),
  token: () => getToken(),
};

updateNavBar();

async function updateNavBar() {
  const navigation = document.getElementById("topnav");
  console.log(navigation.children);
  let loginTag = navigation.children[0];
  if (config.isLoggedIn()) {
    loginTag.innerHTML = 
    `<nav id="topnav">
      <ul>
          <li><a href="index.html" class="top-left">Coffee Order System</a></li>
          <li><a href="confirmation.html" class="top-right">Order Status</a></li>
          <li><a href="#" onClick="logout()" class="top-right">Logout</a></li>
      </ul>
    </nav>`;
  } else {
    loginTag.innerHTML = `<nav id="topnav">
      <ul>
          <li><a href="index.html" class="top-left">Coffee Order System</a></li>
          <li><a href="confirmation.html" class="top-right">Order Status</a></li>
          <li><a href="login.html" class="top-right">Login</a></li>
      </ul>
    </nav>`;
  }
}

async function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let customer = { username: username, password: password };
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  };
  try {
    let response = await fetch(getHost() + "/signin", request);
    if (response.status == 200) {
      alert("Login successful");
      const token = await response.text();
      saveToken(token);
      location.href = "index.html";
    } else {
      console.log(`response status: ${response.status}`);
      deleteToken();
      alert("Login failed");
    }
  } catch (error) {
    console.error("Error:", error);
    deleteToken();
    alert("Login failed");
  }
  updateNavBar();
}

async function register() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let customer = { username: username, password: password };
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  };
  try {
    let response = await fetch(config.host() + "/signup", request);
    if (response.status == 200) {
      alert("Registration successful");
      location.href = "login.html";
    } else {
      console.log(`response status: ${response.status}`);
      alert("Registration failed");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Registration failed");
  }
}

async function logout() {
  deleteToken();
}
