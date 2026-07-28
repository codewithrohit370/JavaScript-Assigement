import { products } from "../../data/products.js";
import { cart, updateCartQuantity } from "../../data/itemCart.js";
import { deliveryOptions } from "../../data/delivaryOption.js";

export function calculateOrderSummary() {
    let totalprice = 0;
    cart.forEach((element) => {
        let matchingItem;
        products.forEach((item) => {
            if (element.productId === item.id) {
                matchingItem = item;
            }
        })
        totalprice += (matchingItem.priceCents * element.quantity) / 100;
    });
    let shippingTotal = 0;
    cart.forEach((element) => {
        let matchingDelivary
        deliveryOptions.forEach((delivery) => {
            if (delivery.Id === element.deliveryid)
                matchingDelivary = delivery;
        })
        shippingTotal += (matchingDelivary.deliveryPrice) / 100;
    })
    const shippingText =
        shippingTotal === 0
            ? "Free Shipping"
            : `$${(shippingTotal).toFixed(2)}`;

    let totalBeforTax = totalprice + shippingTotal;
    console.log(totalBeforTax)
    let taxAmount = totalBeforTax * 10 / 100;
    console.log(taxAmount)
    let totalorderValue = totalBeforTax + taxAmount;
    console.log(totalorderValue)

    let orderHTml = `
            <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${updateCartQuantity()  }):</div>
            <div class="payment-summary-money">$${totalprice.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${shippingText}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforTax.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${taxAmount.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalorderValue.toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    
    `
    document.querySelector(".payment-summary").innerHTML = orderHTml;
}
