const PurchaseDetails = () => {
  const token = localStorage.getItem("authToken");
  console.log("inside token purchase", token);
  if (!token) {
    alert("No authentication token found. Please log in.");
    return;
  }
  fetch("https://cildank-shop.onrender.com/purchases/purchase_all/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const PurchaseDetails = document.getElementById("PurchaseDetails");
      PurchaseDetails.innerHTML = ""; // Clear previous data if needed

      // Use an object to aggregate product quantities and total prices
      const aggregatedProducts = {};

      if (Array.isArray(data)) {
        data.forEach((product) => {
          const productId = product.product.id;
          const quantity = product.quantity || 1; // Assume quantity 1 if not provided
          const price = product.product.price;

          if (aggregatedProducts[productId]) {
            // If product is already in the aggregated list, update quantity and total price
            aggregatedProducts[productId].quantity += quantity;
            aggregatedProducts[productId].totalPrice += price * quantity;
          } else {
            // If product is not in the aggregated list, add it
            aggregatedProducts[productId] = {
              ...product,
              quantity: quantity,
              totalPrice: price * quantity,
            };
          }
        });

        // Display each product only once, using the aggregated data
        Object.values(aggregatedProducts).forEach((product) => {
          console.log(product)
          const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${product.product.image}`;

          const newDiv = document.createElement("div");
          newDiv.className = "row mt-3";
          newDiv.innerHTML = `
            <div class="col-3">
              <a ><img src="${imageUrl}" class="img-fluid text-decoration-none rounded w-75 h-100" alt="${product.product.name}"></a>
            </div>
            <div class="col-2 fs-5 fw-bold text-black pur-list-sub">
              <b>${product.product.sub_category}</b>
            </div>
            <div class="col-3">
              <a href="./details.html" class="text-decoration-none fw-bold mb-3 text-black fs-5 ">${product.product.name}</a> <br>
              <b class="text-black fs-5 mt-5 fw-bold">Size:${product.product.size}</b> <br>
              <b class="text-black fs-5 fw-bold">Quantity: ${product.quantity}</b> <br>
              <b class="text-black fs-5 fw-bold">Total Price: $${product.totalPrice.toFixed(2)}</b> <br>
              <button type="button" onclick="" class="review-btn mt-5 mb-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Review</button>

              <!-- Modal -->
              <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="w-100 mx-auto mt-5 review-box shadow-lg p-3 mb-5 bg-body-tertiary rounded">
                      <form class="Review-form w-100 px-auto" id="Reviewform" onsubmit="PurchaseReview(event,${product.product.id})">
                        <div class="mb-3 ms-4">
                          <label for="image" class="form-label fs-5 text-black text-center">Image*</label>
                          <input type="file" class="form-control text-center text-black common-name" required id="image" name="image" accept="image/*">
                        </div>
                        <div class="mb-3 ms-4">
                          <label for="body" class="form-label fs-5 text-black">Body*</label>
                          <textarea class="form-control text-black common-name" id="body" name="body" placeholder="body" required></textarea>
                        </div>
                        <div class="mb-3 ms-4">
                          <label class="form-label fs-5 text-black">Rating*</label>
                          <div>
                            <div>
                              <input type="radio" name="rating" id="rating-1" value="⭐" required>
                              <label for="rating-1">⭐</label>
                            </div>
                            <div>
                              <input type="radio" name="rating" id="rating-2" value="⭐⭐">
                              <label for="rating-2">⭐⭐</label>
                            </div>
                            <div>
                              <input type="radio" name="rating" id="rating-3" value="⭐⭐⭐">
                              <label for="rating-3">⭐⭐⭐</label>
                            </div>
                            <div>
                              <input type="radio" name="rating" id="rating-4" value="⭐⭐⭐⭐">
                              <label for="rating-4">⭐⭐⭐⭐</label>
                            </div>
                            <div>
                              <input type="radio" name="rating" id="rating-5" value="⭐⭐⭐⭐⭐">
                              <label for="rating-5">⭐⭐⭐⭐⭐</label>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="submit" name="submitAction" value="send" id="submitReview" class="btn btn-primary">Send</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-1">
              <b class="fs-5 fw-bold text-black">$${product.product.price}</b>
            </div>
          `;
          PurchaseDetails.appendChild(newDiv);
        });
      } else {
        console.error("Expected data to be an array but received:", data);
      }
    });
  // .catch(error => {
  //     console.error('Error:', error);
  //     alert("Failed to fetch purchase details. Please try again later.");
  // });
};







PurchaseDetails();






const PurchaseReview = (event,id) => {
  event.preventDefault();
  console.log("product id",id)
  // console.log("Review ID from URL inside function:", queryParams.reviewId);
  const token = window.localStorage.getItem("authToken");
  const Reviewform = document.getElementById("Reviewform");

  if (!token) {
    alert("No authentication token found. Please log in.");
    return;
  }

  const formData = new FormData(Reviewform);
  const reviewData = {
    image: formData.get("image"),
    body: formData.get("body"),
    rating: formData.get("rating"),
   
};
console.log(reviewData)

  // const submitAction = formData.get("submitAction");

 
  fetch(`https://cildank-shop.onrender.com/products/add_review/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  })
    .then((res) => {
      return res.json().then((data) => ({
        status: res.status,
        body: data,
      }));
    })
    .then(({ status, body }) => {
      if (status === 201) {
        alert("Review added successfully");
      } else if (status === 400 || status === 409) {
        // Adjust status code based on your backend implementation
        alert("This product review already exists.");
      } else {
        alert("An unexpected error occurred.");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Failed to add review. Please try again later.");
    });
  
  
};

