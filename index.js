const mensProduct = document.getElementById("mensProduct");
const menstopProduct = document.getElementById("menstopProduct");
const womensProduct = document.getElementById("womensProduct");
const womenstopProduct = document.getElementById("womenstopProduct");


fetch("https://cildank-shop.onrender.com/products/product/sorted_by_category/Mens/")
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data.results)) {
      // Limit to 4 products
      const productsToShow = data.results.slice(0, 4);

      productsToShow.forEach((product) => {
        // Create a new div element for each product
        const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${product.image}`;

        const div = document.createElement("div");
        div.className = "col-lg-3 col-md-6";
        div.id="";

        // Set the inner HTML for the product card
        div.innerHTML = `
                <div class="card card-hover">
                     
                        <a href="#"  onclick="MensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}'
                    )">
                            <img src="${imageUrl}" alt="Clickable Image" class="fixed-height img-fluid" style="cursor: pointer;">
                        </a>



                    <div class="card-body">
                        <h5  style="cursor: pointer; class="card-title" <a href="#"  onclick="MensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}'
                    )"> ${product.name}</h5>
                        <h6  style="cursor: pointer; class="card-text"<a href="#"  onclick="MensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}'
                    )">$${product.price}</h6>
                    </div>
                </div>


                    
                `;

        // Append the new div to the mensProduct element
        mensProduct.appendChild(div);
      });
    } else {
      console.error(
        "Expected data.results to be an array, but got:",
        data.results
      );
    }
  })
  .catch((err) => console.error("Error fetching data:", err));



//  Mens Top Product
fetch("https://cildank-shop.onrender.com/products/product/sorted_by_category/Mens/")
.then((res) => res.json())
.then((data) => {
  if (Array.isArray(data.results)) {
    // Limit to 4 products
    const productsToShow = data.results.slice(3, 5);

    productsToShow.forEach((product) => {
      // Create a new div element for each product
      const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${product.image}`;

      const div = document.createElement("div");
      div.className = "";

      // Set the inner HTML for the product card
      div.innerHTML = `
              <div class="card card-hover">
                   
                      <a href="#"  onclick="MensProductDetails(
                          '${encodeURIComponent(product.name)}', 
                          '${encodeURIComponent(product.price)}', 
                          '${encodeURIComponent(product.quantity)}', 
                          '${encodeURIComponent(product.sub_category)}', 
                          '${encodeURIComponent(imageUrl)}', 
                          '${encodeURIComponent(product.description)}', 
                          '${encodeURIComponent(product.id)}'
                  )">
                          <img src="${imageUrl}" alt="Clickable Image" class="fixed-height img-fluid" style="cursor: pointer;">
                      </a>



                  <div class="card-body">
                      <h5  style="cursor: pointer; class="card-title" <a href="#"  onclick="MensProductDetails(
                          '${encodeURIComponent(product.name)}', 
                          '${encodeURIComponent(product.price)}', 
                          '${encodeURIComponent(product.quantity)}', 
                          '${encodeURIComponent(product.sub_category)}', 
                          '${encodeURIComponent(imageUrl)}', 
                          '${encodeURIComponent(product.description)}', 
                          '${encodeURIComponent(product.id)}'
                  )"> ${product.name}</h5>
                      <h6  style="cursor: pointer; class="card-text"<a href="#"  onclick="MensProductDetails(
                          '${encodeURIComponent(product.name)}', 
                          '${encodeURIComponent(product.price)}', 
                          '${encodeURIComponent(product.quantity)}', 
                          '${encodeURIComponent(product.sub_category)}', 
                          '${encodeURIComponent(imageUrl)}', 
                          '${encodeURIComponent(product.description)}', 
                          '${encodeURIComponent(product.id)}'
                  )">$${product.price}</h6>
                  </div>
              </div>


                  
              `;

      // Append the new div to the mensProduct element
      menstopProduct.appendChild(div);
    });
  } else {
    console.error(
      "Expected data.results to be an array, but got:",
      data.results
    );
  }
})
.catch((err) => console.error("Error fetching data:", err));


const  MensProductDetails = (name, price, quantity, sub_category, image, description, id) => {
    const detailsUrl = `./details.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&quantity=${encodeURIComponent(quantity)}&sub_category=${encodeURIComponent(sub_category)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(image)}&id=${encodeURIComponent(id)}`;
    window.location.href = detailsUrl;
};




fetch("https://cildank-shop.onrender.com/products/product/sorted_by_category/Womens/")
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data.results)) {
      // Limit to 4 products
      const productsToShow = data.results.slice(0, 4);

      productsToShow.forEach((product) => {
        // Create a new div element for each product
        const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${product.image}`;

        const div = document.createElement("div");
        div.className = "col-lg-3 col-md-6";

        // Set the inner HTML for the product card
        div.innerHTML = `
                <div class="card card-hover">
                     
                        <a href="#"  onclick="WomensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}'
                    )">
                            <img src="${imageUrl}" alt="Clickable Image" class="fixed-height img-fluid" style="cursor: pointer;">
                        </a>



                    <div class="card-body">
                        <h5  style="cursor: pointer; class="card-title" <a href="#"  onclick="WomensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}'
                    )"> ${product.name}</h5>
                        <h6  style="cursor: pointer; class="card-text"<a href="#"  onclick="WomensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}'
                    )">$${product.price}</h6>
                    </div>
                </div>


                    
                `;

        // Append the new div to the mensProduct element
        womensProduct.appendChild(div);
      });
    } else {
      console.error(
        "Expected data.results to be an array, but got:",
        data.results
      );
    }
  })
  .catch((err) => console.error("Error fetching data:", err));




  // womens top product
  fetch("https://cildank-shop.onrender.com/products/product/sorted_by_category/Womens/")
  .then((res) => res.json())
  .then((data) => {
    if (Array.isArray(data.results)) {
      // Limit to 4 products
      const productsToShow = data.results.slice(3, 5);

      productsToShow.forEach((product) => {
        // Create a new div element for each product
        const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${product.image}`;

        const div = document.createElement("div");
        div.className = "";

        // Set the inner HTML for the product card
        div.innerHTML = `
                <div class="card card-hover">
                     
                        <a href="#"  onclick="WomensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}'
                    )">
                            <img src="${imageUrl}" alt="Clickable Image" class="fixed-height img-fluid" style="cursor: pointer;">
                        </a>



                    <div class="card-body">
                        <h5  style="cursor: pointer; class="card-title" <a href="#"  onclick="WomensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}'
                    )"> ${product.name}</h5>
                        <h6  style="cursor: pointer; class="card-text"<a href="#"  onclick="WomensProductDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}'
                    )">$${product.price}</h6>
                    </div>
                </div>


                    
                `;

        // Append the new div to the mensProduct element
        womenstopProduct.appendChild(div);
      });
    } else {
      console.error(
        "Expected data.results to be an array, but got:",
        data.results
      );
    }
  })
  .catch((err) => console.error("Error fetching data:", err));





const  WomensProductDetails = (name, price, quantity, sub_category, image, description, id) => {
    const detailsUrl = `./details.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&quantity=${encodeURIComponent(quantity)}&sub_category=${encodeURIComponent(sub_category)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(image)}&id=${encodeURIComponent(id)}`;
    window.location.href = detailsUrl;
};
