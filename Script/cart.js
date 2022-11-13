let cartData = JSON.parse(localStorage.getItem('cart')) || [];

function displayTable(arr){
    document.querySelector('section > h1').innerText = cartData.length + " Items In Cart";
    document.querySelector('.product').innerHTML = "";

    cartData.forEach(function (ele, index){

        let div = document.createElement('div');
        let div2 = document.createElement('div');
        let div3 = document.createElement('div');
        
        let img = document.createElement('img');
        img.setAttribute('src', ele.img);

        let name = document.createElement('h4');
        name.innerText = ele.name;

        let price = document.createElement('p');
        price.innerHTML = "<b>Price: </b>" + ele.price ;

        let store = document.createElement('p');
        store.innerText = ele.store ;

        let inc = document.createElement('button');
        inc.innerText = "+";
        inc.addEventListener('click',() => {
            ele['quantity'] += 1;
            localStorage.setItem('cart', JSON.stringify(cartData));
            document.querySelector('section .cart .product > div > div > div p').innerText = ele.quantity;displayDetail();
            displayDetail();
            displayTable(cartData);
        })

        let dec = document.createElement('button');
        dec.innerText = "-";
        dec.addEventListener('click', () => {
            ele['quantity'] -= 1;
            localStorage.setItem('cart', JSON.stringify(cartData));
            document.querySelector('section .cart .product > div > div > div p').innerText = ele.quantity;
            displayDetail();
            displayTable(cartData);
        })

        
        let remove = document.createElement('button');
        remove.innerText = "Delete";
        remove.addEventListener('click', () => {
            cartData.splice(ele, 1);
            localStorage.setItem('cart', JSON.stringify(cartData));
            displayTable(cartData);
        })

        let quantity = document.createElement('p');
        quantity.innerText = ele.quantity;

        div3.append(inc, quantity, dec);

        div2.append( name, store, div3, price, remove);
        div.append(img, div2);
        document.querySelector('.product').append(div);
    })
}

function displayDetail(){
    document.querySelector('.details').innerHTML = "";

    let total = 0;
    for(let i = 0; i < cartData.length; i++){
        total += cartData[i].quantity * cartData[i].price;
    }

    total = Number.parseFloat(total).toFixed(2)

    let button = document.createElement('button');
    button.innerText = "Proceed to Buy";
    button.addEventListener('click', () => {
        console.log('Redirct ot checkout page...')

        nextPage(total);
    })

    let hr = document.createElement('hr');

    let h3 = document.createElement('h3');
    h3.innerText = "Order Summary";

    let value = document.createElement('p');
    value.innerText = "Cart Charge: ₹" + total;
    
    let grand_total = document.createElement('p');

    let charge = document.createElement('p');
    if(total < 499){
        total = +total + 75;
        charge.innerText = "Delivery Charge: " + "₹ 75";
        grand_total.innerText = "Grand Total: ₹" + total;
    } else {
        charge.innerText = "Delivery Charge: " + "Free";
        grand_total.innerText = "Grand Total: ₹" + total;
    }

    document.querySelector('.details').append(button, hr, h3, value, charge, grand_total);
}

if(cartData.length == 0){
    null;
} else{
    displayTable(cartData);
}

displayDetail();


function nextPage(total){
    localStorage.setItem('total', total);
    window.location = './checkout.html';
}