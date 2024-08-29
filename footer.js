fetch("footer.html")
.then(res => res.text())
.then(data =>{
    




    document.getElementById("footer").innerHTML=data;



   document.getElementById('Send').addEventListener('click', function(event) {
    // Check if the form is valid
    const form = document.getElementById('emailForm');
    if (!form.checkValidity()) {
        // Form is invalid, so prevent submission and show validation errors
        event.preventDefault();
        form.reportValidity(); // This will show the validation errors on the form
    } else {
        // Form is valid, proceed with custom logic
        event.preventDefault(); // Prevent default form submission behavior
        alert('Email Send Successful');
        // Additional code to handle form submission
    }
});

})


