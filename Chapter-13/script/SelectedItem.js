import { cart, removeItem, updateCartQuantity, updateQuantiy } from "../data/itemCart.js";
import { products } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js"



let itemHtml = '';
cart.forEach((item) => {
  let matchingItem2;
  products.forEach((product) => {
    if (product.id === item.productId) {
      matchingItem2 = product
    }
  })

  itemHtml += `
        <div class="cart-item-container id-${matchingItem2.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem2.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem2.name}
                </div>
                <div class="product-price">
                  $${(matchingItem2.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label lable-id-${item.productId}">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary" data-product-id="${item.productId}">
                    Update
                  </span>
                  <input class="quantity-input quanity-id-${matchingItem2.id}" type="number">
                  <span class="save-quantity-link link-primary" data-product-id="${item.productId}">Save</span>
                  <span class="delete-quantity-link link-primary" data-product-id="${item.productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title ">
                  Choose a delivery option:
                </div>
                
              </div>
            </div>
          </div>
    `
  document.querySelector(".order-summary").innerHTML = itemHtml;
})


let deleteBtn = document.querySelectorAll(".delete-quantity-link")
deleteBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let data = btn.dataset.productId;
    let product_Element = document.querySelector(`.id-${data}`)

    product_Element.remove();
    removeItem(data);
    document.querySelector(".cart_quantity").innerHTML = `${updateCartQuantity()} item`;

    localStorage.setItem("cart", JSON.stringify(cart));

  })
})
document.querySelector(".cart_quantity").innerHTML = `${updateCartQuantity()} item`;


let updateBtn = document.querySelectorAll(".update-quantity-link")
updateBtn.forEach((link) => {
  link.addEventListener("click", () => {
    let dataId = link.dataset.productId
    let product = document.querySelector(`.id-${dataId}`);
    product.classList.add("is-editing-quantity");
  })
})


let saveBtn = document.querySelectorAll(".save-quantity-link")
saveBtn.forEach((save) => {
  save.addEventListener("click", () => {
    let dataId = save.dataset.productId;
    let product = document.querySelector(`.id-${dataId}`);
    product.classList.remove("is-editing-quantity")
    let inputValue = document.querySelector(`.quanity-id-${dataId}`);
    let newQuantity = inputValue.value;
    if (newQuantity >= 0 && newQuantity < 1000) {
      updateQuantiy(dataId, newQuantity);
      console.log(cart);
      let quanitylable = document.querySelector(`.lable-id-${dataId}`)
      quanitylable.innerHTML = newQuantity
      document.querySelector(".cart_quantity").innerHTML = `${updateCartQuantity()} item`;
    } else {
      alert("Enter vaild Quantity");
    }
  })
})

function deliveryOptionsHtml(){

  `
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingItem2.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem2.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem2.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
  `
}











