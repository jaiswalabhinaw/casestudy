document.addEventListener("DOMContentLoaded", () => {
  renderAdminProducts();
  renderOrders();

  document.getElementById("addProductForm").addEventListener("submit", e => {
    e.preventDefault();
    let products = Storage.get("products");
    let id = Date.now();
    let inputs = e.target.elements;

    // Image handling: URL or file
    let urlInput = inputs[2].value; // Image URL field
    let fileInput = document.getElementById("productImageFile")?.files[0];

    if (fileInput) {
      let reader = new FileReader();
      reader.onload = function(event) {
        saveProduct(products, id, inputs, event.target.result); // base64
      };
      reader.readAsDataURL(fileInput);
    } else {
      saveProduct(products, id, inputs, urlInput); // plain URL
    }
  });
});

function saveProduct(products, id, inputs, imagePath) {
  products.push({
    id: id,
    name: inputs[0].value,
    price: parseFloat(inputs[1].value),
    image: imagePath, // either URL or base64
    desc: inputs[3].value
  });
  Storage.set("products", products);
  document.getElementById("addProductForm").reset();
  renderAdminProducts();
}

// ✅ Show product thumbnails in Admin Panel
function renderAdminProducts() {
  let list = document.getElementById("adminProductList");
  let products = Storage.get("products");
  list.innerHTML = "";

  if (products.length === 0) {
    list.innerHTML = "<p>No products added yet.</p>";
    return;
  }

  products.forEach(p => {
    list.innerHTML += `
      <div class="admin-product" style="display:flex; align-items:center; margin-bottom:10px;">
        <img src="${p.image}" alt="${p.name}" width="50" style="margin-right:10px; border:1px solid #ccc;">
        <span><strong>${p.name}</strong> - ₹${p.price}</span>
        <button onclick="deleteProduct(${p.id})" style="margin-left:10px;">Delete</button>
      </div>`;
  });
}

function deleteProduct(id) {
  let products = Storage.get("products");
  products = products.filter(p => p.id !== id);
  Storage.set("products", products);
  renderAdminProducts();
}

function renderOrders() {
  let orders = Storage.get("orders");
  let div = document.getElementById("adminOrders");
  div.innerHTML = "";

  if (orders.length === 0) {
    div.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  orders.forEach(o => {
    div.innerHTML += `<p>Order #${o.id} - ${o.items.length} items - Status: ${o.status}</p>`;
  });
}
