import { cart , updateCartQuantity} from "../../data/itemCart.js";
import { products } from "../../data/products.js";

export function renderCheckoutHeader(){
    document.querySelector(".cart_quantity").innerHTML = `${updateCartQuantity()} item`;    
}

