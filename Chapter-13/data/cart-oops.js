
function CreateCartobject(localStoragekey){
    let cart = {
    cartItems : JSON.parse(localStorage.getItem(localStoragekey)) || [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6" ,
    quantity: 2,
    deliveryid: "1"
},
{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d" ,
    quantity: 1,
    deliveryid: "2"
}             
],

removeItem(data){
  let newCart = [];
  this.cartItems.forEach((item)=>{
    if(data !== item.productId){
      newCart.push(item);
    } 
  })
  this.cartItems = newCart;
},


updateCartQuantity(){
  let countCart = 0;
    this.cartItems.forEach((data) => {
      countCart += Number(data.quantity);
    })
    return countCart
},

updateQuantiy(productId,newQuantity){
  this.cartItems.forEach((item)=>{
    if(productId === item.productId){
      item.quantity = newQuantity;
    }
    
  })

  localStorage.setItem(localStoragekey,JSON.stringify(this.cartItems));
},

updateDeliaryOption(productId, OptionID){
   let matchingItem;

    this.cartItems.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    })
    matchingItem.deliveryid = OptionID;
    localStorage.setItem(localStoragekey,JSON.stringify(this.cartItems));
}
}

return cart;
}

let cart = CreateCartobject("cart-oops");
let bussinessCart = CreateCartobject("cart-business");



console.log(cart);
console.log(bussinessCart);
