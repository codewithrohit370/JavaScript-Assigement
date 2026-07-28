import { cart, removeItem, updateCartQuantity, updateQuantiy , updateDeliaryOption } from "../../data/itemCart.js";
import { products } from "../../data/products.js"
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/delivaryOption.js";
import { calculateOrderSummary } from "./paymentSummary.js";

console.log(calculateOrderSummary());
function renderCart(){
  
let itemHtml = '';


cart.forEach((item) => {
  let matchingItem2;
  products.forEach((product) => {
    if (product.id === item.productId) {
      matchingItem2 = product
    }
  })

  let delivaryOptionId = item.deliveryid;
  let matchingDelivary;
  deliveryOptions.forEach((optionID)=>{
    if(optionID.Id === delivaryOptionId){
      matchingDelivary = optionID
    }
  }) ;
  const todayDate = dayjs();
  const deliveryDate = todayDate.add(matchingDelivary.deliveryDays,"days");
  const deliveryFormatDate = deliveryDate.format('dddd, MMMM  D')

 


  itemHtml += `
        <div class="cart-item-container id-${matchingItem2.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryFormatDate}
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
                ${deliveryOptionsHtml(matchingItem2 , item)}
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
    calculateOrderSummary();
  })
})
function deliveryOptionsHtml(matchingItem2 , item){
  let deliveryHtml = ''
    deliveryOptions.forEach((delivaryOption)=>{
      const todayDate = dayjs();
      const deliveryDate = todayDate.add(delivaryOption.deliveryDays,"days");
      const deliveryFormatDate = deliveryDate.format('dddd, MMMM  D')
      const deliveryPrice = delivaryOption.deliveryPrice === 0 ? "Free ": `$${(delivaryOption.deliveryPrice)/100}`;
      const isCheck = delivaryOption.Id === item.deliveryid;  
      deliveryHtml+=`
          <div class="delivery-option js-delivery-option"
          data-product-id = "${matchingItem2.id}"
          data-option-id = "${delivaryOption.Id}">
            <input type="radio" ${isCheck ? 'checked': ''}
              class="delivery-option-input"
              name="delivery-option-${matchingItem2.id}">
            <div>
              <div class="delivery-option-date">
                ${deliveryFormatDate}
              </div>
              <div class="delivery-option-price">
                ${deliveryPrice} Shipping
              </div>
            </div>
          </div>
        `
    })
    return deliveryHtml;
  
}
document.querySelectorAll(".js-delivery-option")
.forEach((element)=>{
    element.addEventListener('click',()=>{
      const productId = element.dataset.productId;
      const OptionsId = element.dataset.optionId;
      updateDeliaryOption(productId, OptionsId)
      renderCart();
      calculateOrderSummary();
    })
  })


}
renderCart();











