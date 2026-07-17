import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6" ,
    quantity: 2,
},
{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d" ,
    quantity: 1,
}             
]

export function removeItem(data){
  let newCart = [];
  cart.forEach((item)=>{
    if(data !== item.productId){
      newCart.push(item);
    } 
  })
  cart = newCart;

}