let url = "https://636bdd8ead62451f9fbddf34.mockapi.io/product";
document.querySelector('#sort').addEventListener('change', sort);
let data = [];
let arrData = JSON.parse(localStorage.getItem('cart')) || [];

async function getdata(){
    try{
        let res = await fetch(url);
        let out = await res.json();
        data = out[0].products;
        displayTable(out[0].products);
    } catch(err){
        console.log(err);
    }
}

getdata();

function displayTable(arr){
    document.querySelector('.product-list').innerHTML = "";

    arr.forEach(function (ele, index){
        let div = document.createElement('div');
        
        let img = document.createElement('img');
        img.setAttribute('src', ele.img);

        let br = document.createElement('br');

        let name = document.createElement('h4');
        name.innerText = ele.name;
        name.setAttribute('cursor', "pointer")
        name.addEventListener('click', () => {
            localStorage.setItem('element', JSON.stringify(ele));
            window.location = './element.html';
        })

        let price = document.createElement('p');
        price.innerHTML = "<b>Price: </b>" + ele.price ;

        let rating = document.createElement("p");
        rating.innerHTML = "<b>Rating: </b>" + ele.rating;

        let store = document.createElement('p');
        store.innerText = ele.store ;

        let category = document.createElement('p');
        category.innerText = ele.category;

        let button = document.createElement('button');
        button.innerText = "Add to Cart";
        button.addEventListener('click', function (){
            ele['quantity'] = 1;
            arrData.push(ele);
            localStorage.setItem('cart', JSON.stringify(arrData));
        })

        div.append(img, br,  name, store, price, rating, button);
        document.querySelector('.product-list').append(div);
    })
}


function sort(){
    let sorted = document.querySelector('#sort').value;
    document.querySelector('.product-list').innerHTML = "";
    let newData = data.filter(function (ele, index){
        return ele.category == sorted
    })

    if(sorted == 'all')
        displayTable(data);
    else
    displayTable(newData);
}

function search(){
    let d = document.querySelector('.search > input').value;

    let newdata = data.filter(function (ele, index) {
        return ele.name.toLowerCase().includes(d.toLocaleLowerCase());
    })

    console.log(newdata)

    displayTable(newdata);
}

let rating_value = document.querySelectorAll(".filter-rating input[name='rating']");

rating_value.forEach((ele) => {
    ele.addEventListener('change', () => {
        let newDAta = data.filter(function (element, index){
            return element.rating > +ele.value
        })
        displayTable(newDAta)
    })
})