import { products } from "./product.js";


/* =========================
   ELEMENTS
========================= */

const checkoutNum = document.querySelector(".checkoutnum");
const summaryItems = document.querySelectorAll(".summaryitem");
const summaryPrice = document.querySelector(".summaryprice");
const shippingElement = document.querySelector(".shiping");
const sumtotal = document.querySelector(".sumtotal");
const estimatedTax = document.querySelector(".est-tax");
const totalElement = document.querySelector(".totall");
const displayHtml = document.querySelector(".display-html");


/* =========================
   GET CART
========================= */

let cartArray = JSON.parse(localStorage.getItem("cart")) || [];


/* =========================
   FIND PRODUCT
========================= */

function findProduct(productName) {

    return products.find((product) => {
        return product.name === productName;
    });

}


/* =========================
   CALCULATE CART TOTAL
========================= */

function getCartTotal() {

    let total = 0;

    cartArray.forEach((cartItem) => {

        const product = findProduct(cartItem.productname);

        if (product) {

            total += product.price * cartItem.quantity;

        }

    });

    return total;

}


/* =========================
   TOTAL QUANTITY
========================= */

function getTotalQuantity() {

    let quantity = 0;

    cartArray.forEach((cartItem) => {

        quantity += Number(cartItem.quantity);

    });

    return quantity;

}


/* =========================
   SHIPPING TOTAL
========================= */

function getShippingTotal() {

    let shipping = 0;

    const selectedRadios =
        document.querySelectorAll(
            'input[type="radio"]:checked'
        );

    selectedRadios.forEach((radio) => {

        shipping += Number(radio.value);

    });

    return shipping;

}


/* =========================
   UPDATE SUMMARY
========================= */

function updateSummary() {

    const itemsTotal = getCartTotal();

    const quantity = getTotalQuantity();

    const shipping = getShippingTotal();

    const tax =
        Number((itemsTotal * 0.10).toFixed(2));

    const orderTotal =
        itemsTotal + shipping + tax;


    /* HEADER */

    checkoutNum.textContent = quantity;


    /* SUMMARY ITEMS */

    summaryItems.forEach((item) => {

        item.textContent = quantity;

    });


    /* PRICES */

    summaryPrice.textContent =
        `$${itemsTotal.toFixed(2)}`;

    shippingElement.textContent =
        shipping.toFixed(2);

    sumtotal.textContent =
        `$${itemsTotal.toFixed(2)}`;

    estimatedTax.textContent =
        `$${tax.toFixed(2)}`;

    totalElement.textContent =
        orderTotal.toFixed(2);

}


/* =========================
   RENDER CART
========================= */

