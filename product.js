// main code

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const colorMenu = document.getElementById('Color');
const detailsProduct = document.getElementById("detailsProduct");
const totalProduct = document.getElementById("totalProduct");
const products = document.getElementById("products");
const loadMoreButton = document.getElementById("load-more-button");
const previousButton = document.getElementById("previous-button");
const sub_category = document.getElementById("sub_category");
const category = document.getElementById("category");
const sortLowToHigh = document.getElementById("sortLowToHigh");
const sortHighToLow = document.getElementById("sortHighToLow");
const sizeS = document.getElementById("sizeS");
const sizeM = document.getElementById("sizeM");
const sizeL = document.getElementById("sizeL");
const sizeXL = document.getElementById("sizeXL");
const sizeXXL = document.getElementById("sizeXXL");

let currentPage = 1;
let previousPage = null;
let sortOrder = ""; // This will store 'asc' or 'desc' based on user selection
let size = "";

function loadProducts(page, sort, size, sub_category, category, color,search) {
  let url;
  console.log(page, size, sort, sub_category, category,color);

  if (sort) {
    url = `https://cildank-shop.onrender.com/products/product/sorted_by_price/?order=${sort}&page=${page}`;
    console.log("inside sort");
  } else if (size) {
    url = `https://cildank-shop.onrender.com/products/product/sorted_by_size/${size}/?page=${page}`;
    console.log("inside size", size);
  } else if (sub_category) {
    url = `https://cildank-shop.onrender.com/products/product/sorted_by_sub_category/${sub_category}/?page=${page}`;
    console.log("inside subcategory", sub_category);
  } 
  else if (category) {
    url = `https://cildank-shop.onrender.com/products/product/sorted_by_category/${category}/?page=${page}`;
   
  } 
  else if(color){
    console.log("inside color")
    url = `https://cildank-shop.onrender.com/products/product/sorted_by_color/${color}/?page=${page}`;
  }
  else if(search){

    
    url = `https://cildank-shop.onrender.com/products/product/sorted_by_search/${search}/?page=${page}`;

  }
  else {
    url = `https://cildank-shop.onrender.com/products/product/?page=${page}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      products.innerHTML = "";

      if (data.count !== undefined) {
        totalProduct.textContent = `${data.count} Products Found`;
      }
      console.log(data);

      if (Array.isArray(data.results)) {
        data.results.forEach((product) => {
          // console.log(product.description)
          const imageUrl = `https://res.cloudinary.com/dnzqmx8nw/${product.image}`;
          const productCol = document.createElement("div");
          productCol.className = "col";
          productCol.innerHTML = `
                        <div class="card h-100 mt-3 rounded-0   card-hover">
                    <a href="#" onclick="showDetails(
                        '${encodeURIComponent(product.name)}', 
                        '${encodeURIComponent(product.price)}', 
                        '${encodeURIComponent(product.quantity)}', 
                        '${encodeURIComponent(product.sub_category)}', 
                        '${encodeURIComponent(imageUrl)}', 
                        '${encodeURIComponent(product.description)}', 
                        '${encodeURIComponent(product.id)}'
                    )">
                        <img src="${imageUrl}" class="card-img-top img-fluid fixed-height" alt="${product.name}">
                    </a>
                    <div class="card-body text-black d-flex flex-column">
                        <a href="#" onclick="showDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}'
                        )" class="card-title text-decoration-none fs-5 mb-2">${product.name}</a>
                        <a href="#" onclick="showDetails(
                            '${encodeURIComponent(product.name)}', 
                            '${encodeURIComponent(product.price)}', 
                            '${encodeURIComponent(product.quantity)}', 
                            '${encodeURIComponent(product.sub_category)}', 
                            '${encodeURIComponent(imageUrl)}', 
                            '${encodeURIComponent(product.description)}', 
                            '${encodeURIComponent(product.id)}'
                        )" class="card-text text-decoration-none text-black mt-auto">Price: $${product.price}</a>
                    </div>
                </div>



                    `;
          products.appendChild(productCol);
        });
      } else {
        console.error(
          "Expected data.results to be an array, but got:",
          data.results
        );
      }

      // Update button visibility
      if (data.next) {
        loadMoreButton.style.display = "block";
        previousButton.style.display = "none";
      } else {
        loadMoreButton.style.display = "none";
        previousButton.style.display = "block";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Initial load of products
loadProducts(currentPage);

// Event listeners for sorting
sortLowToHigh.addEventListener("click", () => {
  sortOrder = "asc";
  console.log("sortlowtohigh");
  currentPage = 1; // Reset to the first page
  loadProducts(currentPage, sortOrder);
});

sortHighToLow.addEventListener("click", () => {
  sortOrder = "desc";
  currentPage = 1; // Reset to the first page
  loadProducts(currentPage, sortOrder);
});

// Load more products on button click
loadMoreButton.addEventListener("click", () => {
  previousPage = currentPage;
  currentPage++;
  loadProducts(currentPage, sortOrder);
});

// Load previous products on button click
previousButton.addEventListener("click", () => {
  if (previousPage) {
    currentPage = previousPage;
    previousPage = null; // Clear previous page tracker
    loadProducts(currentPage, sortOrder);
  }
});


const  showDetails = (name, price, quantity, sub_category, image, description, id) => {
    const detailsUrl = `./details.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&quantity=${encodeURIComponent(quantity)}&sub_category=${encodeURIComponent(sub_category)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(image)}&id=${encodeURIComponent(id)}`;
    window.location.href = detailsUrl;
};


// export function showDetails(name, price, quantity, sub_category, image, description, id) {
//   const detailsUrl = `./details.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&quantity=${encodeURIComponent(quantity)}&sub_category=${encodeURIComponent(sub_category)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(image)}&id=${encodeURIComponent(id)}`;
//   window.location.href = detailsUrl;
// }

// Event listeners for size filters
sizeS.addEventListener("click", () => {
  const sizeSValue = document.getElementById("sizeS").textContent;
  console.log("size value", sizeSValue);
  currentPage = 1; // Reset to the first page
  loadProducts(currentPage, undefined, sizeSValue);
});

sizeM.addEventListener("click", () => {
  const sizeMValue = document.getElementById("sizeM").textContent;
  console.log("size value", sizeMValue);
  currentPage = 1; // Reset to the first page
  loadProducts(currentPage, undefined, sizeMValue);
});

sizeL.addEventListener("click", () => {
  const sizeLValue = document.getElementById("sizeL").textContent;
  console.log("size value", sizeLValue);
  currentPage = 1; // Reset to the first page
  loadProducts(currentPage, undefined, sizeLValue);
});

sizeXL.addEventListener("click", () => {
  const sizeXLValue = document.getElementById("sizeXL").textContent;
  console.log("size value", sizeXLValue);
  currentPage = 1; // Reset to the first page
  loadProducts(currentPage, undefined, sizeXLValue);
});

sizeXXL.addEventListener("click", () => {
  const sizeXXLValue = document.getElementById("sizeXXL").textContent;
  console.log("size value", sizeXXLValue);
  currentPage = 1; // Reset to the first page
  loadProducts(currentPage, undefined, sizeXXLValue);
});

sub_category.addEventListener("click", function (event) {
  if (event.target.classList.contains("dropdown-item")) {
    const selectedSubcategory = event.target.getAttribute("data-subcategory");
    console.log("Selected subcategory:", selectedSubcategory);
    currentPage = 1; // Reset to the first page
    loadProducts(currentPage, undefined, undefined, selectedSubcategory);
  }
});

category.addEventListener("click", function (event) {
  if (event.target.classList.contains("dropdown-item")) {
    const selectedCategory = event.target.getAttribute("datacategory");
    console.log("Selected subcategory:", selectedCategory);
    currentPage = 1; // Reset to the first page
    loadProducts(
      currentPage,
      undefined,
      undefined,
      undefined,
      selectedCategory
    );
  }
});


document.addEventListener('DOMContentLoaded',()=>{

  colorMenu.addEventListener('click',(event)=>{
    if (event.target && event.target.tagName==='LI'){
      const color = event.target.getAttribute('data-color')
      console.log(color)
      currentPage = 1;
      loadProducts(
        currentPage,
        undefined,
        undefined,
        undefined,
        undefined,
        color
      );
      
    }
  })



})


searchButton.addEventListener("click", () => {
  const searchQuery = searchInput.value.trim();
  console.log("search query:", searchQuery);
  currentPage = 1; // Reset to the first page
  loadProducts(currentPage, sortOrder, size, undefined, undefined, undefined, searchQuery);
});



fetch("https://cildank-shop.onrender.com/categories/category_list/")
  .then((res) => res.json())
  .then((data) => {
    console.log("category", data);
    data.forEach((item) => {
      console.log("item", item);
      const category = document.getElementById("category");
      const li = document.createElement("li");
      li.innerHTML = `
        
       
         <a class="dropdown-item fw-bold" datacategory="${item.name}" href="#">${item.name}</a>
                            
        
        `;
      category.appendChild(li);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });

fetch("https://cildank-shop.onrender.com/categories/subcategory_list/")
  .then((res) => res.json())
  .then((data) => {
    console.log("sub_category", data);
    data.forEach((item) => {
      console.log("item", item);
      const sub_category = document.getElementById("sub_category");
      const li = document.createElement("li");
      li.innerHTML = `
        
       
         <a class="dropdown-item fw-bold" href="#" data-subcategory="${item.name}">${item.name}</a>
                            
        
        `;
      sub_category.appendChild(li);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
  });



 