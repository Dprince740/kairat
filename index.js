// export { cartArray }
import { products } from './product.js'

let cart=document.getElementById("cart-increment")
let publish=''
// let cartArray=[]
let cartArray = JSON.parse(localStorage.getItem('cart')) || [];

console.log("INDEX CART:", cartArray);

products.forEach((product)=>{
    publish+=`
     <div class="product-card">
                <div class="product-img">
                    <img class="imagee" src="${product.image}" alt=""></div>
                <div class="product-name">
                    <h3>${product.name}</h3>
                </div>
                <div class="product-price">
                    <h4>$${product.price}</h4>
                </div>
                <h6 class="adding" style="opacity:0">Added &#10003</h6>
                <button class="adder" data-product-name="${product.name}">Add to cart</button>
            </div>`
    console.log(publish)
    // console.log(product)
})

document.querySelector(".js-product-container").innerHTML=publish


document.querySelectorAll(".adder").forEach((button)=>{
    button.addEventListener("click",()=>{
        // alert("hello")
        // let productCard=button.closest(".product-card")
        // let addedText=productCard.querySelector(".adding")
        // if(button.innerHTML==="Add to cart"){
        //     button.innerHTML="Adding..."
        //     setTimeout(()=>{
        //         // alert("Product Added" )
        //       addedText.classList.add("inserted")
        //         button.innerHTML="Remove from cart "
        //     },1000)
        //     setTimeout(()=>{
        //         // alert("Product Added" )
        //       addedText.classList.remove("inserted")
        //       addedText.classList.add("time")
        //         button.innerHTML="Remove from cart "
        //     },3000)
        // }else{
        //     button.innerHTML="Removing..."
        //     setTimeout(()=>{
        //         alert("Product Removed")
        //         button.innerHTML="Add to cart"
        //     },2000)
        // }
        let matching;
        let namee=button.dataset.productName
        cartArray.forEach((item)=>{
            if(namee===item.productname){
                matching=item
            }
            // console.log(matching)
        })
        if(matching){
            matching.quantity+=1
        }else{
            cartArray.push({
                productname:namee,
                quantity:1
            })
        }
        localStorage.setItem("cart",JSON.stringify(cartArray))

    console.log('hello',localStorage.getItem('cart'))


        let cartQuantity=0
        // cart.innerHTML=cartQuantity
        cartArray.forEach((item)=>{
            cartQuantity+=item.quantity
            cart.innerText=cartQuantity
            localStorage.setItem("cartquantity",JSON.stringify(cartQuantity))
        })
    
        console.log(cartArray)

       

    })
})
