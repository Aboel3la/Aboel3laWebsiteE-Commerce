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
