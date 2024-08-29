const loadReview = () => {
    fetch("https://cildank-shop.onrender.com/products/review/")
        .then((res) => res.json())
        .then((data) => {
            console.log("review", data);
            // const reviewProductsid = [];
            
            data.forEach(review => {
                console.log("products id", review.products.id);
                
                // Collect product IDs
                // reviewProductsid.push(review.products.id);

                // Create the review list item
               const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${review.image}`;

                const newli = document.createElement("li");
                const allReview = document.getElementById("allReview");
                newli.className = "slide-visible";
                newli.innerHTML = `
                    <div class="cards-review shadow h-100">
                        <div class="ratio ratio-16x9">
                            <img src="${imageUrl}" class="img-class" alt="...">
                        </div>
                        <div class="card-body p-3 p-xl-5">
                            <h3 class="card-title h5">${review.name}</h3>
                            <h3 class="card-title h5">${review.rating}</h3>
                            <p class="card-text">${review.body}</p>
                        </div>
                    </div>
                    

                `;
                
                allReview.appendChild(newli);
            });

            // After collecting all product IDs, call ReviewId
           
        })
        .catch((err) => console.log(err));
};

loadReview();



