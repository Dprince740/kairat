 import { products } from './product.js'
//  import { cartArray } from './index.js'

//  export let cartArray=[
//     {
//         image:'./assets/golden-necklace.png',
//         name:'Gold Necklaces',
//         quantity:2
//     },{
//         image:'./assets/anklets.png',
//         name:'Golden Anklets',
//         quantity:3
//     },{
//         image:'./assets/silver-earring.png',
//         name:'Silver Earring',
//         quantity:4
//     }
// ]
let total=0
let checkoutNum=document.querySelector(".checkoutnum")
let cartArray=JSON.parse(localStorage.getItem('cart'))
let summaryItem=document.querySelectorAll(".summaryitem")
let summaryPrice=document.querySelector(".summaryprice")
let sumtotal=document.querySelector(".sumtotal")
let estimatedTax=document.querySelector(".est-tax")

console.log("cart page",cartArray)
let sum=0
let estimatedTaxx=0
let cartHtml=''
cartArray.forEach((cartItem,index)=>{
  checkoutNum.innerHTML=cartArray.length
  summaryItem.forEach((item)=>{
    item.innerHTML=cartArray.length
  })
    let cart=cartItem.productname
    let matching;
    products.forEach((product)=>{
        if(product.name===cart){
            matching=product
        }
    })

    
      sum+=matching.price * cartItem.quantity
      summaryPrice.innerHTML=`$${sum}`
      sumtotal.innerHTML=`$${sum}`
      estimatedTaxx=Number(((10/100)*sum).toFixed(2))
      estimatedTax.innerHTML=`$${estimatedTaxx}`
      
    

    cartHtml+=
    `
    <div class="row mt-2 delivery-container-parent pe-4" main-${matching.name}  style="">
                    <div class=" col-8 border border-4 my-5 " style="">
                        <h3 class="delivery-date-shipping">Delivery date:</h3>
                        <div class="row d-flex gap-2 ps-3 mt-4">
                            <div class="col-4 border border-3" style=""><img class="img-fluid" src="${matching.image}" alt=""></div>
                            <div class="col-7 border border-3">
                                <h1 class="fs-5">${matching.name}</h1>
                                <h2 class="fs-5 text-danger">$${matching.price}</h2>
                                <h3 class="fs-5">Quantity: <span>${cartItem.quantity}</span></h3>
                                <h5 class="text-primary"><span class="update-quantity" data-product-name="${matching.name}">Update</span>  <span onclick="deletee()" class="del" style="cursor:pointer;" data-product-name="${matching.name}">Delete</span></h5>
                            </div>
                        </div>
                    </div>
                        <div class="col-4 border border-4  deliveryy  " style="margin-top: 90px;margin-bottom: 100px;">
                            <div class="delivery-container py-3">

                                <h6 class="fs-5">Choose a delivery option:</h6>
                              
                                <!-- Option 1 -->
                                <div class="delivery-option d-flex align-items-center">
                                  <input type="radio" name="${matching.name}" value="free" id="free" ">
                                  <label for="free">
                                    <div class="delivery-date">Tuesday, June 21</div>
                                    <div class="delivery-price free">FREE Shipping</div>
                                  </label>
                                </div>
                              
                                <!-- Option 2 -->
                                <div class="delivery-option d-flex align-items-center">
                                  <input type="radio" name="${matching.name}" value="$4.99" id="fast">
                                  <label for="fast">
                                    <div class="delivery-date">Wednesday, June 15</div>
                                    <div class="delivery-price">$4.99 - Shipping</div>
                                  </label>
                                </div>
                              
                                <!-- Option 3 -->
                                <div class="delivery-option d-flex align-items-center">
                                  <input type="radio" name="${matching.name}" value="$9.99" id="express">
                                  <label for="express">
                                    <div class="delivery-date">Monday, June 13</div>
                                    <div class="delivery-price">$9.99 - Shipping</div>
                                  </label>
                                </div>
                              </div>
                        </div>
                </div>
    `
    // let checkedInput=document.querySelector(`input:checked`)
    // console.log(checkedInput)
    document.querySelector(".display-html").innerHTML=cartHtml;

    let updateQuantity=document.querySelectorAll(".update-quantity")
    updateQuantity.forEach((button)=>{
      button.addEventListener("click",()=>{
        let productName=button.dataset.productName;
        let product=cartArray.find((item)=>{
          return item.productname===productName
        })
        let newQuantity=prompt("enter new quantity")
        newQuantity=Number(newQuantity);
        product.quantity=newQuantity;
        location.reload()
        localStorage.setItem("cart",JSON.stringify(cartArray))
      })
    })

    let radios = document.querySelectorAll('input[type="radio"]');

radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      let productContainer=radio.closest(".delivery-container-parent");
      let deliveryDatee=productContainer.querySelector(".delivery-date-shipping")
        let totalshipping = 0;

        let selectedRadios = document.querySelectorAll(
            'input[type="radio"]:checked'
        );
        selectedRadios.forEach((radio) => {

            if (radio.value === "free") {
                totalshipping += 0;
                deliveryDatee.innerHTML="Delivery date:Tuesday, June 21"
            } 
            else if (radio.value === "$4.99") {
                totalshipping += 4.99;
                deliveryDatee.innerHTML="Delivery date:Wednessday, June 15"
            } 
            else if (radio.value === "$9.99") {
                totalshipping += 9.99;
                deliveryDatee.innerHTML="Delivery date:Monday, June 13"
            }

        });
        document.querySelector(".shiping").innerHTML= totalshipping;
        let overallsum=0
        overallsum=totalshipping+sum+estimatedTaxx;
        overallsum=overallsum.toFixed(2)
        document.querySelector(".totall").innerHTML=overallsum
        
    });
});
    
    document.querySelectorAll(".del").forEach((btn) => {
      btn.addEventListener("click", () => {
  
          let productName = btn.dataset.productName;
  
          cartArray = cartArray.filter((item) => {
              return item.productname !== productName;
          });
  
          localStorage.setItem("cart", JSON.stringify(cartArray));
  
          location.reload();
      });
  });

})

// document.querySelectorAll(".del").forEach((btn)=>{
//     btn.addEventListener('click',()=>{
//       let productname=btn.dataset.productName
//         let newArray=[]
      
//         cartArray.forEach((item)=>{
//           if(productname!==item.name){
//             newArray.push(item)
//             cartArray=newArray
//           }
//         })

//     })
// })
