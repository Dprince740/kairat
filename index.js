// export { cartArray }
import { products } from "./product.js";


/* =========================
   CART
========================= */

const cart = document.getElementById("cart-increment");

let cartArray =
    JSON.parse(localStorage.getItem("cart")) || [];


/* =========================
   DISPLAY CART QUANTITY
========================= */

function updateCartNumber() {

    let cartQuantity = 0;

    cartArray.forEach((item) => {

        cartQuantity += Number(item.quantity);

    });

    cart.innerText = cartQuantity;

    localStorage.setItem(
        "cartquantity",
        JSON.stringify(cartQuantity)
    );
}


/* Display saved quantity
   when page loads */

updateCartNumber();


/* =========================
   DISPLAY PRODUCTS
========================= */

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

                <h3>
                    ${product.name}
                </h3>

            </div>


            <div class="product-price">

                <h4>
                    $${Number(product.price).toFixed(2)}
                </h4>

            </div>


            <h6
                class="adding"
                style="opacity:0;"
            >
                Added &#10003;
            </h6>


            <button
                class="adder"
                data-product-name="${product.name}"
            >
                Add to cart
            </button>

        </div>

    `;

});


document.querySelector(
    ".js-product-container"
).innerHTML = publish;


/* =========================
   ADD TO CART
========================= */

document.querySelectorAll(".adder").forEach((button) => {

    button.addEventListener("click", () => {


        const productName =
            button.dataset.productName;


        /* Find product */

        const matching =
            cartArray.find((item) => {

                return item.productname === productName;

            });


        /* =========================
           ALREADY IN CART
        ========================= */

        if (matching) {

            matching.quantity += 1;

        }


        /* =========================
           NEW PRODUCT
        ========================= */

        else {

            cartArray.push({

                productname: productName,

                quantity: 1

            });

        }


        /* =========================
           SAVE CART
        ========================= */

        localStorage.setItem(
            "cart",
            JSON.stringify(cartArray)
        );


        /* Update cart number */

        updateCartNumber();


        /* =========================
           SHOW ADDED MESSAGE
        ========================= */

        const productCard =
            button.closest(".product-card");


        const addedText =
            productCard.querySelector(".adding");


        addedText.style.opacity = "1";


        setTimeout(() => {

            addedText.style.opacity = "0";

        }, 1500);


        console.log(
            "CART:",
            cartArray
        );

    });

});