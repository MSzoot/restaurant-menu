import { menuArray } from "./data.js";

document.addEventListener('click', function(e){
    if (e.target.id){
        addItem(e.target.id)
    }
    else if(e.target.id == `remove-${id}`){
        console.log(e.target.id)
    }
})

let basket = []

let addItem = (id) => {
    basket.push(menuArray[id])
    renderOrder();

}













let rendermenu = () => {

    for (let product of menuArray){
        document.getElementById("menu").innerHTML += 
    `<div
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
        id = ${product.id}
        class="border border-slate-400 rounded-full px-5 py-3 text-2xl"
      >
        +
      </button>
    </div>
  </div>`
    } 
}

rendermenu()


let renderOrder = () =>{
        document.getElementById("basket").innerHTML += `
        <div class="w-10/12 mx-auto flex items-center gap-10 pb-2">
        <h1 class="text-2xl font-bold">${basket[basket.length-1].name}</h1>
        <button id="remove-${basket[basket.length-1].id.value}"class="text-sm text-red-600">X</button>
        <p class="font-bold ml-auto text-lg">£${basket[basket.length-1].price}</p>
      </div>`
    }
