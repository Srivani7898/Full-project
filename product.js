// Sample product data
const products = [
  { id: 1, name: "Smartphone", category: "electronics", price: 699, rating: 4.5, image: "./img/smartphone.jpg" },
  { id: 2, name: "Laptop", category: "electronics", price: 999, rating: 4.7, image: "./img/laptop.jpg" },
  { id: 3, name: "T-shirt", category: "fashion", price: 20, rating: 4.2, image: "./img/t-shirt.jpg" },
  { id: 4, name: "Sneakers", category: "fashion", price: 80, rating: 4.4, image: "./img/Sneakers.jpg" },
  { id: 5, name: "Vacuum Cleaner", category: "home", price: 150, rating: 4.6, image: "./img/Vacuum_Cleaner.jpg" },
  { id: 6, name: "Blender", category: "home", price: 50, rating: 4.1, image: "./img/blender.jpg" },
];

// DOM Elements
const productGrid = document.getElementById("product-grid");
const categoryFilter = document.getElementById("category");
const priceFilter = document.getElementById("price");
const sortSelect = document.getElementById("sort");

// Render products to the grid
function renderProducts(productsToRender) {
  productGrid.innerHTML = ""; // Clear current products
  productsToRender.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p class="price">$${product.price}</p>
      <p>Rating: ${product.rating}</p>
    `;
    productGrid.appendChild(productCard);
  });
}

// Apply filters and sorting
function applyFiltersAndSorting() {
  const selectedCategory = categoryFilter.value;
  const maxPrice = parseFloat(priceFilter.value) || Infinity;
  const sortOption = sortSelect.value;

  let filteredProducts = products.filter((product) => {
    const isCategoryMatch = selectedCategory === "all" || product.category === selectedCategory;
    const isPriceMatch = product.price <= maxPrice;
    return isCategoryMatch && isPriceMatch;
  });

  if (sortOption === "low-to-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "high-to-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(filteredProducts);
}

// Event listeners
categoryFilter.addEventListener("change", applyFiltersAndSorting);
priceFilter.addEventListener("input", applyFiltersAndSorting);
sortSelect.addEventListener("change", applyFiltersAndSorting);

// Initial render
renderProducts(products);
