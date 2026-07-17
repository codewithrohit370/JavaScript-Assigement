import { cart } from "../data/itemCart.js";
import { products } from "../data/products.js";

let html = ''
products.forEach((item, index) => {
    html += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${item.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${item.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${item.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${item.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(item.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${item.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${item.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${item.id}">
            Add to Cart
          </button>
        </div>`

    document.querySelector(".products-grid").innerHTML = html;
})

let addMessagetimeID = {};

document.querySelectorAll('.add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
        let itemID = button.dataset.productId;
        let select = document.querySelector(`.js-quantity-selector-${itemID}`)
        let quantity = select.value

        let matchingItem;

        cart.forEach((item) => {
            if (itemID === item.productId) {
                matchingItem = item;
            }
        })
        if (matchingItem) {
            matchingItem.quantity += Number(quantity);
        } else {
            cart.push({
                productId: itemID,
                quantity: Number(quantity)
            });
            localStorage.setItem("cart",JSON.stringify(cart))
        }
        let count = 0
        function addquantity() {
            cart.forEach((item) => {
                count += item.quantity;
            })
            
        }
        addquantity()
        localStorage.setItem("cart",JSON.stringify(cart))
        document.querySelector(".cart-quantity").innerHTML = `${count}`



        let show = document.querySelector(`.js-added-to-cart-${itemID}`)
        show.classList.add("New-class");

        clearTimeout(addMessagetimeID[itemID]);

        addMessagetimeID[itemID] = setTimeout(() => {
            show.classList.remove("New-class");
        }, 2000)
    })
})  







