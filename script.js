const products = [
  { id: 1, name: "Product 1", price: 10.99 },
  { id: 2, name: "Product 2", price: 19.99 },
  { id: 2, name: "Product 3", price: 24.05 },
  { id: 4, name: "Product 4", price: 14.99 },
  { id: 5, name: "Product 5", price: 9.99 },
  { id: 6, name: "Product 6", price: 12.99 },
  { id: 7, name: "Product 7", price: 15.99 },
  { id: 8, name: "Product 8", price: 19.99 },
  { id: 9, name: "Product 9", price: 29.99 },
  { id: 10, name: "Product 10", price: 39.99 },

];

let cart = [];
let totalAmount = 0;

function displayProducts() {
  const productList = document.getElementById("product-list");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
      <p class="product-name">${product.name}</p>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <button class="product-add-button" onclick="addToCart(${
        product.id
      })">Add to Cart</button>
    `;

    productList.appendChild(productCard);
  });
}


function addToCart(productId) {
  const selectedProduct = products.find((product) => product.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...selectedProduct, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-list");
  const totalElement = document.getElementById("total");

  cartList.innerHTML = "";
  totalAmount = 0;

  cart.forEach((item) => {
    totalAmount += item.price * item.quantity;

    const listItem = document.createElement("li");
    listItem.innerHTML = `${item.name} - $${(
      item.price * item.quantity
    ).toFixed(2)} 
                          <button onclick="increaseQuantity(${
                            item.id
                          })">+</button>
                          <span>${item.quantity}</span>
                          <button onclick="decreaseQuantity(${
                            item.id
                          })">-</button>
                          <button onclick="removeFromCart(${
                            item.id
                          })">Remove</button>`;
    cartList.appendChild(listItem);
  });

  totalElement.textContent = totalAmount.toFixed(2);
}

function increaseQuantity(productId) {
  const selectedItem = cart.find((item) => item.id === productId);
  selectedItem.quantity += 1;
  updateCart();
}

function decreaseQuantity(productId) {
  const selectedItem = cart.find((item) => item.id === productId);
  if (selectedItem.quantity > 1) {
    selectedItem.quantity -= 1;
  } else {
    removeFromCart(productId);
  }
  updateCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

let couponApplied = false; 

function applyCoupon() {
  const couponInput = document.getElementById("coupon");
  const couponCode = couponInput.value;

  if (couponCode === "WEB3BRIDGECOHORTx" && !couponApplied) {
    // Apply 10% discount to each item in the cart
    cart.forEach((item) => {
      item.price *= 0.9;
    });

    updateCart();

    couponApplied = true;
  } else if (couponApplied) {
    alert("The coupon has already been applied.");
  } else {
    alert("Invalid coupon code");
  }
}



window.addEventListener("beforeunload", () => {
  localStorage.setItem("cart", JSON.stringify(cart));
});

displayProducts();

const storedCart = localStorage.getItem("cart");
if (storedCart) {
  cart = JSON.parse(storedCart);
}

updateCart();

