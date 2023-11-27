/*
Read it, a simple reddit clone.

Add Item piece.
1. Select and add an event listener to the form.
    - get the values of title and url of the inputs.
2. create a function that will piece together the node
   using the dom api that will take the url and title as parameters.
3. Using the Dom create the dom elements in the function
    - create the card
    - create the card body
    - create the up button
    - create the score
    - create the down button
    - create the link
        - you'll use setAttribute here for the href
4. Patch together the pieces
    - append the card body as child to the card
    - append the up button, score, down button and linke to the card body
    - append the card to all the items so that you add it to the page.

Note: Things you can do!
Add validation to this application.

Ranking Piece
1. Select the All of the Items.
2. Add an Event listener on the readit-items list.
3. check if the event.target has the vote-up class or the vote-down class
4. Create the vote up and functions (they'll be similar)
    - get the element with the class card body (the parent of the button)
    using the parentNode (this is called traversing the tree)
    - get the score element by traversing the tree downward using the 
    children list (you have a list of children)
    - create a function (changeScore) to increment the "textContent" of the score element
    by either adding one or 
5. create a function "changeItemOrder" that will move the card element up or down.
    - pass in the card body element as a 
6. in the changeItemOrder
    - get the parent of the of card body element (the card itself)
    - get the card above it using the dom .previousElementSibling
    - get the card below it using the dom .nextElementSibling
7. swap the items by checking the score
    - create a function swapItemsIfNecessary that will take the card above and below.
    - get the score elements by traversing down the trees twice.
        - first to the the card body element
        - second to get the score element.
    - check if the value of the lower score element is larger than the second element.
    - we're going to use the insertAbove to swap the element places.
8. Add the animation to make it more obvious when the swap places.
    - create functions for moving up and down animation that will each take one paramenter: element
    - add the class up-fade for the up animation 
    - add the class down-fade for the up animation
    - After a second remove the classes using set timeout.
*/

// let's select the items
let allItems = document.querySelector(".readit-items")

// select the form
let readitForm = document.querySelector("#add-readit-item")

// add an event listener ofn the form submission
readitForm.addEventListener("submit", (event)=> {
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

    // we're going to add the item to page.
    addReaditItem({
        url: itemUrl.value,
        title: title.value
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
const addReaditItem = ({title, url}) => {
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
    scoreElement.textContent = "0"
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
