
console.log('drawing js linked')

let body = document.querySelector("body")
let main = document.querySelector("main")


body.addEventListener("mousemove", (event)=> {
    let box = document.querySelector(".green-box")
    box.style.top = `${event.y}px`
    box.style.left = `${event.x}px`
})

// add an event listener to click
body.addEventListener("click", (event)=> {
  console.log('click!')

  let newBox = `<div class="blue-box"
    style="top: ${event.y}px; left: ${event.x}px;"
  ></div>`

  main.innerHTML +=  newBox
})
