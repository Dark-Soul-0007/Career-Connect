// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function () {

    const API_URL = "http://localhost:5000/api/auth";

    // Form elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authModal = document.getElementById('authModal');

    // ================= LOGIN =================
    
loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      showToast("error", "Login Failed", data.message);
      return;
    }

    // Save token & user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("userName", data.user.name);
    localStorage.setItem("userType", data.user.type);

    showToast("success", "Login Successful", "Welcome back!");
    authModal.classList.remove("active");
    updateUIForLoggedInUser(data.user);

  } catch (err) {
    showToast("error", "Error", "Server not reachable");
  }
});


    // ================= SIGNUP =================
    signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const type = document.querySelector(".user-type.active").dataset.type;

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, type }),
    });

    const data = await res.json();

    if (!res.ok) {
      showToast("error", "Signup Failed", data.message);
      return;
    }

    showToast("success", "Account Created", "Please login now");
    document.querySelector('[data-tab="login"]').click();

  } catch (err) {
    showToast("error", "Error", "Server not reachable");
  }
});


    // ================= LOGOUT =================
    function logoutUser() {
        localStorage.clear();
        location.reload();
    }

    // ================= SESSION CHECK =================
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (isLoggedIn) {
            const user = {
                name: localStorage.getItem("userName"),
                email: localStorage.getItem("userEmail"),
                type: localStorage.getItem("userType")
            };
            updateUIForLoggedInUser(user);
        }
    }

    checkLoginStatus();

    // ================= UI UPDATE =================
    function updateUIForLoggedInUser(user) {
        const navActions = document.querySelector('.nav-actions');
        if (!navActions) return;

        navActions.innerHTML = `
            <div class="user-dropdown">
                <button class="user-profile">
                    <div class="avatar">${user.name.charAt(0)}</div>
                    <span>Hi, ${user.name.split(" ")[0]}</span>
                </button>
                <div class="dropdown-menu">
                    <a href="#">Profile</a>
                    <a href="#" id="logoutBtn">Logout</a>
                </div>
            </div>
        `;

        document.getElementById("logoutBtn").addEventListener("click", logoutUser);
    }

    // ================= TOAST =================
    function showToast(type, title, message, duration = 4000) {
        if (window.showToast) {
            window.showToast(type, title, message, duration);
        } else {
            alert(`${title}: ${message}`);
        }
    }

});
