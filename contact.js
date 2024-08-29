const ContactForm = (event) => {
    event.preventDefault();
    const form = document.getElementById("ContactForm");
    const formData = new FormData(form);

    const ContactData = {
        name: formData.get("name"),
        message: formData.get("message"),
        email: formData.get("email"),
    };
    console.log(ContactData);

    fetch("https://cildank-shop.onrender.com/auth/contactus/", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(ContactData)
    })
    .then((res) => {
        if (res.status === 201) {
            return res.json().then((data) => {
                console.log(data);
                alert("Thanks for Contacting Us! Your message has been successfully received");
            });
        } else if (res.status === 401) {
            alert("Error: Method not found or Unauthorized access.");
        } else {
            return res.json().then((data) => {
                console.log(data);
                alert("An error occurred. Please try again.");
            });
        }
    })
    .catch(error => {
        console.log(error);
        alert("A network error occurred. Please check your connection and try again.");
    });
}


