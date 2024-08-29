





const handleAmount = (event) => {
    event.preventDefault();

    const form = document.getElementById('transaction-form');
    const token = localStorage.getItem("authToken");
    
    // Check if token is present
    if (!token) {
        alert("You are not authenticated user. Please log in.");
        return;
    }

    const formData = new FormData(form);
    const amountData = {
        transaction_amount: formData.get('amount'),
        deposit: formData.get('deposit'),
    };

    console.log('data', amountData);

    fetch("https://cildank-shop.onrender.com/transactions/deposit/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify(amountData),
    })
    .then(res => {
        if (res.ok) {
            return res.json().then(data => {
                // Handle successful response
                alert("Deposit Successful! Check your mail or user account.");
                // Optionally redirect
                // window.location.href = "./index.html";
            });
        } else if (res.status === 400) {
            return res.json().then(data => {
                // Handle bad request
                alert("Error: " + (data.message || "Bad request. Please check your input."));
            });
        } else {
            // Handle other HTTP errors
            alert("An unexpected error occurred. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An unexpected error occurred. Please try again.");
    });
};
