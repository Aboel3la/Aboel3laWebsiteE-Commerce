let cartCounter = 0;

document.addEventListener("DOMContentLoaded", function () {
  menuResponsive();
  cartCounterUpdate();
});

/**** menu Responsive ******** */
function menuResponsive() {
  const toggleBtn = document.querySelector(".toggle-btn");
  const toggleBtnIcon = document.querySelector(".toggle-btn i");
  const dropdownMenu = document.querySelector(".dropdown_menu");
  toggleBtn.onclick = function () {
    dropdownMenu.classList.toggle("open");

    const isOpen = dropdownMenu.classList.contains("open");

    toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  };
}

function cartCounterUpdate() {
  cartCounter = 0;
  if (localStorage.getItem("cartProducts")) {
    let tmpItemsCart = localStorage.getItem("cartProducts");
    cartItems = JSON.parse(tmpItemsCart);
    cartItems.forEach((element) => {
      cartCounter += element.count;
    });
  }
  document.getElementById("Maincartspam").innerHTML = cartCounter;
  document.getElementById("subcartspam").innerHTML = cartCounter;

  // reduce((a, b) => a + b, 0);
}

let mybutton = document.getElementById("topIcondiv");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "flex";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function go_toCart() {
  window.location.href = "./cart.html";
}
