// Populate featured products and product list
document.addEventListener("DOMContentLoaded", () => {
  const products = Storage.get("products");
  const featured = document.getElementById("featuredList");
  const list = document.getElementById("productList");

  // Homepage featured products
  if (featured) {
    products.slice(0, 3).forEach(p => {
      featured.innerHTML += `
        <div class="product">
          <img src="${p.image}" alt="${p.name}" width="150">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });
  }

  // All products page
  if (list) {
    products.forEach(p => {
      list.innerHTML += `
        <div class="product">
          <img src="${p.image}" alt="${p.name}" width="150">
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <button onclick="addToCart(${p.id})">Add to Cart</button>
        </div>`;
    });
  }

  // Load cart if cart page exists
  if (document.getElementById("cartItems")) loadCart();
});

// Add product to cart
function addToCart(id) {
  let cart = Storage.get("cart");
  let item = cart.find(c => c.productId === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ productId: id, qty: 1 });
  }
  Storage.set("cart", cart);
  alert("Added to cart");
}

// Load cart page
function loadCart() {
  let cart = Storage.get("cart");
  let products = Storage.get("products");
  let cartItems = document.getElementById("cartItems");
  let total = 0;
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cartTotal").innerText = "";
    return;
  }

  cart.forEach(c => {
    let p = products.find(p => p.id === c.productId);
    if (p) {
      total += p.price * c.qty;
      cartItems.innerHTML += `
        <div class="cart-item">
          <img src="${p.image}" alt="${p.name}" width="50">
          <span>${p.name} x${c.qty}</span>
          <span>= ₹${p.price * c.qty}</span>
        </div>`;
    }
  });
  document.getElementById("cartTotal").innerText = "Total: ₹" + total;
}

// Checkout
if (document.getElementById("checkoutForm")) {
  document.getElementById("checkoutForm").addEventListener("submit", e => {
    e.preventDefault();
    let cart = Storage.get("cart");

    if (cart.length === 0) {
      document.getElementById("orderMsg").innerText = "Cart is empty!";
      return;
    }

    let orders = Storage.get("orders");
    orders.push({
      id: Date.now(),
      items: cart,
      status: "Pending"
    });

    Storage.set("orders", orders);
    Storage.set("cart", []);

    document.getElementById("orderMsg").innerText = "Order placed successfully!";
  });
}
