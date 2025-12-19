 const cartWrapper = document.querySelector('.listCart');

 window.addEventListener('click', function (event) {
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        const counterWrapper = event.target.closest('.item-counter');
         if(!counterWrapper)return;
        const counter = counterWrapper.querySelector('[data-counter]');
        if(event.target.dataset.action==='plus'){
            counter.innerText=++counter.innerText;
        }
        if(event.target.dataset.action==='minus' && counter.innerText > 1){
            counter.innerText=--counter.innerText;
        }
    }
        if(event.target.closest('.cancle-img')){
           event.target.closest('.card').remove();
           calcCartPrice1();
           toggleCartStatus();
           calculateNumber();
        }
        
        if (event.target.closest('[data-cart]')) {
            const card = event.target.closest('.card');
            const productInfo = {
                id: card.dataset.id,
                imgSrc: card.querySelector('.card-image').getAttribute('src'),
                title: card.querySelector('.name-item').innerText,
                price: parseInt(card.querySelector('.item-price').innerText),
                counter: parseInt(card.querySelector('[data-counter]').innerText),
            };
            const totalPrice = productInfo.price* productInfo.counter;
            const itemInCart = cartWrapper.querySelector(`.card[data-id="${productInfo.id}"]`);
            if(itemInCart){
                const counterEL = itemInCart.querySelector('[data-counter]');
                priceEl = itemInCart.querySelector('.item-price');
                const counterElement = parseInt(counterEL.innerText)+ productInfo.counter;
                counterEL.innerHTML = counterElement;
                itemInCart.dataset.total = counterElement * productInfo.price;
                priceEl.innerText = `${counterElement * productInfo.price}грн.`
            }
            else{
            const cartItemHTML = `<div class = "card" data-id= "${productInfo.id}" data-total="${totalPrice}">
                <img src= "${productInfo.imgSrc}">
                <h3 class =  "name-item">${productInfo.title}</h3>
                <div class="item-price">${totalPrice}грн.</div>
                <div class ="items_current" data-counter>${productInfo.counter}</div>
                <img src ="images/cancle.png" class = "cancle-img" data-cancle>
         </div>`;
           cartWrapper.insertAdjacentHTML('beforeend',cartItemHTML);
            }
           calcCartPrice1();
           toggleCartStatus();
           calculateNumber();
            
        }
    });

  const iconCart = document.querySelector('.cart-icon');
  const btnClose = document.querySelector('.close');
  const body = document.body;

    iconCart.addEventListener('click',()=>{
        body.classList.toggle('showCart');
    });

    btnClose.addEventListener('click',()=>{
        body.classList.remove('showCart');
    });

    const iconUser = document.querySelector('.img-user');
    const btnCloseUser = document.querySelector('.close');

    iconUser.addEventListener('click',()=>{
        body.classList.toggle('showUser');
    });

    btnCloseUser.addEventListener('click',()=>{
        body.classList.remove('showUser');
    });

    function calcCartPrice1(){
    const priceElements = cartWrapper.querySelectorAll('.card');
    const totalPriceEl = document.querySelector('.total-price');
    let priceTotal=0;
    priceElements.forEach(function(item){
        priceTotal+=parseInt(item.dataset.total);
    });
    totalPriceEl.textContent = priceTotal;
}

function toggleCartStatus(){
    const cartEmptyBadge = document.querySelector('[data-cart-empty]');
     const cartItems = cartWrapper.querySelectorAll('.card');
    if(cartItems.length>0){
        cartEmptyBadge.classList.add('none')
    }
    else{
        cartEmptyBadge.classList.remove('none');
    }
}

function calculateNumber(){
    const cartItems = cartWrapper.querySelectorAll('.card');
    const numberCart = document.querySelector('.number-cart');
    numberCart.textContent = cartItems.length;
}