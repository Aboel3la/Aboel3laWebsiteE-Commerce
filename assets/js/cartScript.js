const productList = document.getElementById("product-list");
const summaryList = document.querySelector(".cartSummary");
let cartItems = [];
let totalItemsPrice = 0;

document.addEventListener("DOMContentLoaded", function () {
  //   document.getElementById("emptyCart").style.display = "flex";

  loadItemsLocalStorage();
  cartCheck();
});

function cartCheck() {
  if (
    localStorage.getItem("cartProducts") == null ||
    localStorage.getItem("cartProducts") == "[]"
  ) {
    document.querySelector(".ProductListContainer").style.display = "none";
    document.querySelector(".cartSummary").style.display = "none";
    document.getElementById("emptyCart").style.display = "flex";
  } else {
    document.querySelector(".ProductListContainer").style.display = "block";
    document.querySelector(".cartSummary").style.display = "block";
    document.getElementById("emptyCart").style.display = "none";
    renderProducts();
  }
}

function loadItemsLocalStorage() {
  let str = localStorage.getItem("cartProducts");
  cartItems = JSON.parse(str);
}

function renderProducts() {
  totalItemsPrice = 0;
  productList.innerHTML = "";
  summaryList.innerHTML = "<h2 class='cart_summary_title'>Cart Summary</h2>";
  cartItems.forEach((item) => {
    const product_div = document.createElement("div");
    const summary_div = document.createElement("div");
    let totalPrice = Number(item.price) * Number(item.count);
    totalItemsPrice += totalPrice;
    product_div.className = "product";

    product_div.innerHTML = `
    
      <div class="product-name">
        <img src="${item.img}" alt="No Image Found">
        <p>&nbsp;&nbsp;${item.name}</p> 
        <p> &nbsp;&nbsp;&nbsp;&nbsp;($${item.price})</p>
      </div>
      
      <div class="controls">
        <button onclick="decrement(${item.id}, this)">-</button>
        <span id="qty-${item.id}">${item.count}</span>
        <button onclick="increment(${item.id})">+</button>
      </div>
    `;

    summary_div.innerHTML = `
      <div id = "summary_Item_${item.id}" class="cart_products_count">
          <h3 id="count">Subtotal(${item.count})</h3>
          <h3 id="price_sum">$${totalPrice}</h3>
        </div>
      `;

    productList.appendChild(product_div);
    summaryList.appendChild(summary_div);
  });

  const shipping_div = document.createElement("div");
  shipping_div.innerHTML = `
      <div class="cart_products_count">
          <h3>Shipping Fee</h3>
          <h3 style = "color : green; font-size : 0.9rem;">Free</h3>
        </div>
        <hr>
      `;
  summaryList.appendChild(shipping_div);

  const totalcartPriceDiv = document.createElement("div");
  totalcartPriceDiv.innerHTML = `
      <div class="cart_products_count">
          <h3 style = "font-size : 0.8rem;"><span style = "color : red; font-size : 1rem;">Total</span>&nbsp;&nbsp;(including val)</h3>
          <h3 id="totalCartPrice" style = "color : red;">$${totalItemsPrice}</h3>
        </div>
      `;
  summaryList.appendChild(totalcartPriceDiv);
}

function increment(id) {
  const item = cartItems.find((i) => i.id === id);
  if (item) {
    item.count += 1;
    document.getElementById(`qty-${id}`).textContent = item.count;
    // document.getElementById(`totalPrice-${id}`).textContent =
    //   "($" + Number(item.count) * Number(item.price) + ")";

    document
      .getElementById(`summary_Item_${id}`)
      .getElementsByTagName("h3")[0].innerHTML = `Subtotal(${item.count})`;
    document
      .getElementById(`summary_Item_${id}`)
      .getElementsByTagName("h3")[1].innerHTML =
      "$" + Number(item.count) * Number(item.price);
    totalItemsPrice = geTotalItemsPrice(cartItems);
    document.getElementById("totalCartPrice").innerHTML = "$" + totalItemsPrice;

    const jsonArray = JSON.stringify(cartItems);
    localStorage.setItem("cartProducts", jsonArray);

    document.getElementById("Maincartspam").innerHTML =
      Number(document.getElementById("Maincartspam").innerHTML) + Number(1);
    document.getElementById("subcartspam").innerHTML =
      Number(document.getElementById("Maincartspam").innerHTML) + Number(1);
  }
}

function decrement(id, e) {
  const item = cartItems.find((i) => i.id === id);
  if (item) {
    item.count -= 1;
    if (item.count == 0) {
      e.parentNode.parentNode.remove();
      const index = cartItems.findIndex((element) => element.id == item.id);

      if (index !== -1) {
        cartItems.splice(index, 1);
      }

      if (cartItems.length == 0) {
        document.querySelector(".ProductListContainer").style.display = "none";
        document.getElementById("emptyCart").style.display = "flex";
      }
      document.getElementById(`summary_Item_${id}`).remove();
    } else {
      document.getElementById(`qty-${id}`).textContent = item.count;
      //   document.getElementById(`totalPrice-${id}`).textContent =
      //     "($" + Number(item.count) * Number(item.price) + ")";
      document
        .getElementById(`summary_Item_${id}`)
        .getElementsByTagName("h3")[0].innerHTML = `Subtotal(${item.count})`;
      document
        .getElementById(`summary_Item_${id}`)
        .getElementsByTagName("h3")[1].innerHTML =
        "($" + Number(item.count) * Number(item.price) + ")";
    }
    const jsonArray = JSON.stringify(cartItems);
    localStorage.setItem("cartProducts", jsonArray);
  }

  document.getElementById("Maincartspam").innerHTML =
    Number(document.getElementById("Maincartspam").innerHTML) - Number(1);
  document.getElementById("subcartspam").innerHTML =
    Number(document.getElementById("Maincartspam").innerHTML) - Number(1);
  cartCheck();
}

function geTotalItemsPrice(arr) {
  let sum_price = 0;
  arr.forEach((item) => {
    sum_price += Number(item.price) * Number(item.count);
  });
  return sum_price;
}
