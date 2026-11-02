
class Cart {
    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;

        const savedCart = localStorage.getItem(this.localStorageKey);

        this.cartItems = savedCart ? JSON.parse(savedCart) : [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryid: "1"
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryid: "2"
            }
        ];

        if (!savedCart) {
            this.#saveToStorage();
        }
    }

    #saveToStorage() {
        localStorage.setItem(
            this.localStorageKey,
            JSON.stringify(this.cartItems)
        );
    }

    removeItem(productId) {
        this.cartItems = this.cartItems.filter((item) => {
            return item.productId !== productId;
        });

        this.#saveToStorage();
    }

    updateCartQuantity() {
        let countCart = 0;

        this.cartItems.forEach((item) => {
            countCart += Number(item.quantity);
        });

        return countCart;
    }

    updateQuantity(productId, newQuantity) {
        this.cartItems.forEach((item) => {
            if (productId === item.productId) {
                item.quantity = Number(newQuantity);
            }
        });

        this.#saveToStorage();
    }

    updateDeliveryOption(productId, optionID) {
        const matchingItem = this.cartItems.find((item) => {
            return productId === item.productId;
        });

        if (matchingItem) {
            matchingItem.deliveryid = optionID;
            this.#saveToStorage();
        }
    }
}

const cart = new Cart('class-oops');
const businessCart = new Cart('class-business');

console.log(cart);
console.log(businessCart);

