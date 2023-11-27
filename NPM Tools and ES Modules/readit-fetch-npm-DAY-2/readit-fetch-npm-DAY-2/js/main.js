/*
Read it, a simple reddit clone.

1. Setup npm, parcel and packages
    - install bootstrap and set it up.
    - install validator
    - install parcel and set up
    - change the index.html file to point to an index.js file where we
        - import bootstrap
        - import main.js
2. Validate the url using validator.js
3. Run the base server (in a separate folder) and ensure you understand how to interact with the api.
    NOTE: look at backend-json-server with the readit-db.json
4. Create api.js file to interact with our server.
    - talk about how to use promises when returning a promise.
    - create the different promises for
        - post
        - patch
    - talk about headers and how we need to specify "application/json" for
      the content type to make a header.
5. Use the api.js functions in the main.js 
    - in the create add a post with the api.
    - update the score in the "changescore" function
    - at the bottom of the file fetch all the posts

Note: talk about REST Clients
- Boomerang (https://boomerangapi.com/)
- Postman (https://www.postman.com/)

*/

// import bootstrap.
import 'bootstrap/dist/css/bootstrap.min.css'
// import our own css
import '../css/main.css'

// import our function
import { getReviews, postReview } from './api'

/*
Challenge:
- using this function render the posts.
*/


// let's select the items
let allItems = document.querySelector(".readit-items")

// select the form
let readitForm = document.querySelector("#add-readit-item")

// add an event listener of the form submission
readitForm.addEventListener("submit", async (event)=> {
    event.preventDefault()
    // here the event.target since it's a submit
    // is the same as the reddit form
    let form = event.target

    // I'm going to need to select the inputs to get 
    // the values.
    let title = form.elements["title"]
    let itemUrl = form.elements["item-url"]

    // let's take a look at those values.
    // console.log(`the title is ${title.value}`)
    // console.log(`the itemUrl is ${itemUrl.value}`)

    // we could do some sort of validation.
    if (title.value.trim() === "" || itemUrl.value.trim() === ""){
        // we could do some better handling here but that's fine.
        return
    }

    // let's post the review to the backend
    const reviewData = await postReview({
        url: itemUrl.value,
        title: title.value
    })


    // and then we're going to add the item to page.
    // with the data from the backend.
    addReaditItem({
        url: reviewData.url,
        title: reviewData.title,
        score: reviewData.score
    })


})
/*
If we we're defining our function like so:

const addReaditItem = (title, url) => { ... }

we'd have to call the function with title and url 
always in the same order, you'd call it like so.

addReaditItem("cats can code", "https://catlobby.com/cats-can-code")

Sometimes you don't necessarily want to keep the order. What you can
do here is use "object destructuring" in the parameter which is like so
Which you can see the {} below.

const addReaditItem = ({title, url}) => { ... }

In the function above it doesn't matter the order you pass it in
because you need to use the key. Our function would be called like so.

addReaditItem({
    title: "cats can code",
    url: "https://catlobby.com/cats-can-code"
})

you can also call it in the inverse order and it would do the same thing

addReaditItem({
    url: "https://catlobby.com/cats-can-code",
    title: "cats can code"
})
*/
const addReaditItem = ({title,score, url}) => {
    // let's create the card
    let card = document.createElement("div")
    card.classList.add("card", "mt-2")
    // let's create the card body
    let cardBody = document.createElement("div")
    cardBody.classList.add("card-body", "d-flex", "flex-row")
    // create the up button
    let upButton = document.createElement("button")
    upButton.classList.add("btn", "vote-up", "m-1", "btn-secondary")
    upButton.textContent = "up"
    // score element
    let scoreElement = document.createElement("p")
    scoreElement.classList.add("score", "h4", "m-2")
    scoreElement.textContent = score
    // create the down button
    let downButton = document.createElement("button")
    downButton.classList.add("btn", "vote-down", "m-1", "btn-secondary")
    downButton.textContent = "down"
    // let's create the link
    let newLink = document.createElement("a")
    newLink.classList.add("h4", "m-2")
    newLink.setAttribute("href", url) // using url param
    newLink.setAttribute("target", "_blank")
    newLink.textContent = title // using the title param

    // attach them altogether.
    card.append(cardBody)
    cardBody.append(upButton)
    cardBody.append(scoreElement)
    cardBody.append(downButton)
    cardBody.append(newLink)

    // we're going to add this to the page.
    allItems.append(card)
}

