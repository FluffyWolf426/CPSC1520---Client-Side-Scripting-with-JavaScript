/*
Fetch Fundamentals
In this example we're going to generate random pictures of dogs.
1. Select the random dog button and add a click event
    listener on it.
2. Create the function get random dog with the fetch api.
    - documentation for the dog api here https://dog.ceo/dog-api/
    - explore and display what the promise returns.
3. Create a function that will select the image 
4. Call the get random dog function in your event listener,
    and call it when the page loads.
*/

const RANDOM_DOG_URL = "https://dageg.ceo/api/breeds/image/random"

let button = document.querySelector('#new-dog-button')

button.addEventListener("click", async ()=> {
    // going to get the dog information from the api.
    await getRandomDogAndSetPicture()
    console.log("fetched!")
})

// async/await syntax
// const getRandomDogAndSetPicture = async () => { // add async in front the ()
//     // in the line below you're "awaiting" fetch to complete its' request.
//     try {
//         const response = await fetch(RANDOM_DOG_URL, {method: "GET"}) 
//         // in the line below you're awaiting the json to be parsed.
//         const dogData = await response.json()    
//         // get the dog image.
//         let dogImage = document.querySelector(".dog-image")
//         // set the attribute of src to the dogData.message
//         dogImage.setAttribute("src", dogData.message)
//     } catch (error) {
//         console.log('We got an error')
//         console.log(error)
//     }
// }
// when you use the above syntax you might have to go async all the way up.


// the promise syntax.
const getRandomDogAndSetPicture = () => {
    // make a fetch request to the RANDOM_DOG url.
    fetch(RANDOM_DOG_URL, {
        method: "GET"
    }).then((response)=> {
        // take a look at the response.
        console.log('RESPONSE')
        console.log(response)
        return response.json() // doing JSON.parse under the hood.
    }).then((dogData)=> { // do something with our new object
        console.log("The JS object (parsed from the json)")
        console.log(dogData)
        // change the image on the page.
        let dogImage = document.querySelector(".dog-image")
        // set the attribute of src to the dogData.message
        dogImage.setAttribute("src", dogData.message)
        // equivalent to 
        // dogImage.src = dogData.message
    }).catch((error)=> {
        console.log("we got an error in the promise")
        console.log(error)
    })
}
