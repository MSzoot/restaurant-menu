import { menuArray } from "./data.js";



















let render = () => {

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

render()