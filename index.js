import { products } from "./product.js";

const cart = document.getElementById("cart-increment");
let cartArray = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartNumber() {
    let cartQuantity = 0;

    cartArray.forEach((item) => {
        cartQuantity += Number(item.quantity);
    });

    cart.textContent = cartQuantity;
    localStorage.setItem("cartquantity", JSON.stringify(cartQuantity));
}

function renderProducts() {
    let publish = "";

    products.forEach((product) => {
        publish += `
            <div class="product-card">
                <div class="product-img">
                    <img
                        class="imagee"
                        src="${product.image}"
                        alt="${product.name}"
                    >
                </div>

                <div class="product-name">
                    <h3>${product.name}</h3>
                </div>

                <div class="product-price">
                    <h4>$${Number(product.price).toFixed(2)}</h4>
                </div>

                <h6 class="adding">Added ✓</h6>

                <button
                    class="adder"
                    data-product-name="${product.name}"
                >
                    Add to cart
                </button>
            </div>
        `;
    });

    document.querySelector(".js-product-container").innerHTML = publish;
}

function addToCart(button) {
    const productName = button.dataset.productName;

    const matching = cartArray.find((item) => {
        return item.productname === productName;
    });

    if (matching) {
        matching.quantity += 1;
    } else {
        cartArray.push({
            productname: productName,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cartArray));
    updateCartNumber();

    const productCard = button.closest(".product-card");
    const addedText = productCard.querySelector(".adding");

    button.textContent = "✓ Added to cart";
    button.classList.add("added");

    addedText.classList.add("show");

    setTimeout(() => {
        button.textContent = "Add to cart";
        button.classList.remove("added");
        addedText.classList.remove("show");
    }, 1500);
}

renderProducts();
updateCartNumber();

document.querySelectorAll(".adder").forEach((button) => {
    button.addEventListener("click", () => {
        addToCart(button);
    });
});