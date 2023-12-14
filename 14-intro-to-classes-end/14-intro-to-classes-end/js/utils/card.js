import { createCardElement } from "../dom/card"

class Card {
  constructor({title, description,
               learnListElement, understoodListElement}) {
    // let's just add the title and description to the 
    // object that will be created.
    this.title = title
    this.description = description
    this.element = createCardElement({
      title: title,
      description: description
    })
    this.learnListElement = learnListElement
    this.understoodListElement = understoodListElement
    // when I create the card, I want to render it.
    this.render()
    // as well I want to add the event listeners on it.
    this.addEventListeners()
  }

  // render the card on the page.
  render() {
    this.learnListElement.append(this.element)
  }

  // remove function
  remove() {
    this.element.remove()
  }

  // move to top of list button
  moveToTop() {
    this.learnListElement.insertBefore(
      this.element,
      this.learnListElement.firstElementChild
    )
  }

  // move to understood list
  moveToUnderstoodList() {
    this.understoodListElement.append(this.element)
    // remove the buttons
    let cardBody = this.element.children[0]
    cardBody.children[4].remove()
    cardBody.children[3].remove()
    cardBody.children[2].remove()
  }

  // add the actions on the actual element itself.
  addEventListeners() {
    let cardBody = this.element.children[0]
    
    // remove
    let removeButton = cardBody.children[2]
    removeButton.addEventListener("click", ()=> {
      this.remove()
    })

    // move to top
    let topPriorityButton = cardBody.children[3]
    topPriorityButton.addEventListener("click", ()=> {
      this.moveToTop()
    })

    // move lists
    let moveToUnderstood = cardBody.children[4]
    moveToUnderstood.addEventListener("click", () => {
      this.moveToUnderstoodList()
    })
  }
}

export { Card }