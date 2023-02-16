import { menuArray } from "./data.js";
let basket = [];

//global click event listener 

document.addEventListener('click', function(e){
    if (e.target.id && e.target.id == 0 || e.target.id == 1 || e.target.id == 2){
        addItem(e.target.id)
    }
    else if(e.target.dataset.delete){
        removeItem(e.target.dataset.delete)
    }else if(e.target.id == "payBtn"){
        showModal("pay")
    }else if(e.target.id == "rateBtn"){
      rateAndReset()

  }
})



// add item to basket array 

let addItem = (id) => {
    basket.push(menuArray[id])
    render();

}


// remove item from basket 

let removeItem = (RemoveId) => {
    const indexToRemove = basket.findIndex(obj => obj.id == RemoveId);
    basket.splice(indexToRemove,1);   
    render();
}

//show payment modal 

let showModal = (modalId) => {
  document.getElementById(modalId).classList.remove("hidden")
}


// get rate us modal after payment

document.getElementById("form").addEventListener("submit", (evt) =>{
  evt.preventDefault();
  showModal("rate");
} )


// reset function + thanks feed after rating 

let rateAndReset = () => {
  document.getElementById("menu").innerHTML = gethtmlFeed()
  document.getElementById("menu").innerHTML += getThanksFeed()
  basket = [];
  document.getElementById("pay").classList.add("hidden")
  document.getElementById("rate").classList.add("hidden")
}



// generate html feed for menu items

let gethtmlFeed = () => {
  let htmlFeed = ''
  
  for (let product of menuArray){
    htmlFeed += `<div
    class="w-10/12 mx-auto flex items-center py-10 border-b border-slate-400-b"
  >
    <span class="text-6xl w-2/12">${product.emoji}</span>
    <div class="flex w-10/12 justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold">${product.name}</h1>
        <p>${product.ingredients}</p>
        <p class="font-bold">£${product.price}</p>
      </div>
      <button
        id ="${product.id}"
        class="border border-slate-400 rounded-full px-5 py-3 text-2xl"
      >
        +
      </button>
    </div>
  </div>`
  
  }
  return htmlFeed
}



// genereate html feed for items in basket 

let getBasketFeed = () => {
  let basketFeed = ''
  if(basket.length > 0){
  basketFeed = '<h1 class="text-center mt-10 text-3xl">Your order</h1>'

  for (let basketItem of basket) {
    basketFeed += `<div class="w-10/12 mx-auto flex items-center gap-10 pb-2">
    <h1 class="text-2xl font-bold">${basketItem.name}</h1>
    <button class="text-sm  text-red-600" data-delete="${basketItem.id}">X</button>
    <p class="font-bold ml-auto text-lg">£${basketItem.price}</p>
  </div>`
  }
}
return basketFeed
}






// generate total html feed and calculate discounts

let getTotalFeed = () =>{

  //set variables

  let totalFeed = '';
  let discountInfoFeed = ''
  let totalPrice = 0
  let finalPrice = 0
  let isMealDeal = false;
  let foodOrdered = false;
  let drinkOrdered = false; 

  //count total and check do we have food and drink in basket 

  for (let basketItem of basket){
    totalPrice += basketItem.price ;
    if(basketItem.id == 0 || basketItem.id == 1){
      foodOrdered = true
    }else if (basketItem.id == 2){
      drinkOrdered = true
    }
  }
  // if food and drink are ordered make isMeal deal true

    if (foodOrdered == true && drinkOrdered == true){
      isMealDeal = !isMealDeal;
    }
    
  // calculate final price adding 10% discount when meal deal 

    if ( isMealDeal == false){
      finalPrice = totalPrice
    }else if ( isMealDeal == true){
      finalPrice = Math.floor(totalPrice * 0.9 *100) / 100
      discountInfoFeed = '<p class="text-sm  text-white bg-red-600 rounded-xl px-2 py-1 mr-4">10% off</p>'
    }

// generate html feed for total

  if(basket.length > 0){

      for (let basketItem of basket){
        totalFeed = `<div class="w-10/12 mx-auto flex items-center py-4 mt-10 border-t-2">
        <h1 class="text-2xl font-bold mr-auto">Total :</h1>
        ${discountInfoFeed}
        <p class="font-bold text-2xl">£${finalPrice}</p>
      </div><div class="flex justify-center">
      <button id="payBtn" class="bg-green-500 text-white w-10/12 h-10 text-center my-10">
        Complete Order
      </button>
    </div>`
      }

}
return totalFeed;
}


//get Thanks feed after rating

let getThanksFeed = () => {
  let name = document.getElementById("name").value
  let thanksFeed = `<h1
  class="text-center bg-green-200 text-green-900 rounded-sm mt-10 text-3xl px-6 py-5 rounded-md"
>
  Thanks ${name} , your order is on the way !
</h1>`
  return thanksFeed
}


// stars rating 

let allStars = document.querySelectorAll("#star")
console.log(allStars)





let render = () => {
    document.getElementById("menu").innerHTML = gethtmlFeed()
    document.getElementById("menu").innerHTML += getBasketFeed()
    document.getElementById("menu").innerHTML += getTotalFeed()
    
}

render() 
