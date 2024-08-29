fetch("navbar.html")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to load navbar");
    }
    return res.text();
  })
  .then((data) => {
    
    document.getElementById("navbar").innerHTML = data;

    const navElement = document.getElementById("auth-element");
    const token = localStorage.getItem("authToken");
    console.log(token)

    if (token && token !== "undefined") {
      navElement.innerHTML += `
        <li class="nav-item p-2">
          <a
            type="button"
            class="btn btn-warning text-black fw-bold text-bold px-5"
            onclick="handleLogout()"
          >
            LOGOUT
          </a>
        </li>
      `;
    } else {
      navElement.innerHTML += `
        <li class="nav-item p-2">
          <a
            type="button"
            class="btn btn-dark text-bold px-5"
            href="./login.html"
          >
            LOGIN
          </a>
        </li>
        <li class="nav-item">
          <a
            class="ms-2 link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            href="./registration.html"
          >
            Create My Account
          </a>
        </li>
      `;
    }
  })
  .catch((error) => {
    console.error("Error loading navbar:", error);
  });


