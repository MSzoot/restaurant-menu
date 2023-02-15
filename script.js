import { menuArray } from "./data.js";
let basket = [];

document.addEventListener('click', function(e){
    if (e.target.id && e.target.id == 0 || e.target.id == 1 || e.target.id == 2){
        addItem(e.target.id)
    }
    else if(e.target.dataset.delete){
        removeItem(e.target.dataset.delete)
    }
})


let addItem = (id) => {
    basket.push(menuArray[id])
    render();

}


let removeItem = (RemoveId) => {
    const indexToRemove = basket.findIndex(obj => obj.id == RemoveId);
    basket.splice(indexToRemove,1);   
    render();
}


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


let getTotalFeed = () =>{
  let totalFeed = '';
  let totalPrice = 0
  let isMealDeal = false;
  let foodOrdered = false;
  let drinkOrdered = false; 


  if(basket.length > 0){
  
// check for meal deal

  for ( let basketItem of basket){
    if(basketItem.id == 0 || basketItem.id == 1){
      foodOrdered = true
    }else if (basketItem.id == 2){
      drinkOrdered = true
    }    
  }

  if (foodOrdered == true && drinkOrdered == true){
    isMealDeal = !isMealDeal;
  }
 

// add html + calculate the price total + discout if meal deal

  for (let basketItem of basket){
    totalPrice += basketItem.price ; 

    if ( isMealDeal == false){
    totalFeed = `<div class="w-10/12 mx-auto flex items-center py-4 mt-10 border-t-2">
    <h1 class="text-2xl font-bold">Total :</h1>
    <p class="font-bold ml-auto text-2xl">£${totalPrice}</p>
  </div>`}else {
    
    let totalPriceWithDiscount = Math.floor(totalPrice * 0.9 *100) / 100
    totalFeed = `<div class="w-10/12 mx-auto flex items-center py-4 mt-10 border-t-2">
    <h1 class="text-2xl font-bold">Total :</h1>
    <p class="font-bold ml-auto text-2xl">£${totalPriceWithDiscount}</p>
  </div>`
  } 
  }
}
return totalFeed;
}

let render = () => {
    document.getElementById("menu").innerHTML = gethtmlFeed()
    document.getElementById("menu").innerHTML += getBasketFeed()
    document.getElementById("menu").innerHTML += getTotalFeed()
    
}

render() 
