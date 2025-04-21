// addEventListener("load", (event) => {});

let prods = "";
let cartItems = [];

document.addEventListener("DOMContentLoaded", function () {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      prods = data;
    })
    .catch((error) => console.error("Error loading products:", error));

  setInterval(autoSlider, 5000);

  setTimeout(function () {
    loadAllProducts();
    const catList = document.getElementsByClassName("singleCategory");
    catList[0].classList.add("singleCategoryFocus");
  }, 1000);

  cartCounterUpdate();
});

/***       Slider Image *** */

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function autoSlider() {
  showDivs((slideIndex += 1));
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  // x[slideIndex].classList.add("mySlodesFadeOut");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    x[i].classList.remove("mySlidesFadIn");
    // x[i].classList.add("mySlodesFadeOut");
  }
  x[slideIndex - 1].style.display = "block";
  // x[slideIndex - 1].classList.remove("mySlodesFadeOut");

  x[slideIndex - 1].classList.add("mySlidesFadIn");
}

/*******   products ****** */
function loadProducts(category, id) {
  const container = document.getElementById("productContainer");
  const catList = document.getElementsByClassName("singleCategory");
  for (let i = 0; i < catList.length; i++) {
    catList[i].classList.remove("singleCategoryFocus");
  }
  catList[id].classList.add("singleCategoryFocus");

  container.innerHTML = "";
  if (category != "All") {
    prods.forEach((product) => {
      if (product.category == category) {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.brand} ${product.model}</h3>

            <p><strong>${product.price}$</strong></p>
            <button class="buy-button">Buy</button>
          `;

        card.querySelector(".buy-button").addEventListener("click", () => {
          addItemToCart(product);
        });

        container.appendChild(card);
      }
    });
  } else loadAllProducts();

  // window.location.hash = "#ProductsSection";
  setTimeout(function () {
    const element = document.getElementById("ProductsSection");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
  //   return false;
}

function loadAllProducts() {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";
  prods.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
            <div style="height: 55%">

              <img src="${product.image}" alt="${product.title}">
            </div>
            <div style="height: 25%">
              <h3>${product.brand} ${product.model}</h3>
              <p><strong>${product.price}$</strong></p>
            </div>
            <div style="height: 20%; width:100%">

              <button class="buy-button">add to cart</button>
            </div>

          `;

    card.querySelector(".buy-button").addEventListener("click", () => {
      // alert(`You have bought: ${product.id} for ${product.price}`);

      // for (let i = 0; i < cartItems.length; i++)
      // {
      //   if(cartItems[i].id;
      // }
      // cartItems = localStorage.getItem("cartItems");
      addItemToCart(product);
    });

    container.appendChild(card);
  });

  // window.location.hash = "#ProductsSection";

  //   return false;
}

function addItemToCart(product) {
  const str = localStorage.getItem("cartProducts");

  cartItems = JSON.parse(str);
  if (cartItems == null) cartItems = [];
  if (cartItems.find((element) => element.id == product.id)) {
    cartItems.find((element) => element.id == product.id).count++;
  } else {
    cartItems.push({
      id: product.id,
      name: product.brand + " " + product.model,
      img: product.image,
      price: product.price,
      count: 1,
    });
  }
  cartCounter++;
  document.getElementById("Maincartspam").innerHTML = cartCounter;
  document.getElementById("subcartspam").innerHTML = cartCounter;

  // convert array to JSON string using JSON.stringify()
  // cartItems = [];
  const jsonArray = JSON.stringify(cartItems);
  // const jsonCartCounter = JSON.stringify(cartCounter);

  console.log(cartItems);

  // save to localStorage using "array" as the key and jsonArray as the value
  localStorage.setItem("cartProducts", jsonArray);
  // localStorage.setItem("ItemsCartCounter", jsonCartCounter);
}

function go_toCart() {
  window.location.href = "./Cart.html";
}

function go_toTop() {
  // const element = document.querySelector(".mainHeader");
  // element.scrollIntoView({
  //   behavior: "smooth",
  //   block: "start",
  // });
  window.location.href = "./home.html#sliderSection";
}
