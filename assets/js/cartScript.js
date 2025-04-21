const productList = document.getElementById("product-list");
let cartItems = [];

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
    document.querySelector(".container").style.display = "none";
    document.getElementById("emptyCart").style.display = "flex";
  } else {
    document.querySelector(".container").style.display = "block";
    document.getElementById("emptyCart").style.display = "none";
    renderProducts();
  }
}

function loadItemsLocalStorage() {
  let str = localStorage.getItem("cartProducts");
  cartItems = JSON.parse(str);
}

function renderProducts() {
  productList.innerHTML = "";

  cartItems.forEach((item) => {
    const div = document.createElement("div");
    let totalPrice = Number(item.price) * Number(item.count);
    div.className = "product";

    div.innerHTML = `
    
      <div class="product-name">
        <img src="${item.img}" alt="No Image Found">
        <p>&nbsp;&nbsp;${item.name}</p> 
        <p> &nbsp;&nbsp;&nbsp;&nbsp;($${item.price})</p>
      </div>
      
      <div class="controls">
      <div><span id="totalPrice-${item.id}">($${totalPrice})&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
        <button style = "margin-right:5px" onclick="decrement(${item.id}, this)">-</button>
        <span id="qty-${item.id}">${item.count}</span>
        <button style = "margin-left:5px" onclick="increment(${item.id})">+</button>
      </div>
    `;

    productList.appendChild(div);
  });
}

function increment(id) {
  const item = cartItems.find((i) => i.id === id);
  if (item) {
    item.count += 1;
    document.getElementById(`qty-${id}`).textContent = item.count;
    document.getElementById(`totalPrice-${id}`).textContent =
      "($" + Number(item.count) * Number(item.price) + ")";
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
        document.querySelector(".container").style.display = "none";
        document.getElementById("emptyCart").style.display = "flex";
      }
    } else {
      document.getElementById(`qty-${id}`).textContent = item.count;
      document.getElementById(`totalPrice-${id}`).textContent =
        "($" + Number(item.count) * Number(item.price) + ")";
    }
    const jsonArray = JSON.stringify(cartItems);
    localStorage.setItem("cartProducts", jsonArray);
  }

  document.getElementById("Maincartspam").innerHTML =
    Number(document.getElementById("Maincartspam").innerHTML) - Number(1);
  document.getElementById("subcartspam").innerHTML =
    Number(document.getElementById("Maincartspam").innerHTML) - Number(1);
}