function renderCart() {

    /* EMPTY CART */

    if (cartArray.length === 0) {

        displayHtml.innerHTML = `
            <div class="empty-cart">

                <h2>Your cart is empty</h2>

                <p>
                    Add some products to your cart
                    before checking out.
                </p>

            </div>
        `;

        updateSummary();

        return;

    }


    let cartHtml = "";


    cartArray.forEach((cartItem, index) => {

        const matching =
            findProduct(cartItem.productname);


        /* PRODUCT DOES NOT EXIST */

        if (!matching) {
            return;
        }


        cartHtml += `

            <div
                class="delivery-container-parent"
                data-index="${index}"
            >

                <!-- PRODUCT -->

                <div class="cart-product">

                    <h3 class="delivery-date-shipping">
                        Delivery date: Tuesday, June 21
                    </h3>


                    <div class="product-content">


                        <!-- IMAGE -->

                        <div class="product-image">

                            <img
                                src="${matching.image}"
                                alt="${matching.name}"
                            >

                        </div>


                        <!-- PRODUCT INFORMATION -->

                        <div class="product-info">

                            <h1 class="product-name">
                                ${matching.name}
                            </h1>


                            <h2 class="product-price">
                                $${Number(matching.price).toFixed(2)}
                            </h2>


                            <h3 class="quantity-text">

                                Quantity:

                                <span>
                                    ${cartItem.quantity}
                                </span>

                            </h3>


                            <div class="product-actions">

                                <span
                                    class="update-quantity"
                                    data-product-name="${matching.name}"
                                >
                                    Update
                                </span>


                                <span
                                    class="del"
                                    data-product-name="${matching.name}"
                                >
                                    Delete
                                </span>

                            </div>

                        </div>

                    </div>

                </div>


                <!-- DELIVERY OPTIONS -->

                <div class="deliveryy">

                    <div class="delivery-container">


                        <h6 class="delivery-title">
                            Choose a delivery option:
                        </h6>


                        <!-- FREE -->

                        <div class="delivery-option">

                            <input
                                type="radio"
                                name="delivery-${index}"
                                id="free-${index}"
                                value="0"
                                data-date="Tuesday, June 21"
                                checked
                            >

                            <label for="free-${index}">

                                <div class="delivery-date">
                                    Tuesday, June 21
                                </div>

                                <div class="delivery-price free">
                                    FREE Shipping
                                </div>

                            </label>

                        </div>


                        <!-- FAST -->

                        <div class="delivery-option">

                            <input
                                type="radio"
                                name="delivery-${index}"
                                id="fast-${index}"
                                value="4.99"
                                data-date="Wednesday, June 15"
                            >

                            <label for="fast-${index}">

                                <div class="delivery-date">
                                    Wednesday, June 15
                                </div>

                                <div class="delivery-price">
                                    $4.99 - Shipping
                                </div>

                            </label>

                        </div>


                        <!-- EXPRESS -->

                        <div class="delivery-option">

                            <input
                                type="radio"
                                name="delivery-${index}"
                                id="express-${index}"
                                value="9.99"
                                data-date="Monday, June 13"
                            >

                            <label for="express-${index}">

                                <div class="delivery-date">
                                    Monday, June 13
                                </div>

                                <div class="delivery-price">
                                    $9.99 - Shipping
                                </div>

                            </label>

                        </div>


                    </div>

                </div>

            </div>

        `;

    });


    /* PUT HTML ON PAGE */

    displayHtml.innerHTML = cartHtml;


    /* UPDATE SUMMARY */

    updateSummary();


    /* =========================
       UPDATE QUANTITY
    ========================= */

    document
        .querySelectorAll(".update-quantity")
        .forEach((button) => {

            button.addEventListener("click", () => {

                const productName =
                    button.dataset.productName;


                const product =
                    cartArray.find((item) => {

                        return item.productname === productName;

                    });


                if (!product) {
                    return;
                }


                const newQuantity =
                    prompt(
                        "Enter new quantity:",
                        product.quantity
                    );


                /* CANCEL */

                if (newQuantity === null) {
                    return;
                }


                const quantity =
                    Number(newQuantity);


                /* VALIDATION */

                if (
                    !Number.isInteger(quantity) ||
                    quantity < 1
                ) {

                    alert(
                        "Please enter a valid quantity of 1 or more."
                    );

                    return;

                }


                /* UPDATE */

                product.quantity = quantity;


                /* SAVE */

                localStorage.setItem(
                    "cart",
                    JSON.stringify(cartArray)
                );


                /* RELOAD */

                location.reload();

            });

        });


    /* =========================
       DELETE PRODUCT
    ========================= */

    document
        .querySelectorAll(".del")
        .forEach((button) => {

            button.addEventListener("click", () => {

                const productName =
                    button.dataset.productName;


                cartArray =
                    cartArray.filter((item) => {

                        return item.productname !== productName;

                    });


                /* SAVE */

                localStorage.setItem(
                    "cart",
                    JSON.stringify(cartArray)
                );


                /* RELOAD */

                location.reload();

            });

        });


    /* =========================
       DELIVERY RADIO BUTTONS
    ========================= */

    document
        .querySelectorAll(
            'input[type="radio"]'
        )
        .forEach((radio) => {

            radio.addEventListener(
                "change",
                () => {

                    /* FIND THIS PRODUCT */

                    const productContainer =
                        radio.closest(
                            ".delivery-container-parent"
                        );


                    /* GET DATE HEADING */

                    const deliveryHeading =
                        productContainer.querySelector(
                            ".delivery-date-shipping"
                        );


                    /* CHANGE DATE */

                    deliveryHeading.textContent =
                        `Delivery date: ${radio.dataset.date}`;


                    /* UPDATE ORDER SUMMARY */

                    updateSummary();

                }
            );

        });

}


/* =========================
   START
========================= */

renderCart();

const placeOrderButton = document.querySelector(".place-order");

placeOrderButton.addEventListener("click", () => {
  if (cartArray.length === 0) {
    alert("Your cart is empty. Please add a product before placing an order.");
    return;
  }
    const checkedRadios = document.querySelectorAll(
        'input[type="radio"]:checked'
    );

    if (checkedRadios.length < cartArray.length) {
        alert("Please choose a delivery option for every product.");
        return;
    }
    

    const itemsTotal = Number(
        document.querySelector(".summaryprice").textContent
            .replace("$", "")
    );

    const shipping = Number(
        document.querySelector(".shiping").textContent
    );

    const tax = Number(
        document.querySelector(".est-tax").textContent
            .replace("$", "")
    );

    const total = Number(
        document.querySelector(".totall").textContent
    );

    const orderNumber =
        "KA-" + Math.floor(100000 + Math.random() * 900000);

    const completedOrder = {
        orderNumber: orderNumber,
        itemsTotal: itemsTotal,
        shipping: shipping,
        tax: tax,
        total: total
    };

    localStorage.setItem(
        "completedOrder",
        JSON.stringify(completedOrder)
    );

    localStorage.removeItem("cart");

    window.location.href = "order-confirmation.html";
});