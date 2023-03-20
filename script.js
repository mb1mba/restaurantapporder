import { menuArray } from './data.js';

const yourOrder = document.querySelector('.yourOrder');
let cardName = document.getElementById('name');
let cardNb = document.getElementById('cardNb');
let cvv = document.getElementById('cvv')



let cartArray = [];

document.addEventListener('click', function (e) {
    if (e.target.dataset.cart) {
        addToOrder(e.target.dataset.cart);
        myOrder();
        yourOrder.style.display="block";
        sumCartArray();
        document.querySelector('.thanksMsg').style.display="none"
    }  


    if(e.target.className === 'complete-order-btn'){
        document.querySelector('.enterCard').style.display="block";
    }

    if(e.target.className === 'pay'){
        payOrder()
    }

    if(e.target.className === 'remove-order-btn'){
        removeFromOrder(e.target.dataset.remove);
    }
})

function addToOrder(menuId) {
    menuArray.filter(function(menu) {
        if (menuId === menu.name){
            cartArray[menu.name+" "+ Object.keys(cartArray).length] = menu.price;
        } 
    })
}

function removeFromOrder(removeId){ 
    for (let [key] of Object.entries(cartArray)){
        if(removeId === `${key}`){
            delete cartArray[key];
        }
    }
    myOrder()
    sumCartArray()
     let sum = document.querySelector('.sum-price').innerHTML
    if(sum === "$0"){
        yourOrder.style.display="none";
    }
}  

function sumCartArray(){
    let sum = 0;
    for (let key in cartArray){
        sum += cartArray[key];
    }
        document.querySelector('.sum-price').innerHTML = "$" + sum;
}

function payOrder(){
    let msg = ``;
    let name = cardName.value;
    let cardNumber = cardNb.value;
    let cardCvv = cvv.value
    if(name === "" || cardNumber === "" || cardCvv ===""){
        alert('Informations are missing')
    } else if(name && cardNumber && cardCvv){
        document.querySelector('.enterCard').style.display="none";
        document.querySelector('.thanksMsg').style.display="flex";
        yourOrder.style.display="none";
        cartArray = []
        msg = `<p >Thanks ${name}! Your order is on its way!</p>`
        document.querySelector('.thanksMsg').innerHTML = msg
    }
}   

function myOrder(){
    let myOrder = ``
    for (let key in cartArray){
        myOrder += `
        <div class="order-inner">
            <p class="order-food">${key.slice(0, -1)}</p>
            <button class="remove-order-btn" data-remove="${key}">Remove</button>
            <p class="order-price">$${cartArray[key]}</p>
        </div>
        `
    }
    document.getElementById('order-content').innerHTML = myOrder;
}

function getMenu(){
    let eat = ``;
    menuArray.forEach(function(food) {
        eat += `
<div class="menu-content">
        <p class="menu-emoji">${food.emoji}</p>
        <div class="menu-list">
            <p class="food-name">${food.name}</p>
            <p class="food-ingredients">${food.ingredients}</p>
            <p class="food-price">$${food.price}</p>
        </div>

        <div class="cart-btn">
            <i class="fa-sharp fa-solid fa-cart-plus addBtn" data-cart=${food.name}></i>
        </div>
</div>

<div class="border-bottom"></div>
`
    })
    return eat;
}

function render() {
    menu.innerHTML = getMenu();
}

render()
