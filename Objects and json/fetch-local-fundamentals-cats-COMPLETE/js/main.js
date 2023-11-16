/*
Fetch Fundamentals

This example requires you to send a local fetch request for a JSON
file, and to render the following HTML for each of the returned objects
in the array.
    
Sample HTML
    <div class="mt-3 card" >
        <img class="card-img-top" src="CAT PICTURE HERE" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">CAT NAME HERE </h5>
        <p class="card-text">CAT TEXT HERE</p>
        </div>
    </div>

Use the following list as a guide to complete the task:

- select any requried elements from the document
- create a getCats function that will fetch the local cats-with-jobs.json file
    - the function should accept a function parameter, that will be called 
      when the data has been resolved, and passed the array of fetched cats
      as a single argument
- create a renderCats function that will accept a single parameter, which
  should be an array of cat data
    - the function should iterate over the array (e.g. use .forEach()) and render
      each cat using the template HTML provided above
- call the getCats function, and pass in the renderCats function as an argument
    - when the page loads, you should now see the cats rendered on the page
*/

let catListElement = document.querySelector(".cat-display")

// promise syntax
const getCats = () => {
  // the local url/path
  const CATS_DATA_JSON_PATH = '/data/cats-with-jobs.json'
  // in the above note that I don't need to specify the domain.
  // why? because it's just going to use the current server.
  // the above line is interpreted as "http://localhost:5500/data/cats-with-jobs.json"

  // let's make the fetch request and see what's up.
  fetch(CATS_DATA_JSON_PATH, {
    method: "GET"
  }).then((response)=> {
    return response.json()
  }).then((catData)=> {
    console.log('catData')
    // cat data is an array
    console.log(catData)
    renderCats(catData)
  })

}

// async/await syntax
// const getCats = async () => {
//   const CATS_DATA_JSON_PATH = '/data/cats-with-jobs.json'
  
//   const response = await fetch(CATS_DATA_JSON_PATH, {method: "GET"})
//   const catData = await response.json()
//   renderCats(catData)
// }

// render cats function
const renderCats = (cats)=> {
  cats.map((cat)=> {
    catListElement.innerHTML += `<div class="mt-3 card" >
        <img class="card-img-top" src="${cat.picture}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${cat.name} </h5>
        <p class="card-text">${cat.text}</p>
        </div>
    </div>
    `
  })
}


getCats()

