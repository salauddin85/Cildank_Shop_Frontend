

const handleRegistration = (event) => {
    event.preventDefault();

    const form = document.getElementById("registration-form");
    const formData = new FormData(form);

    const registrationData = {
        username: formData.get("username"),
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    };

    const username = registrationData.username;
    const email = registrationData.email;
    const password = registrationData.password;
    const confirm_password = registrationData.confirm_password;

    // Regex to validate the username: must contain letters and numbers, no spaces, underscores allowed
    const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d_]+$/;

    if (!usernameRegex.test(username)) {
        document.getElementById("error").innerText =
            "Username must contain both letters and numbers, cannot contain spaces, but can contain underscores.";
        return;
    } else {
        document.getElementById("error").innerText = "";
    }

    if (password !== confirm_password) {
        document.getElementById("error").innerText =
            "Password and confirm password do not match.";
        return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
        document.getElementById("error").innerText =
            "Password must contain at least eight characters, including one letter, one number, and one special character.";
        return;
    }

    // Reset the error message before making the request
    document.getElementById("error").innerText = "";

    fetch("https://cildank-shop.onrender.com/auth/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
    })
        .then(response => response.json().then(data => ({ status: response.status, body: data })))
        .then(result => {
            if (result.status === 200) {
                alert("Registration Successful. Please check your email for confirmation.");
            } else if (result.status === 400) {
                // Handling specific error messages from the API
                let errorMessage = "";
                
                if (result.body.username) {
                    errorMessage += result.body.username[0] + " ";
                }
                
                if (result.body.email) {
                    errorMessage += result.body.email[0] + " ";
                }
                
                if (result.body.error) {
                    errorMessage += result.body.error[0] + " ";
                }
                
                if (errorMessage === "") {
                    errorMessage = "An error occurred during registration.";
                }
                
                document.getElementById("error").innerText = errorMessage.trim();
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("error").innerText = 
                "An unexpected error occurred. Please try again later.";
        });
};



  




const handleLogin = (event) => {
  event.preventDefault();

  const form = document.getElementById("login-form");
  const formData = new FormData(form);

  const loginData = {
    username: formData.get("username"),

    password: formData.get("password"),
  };

  console.log("login data", loginData);

  fetch("https://cildank-shop.onrender.com/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("set data", data);
      console.log("user data", data.user_id);
      console.log("token data", data.token);
      localStorage.setItem("authToken", data.token);
      alert("Login Successfull");
      window.location.href = "./index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const handleLogout = () => {
  const token = localStorage.getItem("authToken");
  console.log(token);
  fetch("https://cildank-shop.onrender.com/auth/logout/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
      if (res.ok) {
        localStorage.removeItem("authToken");
        window.location.href = "./login.html";
      }
    })
    .catch((err) => {
      console.log("Logout error", err);
    });
};

const loadAccount = () => {
  fetch("https://cildank-shop.onrender.com/auth/account/")
    .then((res) => res.json())
    .then((data) => {
      console.log("review", data);

      data.forEach((account) => {
        const div = document.createElement("div");
        const profileDetails = document.getElementById("profileDetails");
        // newli.className = "slide-visible";
        profileDetails.innerHTML = `
            
              
              
                 <div class="account-details fs-5 p-2 text-success-emphasiss">
                
                    <h6 class="text-center text-primary fs-5">Welcome Your Profile:</h6>
                    <h6 class="fs-5"><strong class="text-primary-emphasis">UserName</strong>: ${account.user_name}</h6>
                    <h6 class="fs-5"><strong class="text-primary-emphasis">AccountNo</strong>: ${account.account_no}</h6>
                    <h6 class="fs-5"><strong class="text-primary-emphasis">Balance</strong>: ${account.balance}</h6>
                    <hr>
                    <h6 class="text-primary-emphasis"><a class="ms-2 fs-5 link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                    href="./transaction.html"</a>Add Balance?</h6>
                   
                    <h6 class="text-primary-emphasis"><a  class=" fs-5 link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                                    href="./purchase.html"</a>Purchased list?</h6>
                                
               </div>
            `;

        profileDetails.appendChild(div);
      });
    })
    .catch((err) => console.log(err));
};

loadAccount();