// let's implement the ranking piece.
allItems.addEventListener("click", (event)=> {
    // only listen do something when we vote up or down
    if (isVoteUpButton(event.target)) {
        console.log("You voted up.")
        vote({button: event.target, score: 1})
    }
    if (isVoteDownButton(event.target)) {
        console.log("You voted down.")
        vote({score: -1, button: event.target})
    }
})

const isVoteUpButton = (element) => {
    return element.classList.contains("vote-up")
}

const isVoteDownButton = (element) => {
    return element.classList.contains("vote-down")
}

// button is going to be either the up or down button.
// the score is going to +1 or -1
const vote = ({button, score}) => {
    // get the cardbody which is the parent of the button
    let cardBody = button.parentElement
    // get the second child (index 1) which is the score elemnt
    let scoreElement = cardBody.children[1]

    // let's change the score of the element
    changeScore(scoreElement, score)

    // let's swap them if necessary
    changeItemOrder(cardBody)
}

const changeScore = (scoreElement, value) => {
    // get the current score from the element
    let currentScore = parseInt(scoreElement.textContent)
    // adding to the value to the current score.
    scoreElement.textContent = currentScore + value
}

// create a function that will check if the element has a greater
// score than it's siblings and we're going to swap them if necessary

const changeItemOrder = (cardBody) => {
    // get the card 
    let card = cardBody.parentElement
    console.log('card')
    console.log(card)

    // I'm going to get the siblings of this 
    let upperCard = card.previousElementSibling
    console.log('upperCard')
    console.log(upperCard)
    let lowerCard = card.nextElementSibling
    console.log('lowerCard')
    console.log(lowerCard)

    if (upperCard) {
        // swap if necessary
        swapItemsIfNecessary(upperCard, card)
    }

    if (lowerCard) {
        // swap if necessary
        swapItemsIfNecessary(card, lowerCard)
    }
}

const swapItemsIfNecessary = (topCardElement, bottomCardElement) => {
    // traverse the cards, to get the score.
    let upperScore = topCardElement.children[0].children[1]
    let bottomScore = bottomCardElement.children[0].children[1]
    // the above is first selecting the card body, then the score element.

    // I'm going to compare both scores
    // if the bottom cards' score is great the then top card
    if (parseInt(bottomScore.textContent) > parseInt(upperScore.textContent)){
        // then we swap the card positions
        allItems.insertBefore(
            bottomCardElement,
            topCardElement
        )
        // add the animations
        upAnimation(bottomCardElement)
        downAnimation(topCardElement)
    }
}

const ANIMATION_LENGTH = 1000 // 1000ms is 1s.

// the animations below are using css classes from main.css

const upAnimation = (element) => {
    element.classList.add("up-fade")

    setTimeout(()=> {
        element.classList.remove("up-fade")
    }, ANIMATION_LENGTH)
}

const downAnimation = (element) => {
    element.classList.add("down-fade")

    setTimeout(()=> {
        element.classList.remove("down-fade")
    }, ANIMATION_LENGTH)
}


// create a function that renders the posts from the backend
getReviews().then((reviewsData)=> {
    console.log("Reviews from the backend")
    console.log(reviewsData)
    // im looping over the reviews fetched from the
    // backend and using my existing functions
    reviewsData.map((review)=> {
        addReaditItem({
            title: review.title,
            url: review.url,
            score: review.score
        })
    })
})
