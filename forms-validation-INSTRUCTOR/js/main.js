// we're going to use bootstrap validation
// https://getbootstrap.com/docs/5.0/forms/validation/
/*
  essentially what we're going to do here.
  - check if each form element's value is valid.
  - essentially we're going to pass the values to validator functions
      - these functions are going to return true or false datatypes
      true if valid, false 
  - if it's invalid we're going to add the class "is-invalid"
      - this is going to show the divs with the "invalid-feedback"
        which has the 
  - also we're going to return early from the event handler if it's not valid
      - this is so we don't create the budget items.

*/

// intercept the form.
let budgetForm = document.querySelector("#budget-form")
let budgetList = document.querySelector(".current-budget")

// focus to the first element
budgetForm.elements["budget-title"].focus()

budgetForm.addEventListener("submit", (event)=> {
    event.preventDefault()

    // get the elements/values from the page.
    let title = event.target.elements["budget-title"]
    let description = event.target.elements["budget-description"]
    let amount = event.target.elements["amount"]

    // before we add this budget line.
    // validate all of the inputs.
    let isValidForm = true

    // before
    // if (title.value === ""){
    //     // is invalid
    //     title.classList.add("is-invalid")
    //     isValidForm = false
    // } else {
    //     // this is valid.
    //     title.classList.remove("is-invalid")
    // }
    // after
    isValidForm = validateInput(title, isValidForm)

    // before
    // if (description.value === "") {
    //     // is invalid
    //     description.classList.add("is-invalid")
    //     isValidForm = false
    // } else {
    //     //valid
    //     description.classList.remove("is-invalid")
    // }
    // after
    isValidForm = validateInput(description, isValidForm)

    // before
    // if (amount.value === ""){
    //     amount.classList.add("is-invalid")
    //     isValidForm = false
    // } else {
    //     amount.classList.remove("is-invalid")
    // }
    // after
    isValidForm = validateInput(amount, isValidForm)



    // I'm only going to execute the lines below if isValidFrom is true
    // exit this function if the form is invalid.
    if (!isValidForm) {
        return
    }

    // add the item
    addLineItem(title.value, amount.value, description.value)

    // update current budget total
    updateTotal(amount.value)


    //reset the values
    title.value = ""
    description.value =""
    amount.value = ""

    // focus back at the title
    title.focus()
})

const validateInput = (element, isValidForm) => {
    if (element.value === ""){
        element.classList.add("is-invalid")
        isValidForm = false
    } else {
        element.classList.remove("is-invalid")
    }
    return isValidForm
}


// add a budget item create function
const addLineItem = (title, amount, description) => {
    budgetList = document.querySelector(".current-budget")
    let newItem = `<li class="list-group-item list-group-item-action" aria-current="true">
        ${title} (${amount}$) - ${description}
    </li>`
    budgetList.innerHTML = budgetList.innerHTML + newItem
}

// add a updateTotal function
const updateTotal = (amount) => {
    let budgetTotalElement = document.querySelector("#budget-total")
    budgetTotalElement.innerHTML = parseInt(budgetTotalElement.innerText) + parseInt(amount) 
}

// hovering event listeners
budgetList.addEventListener("mouseover", (event)=> {
    event.target.classList.add("active")
})

budgetList.addEventListener("mouseout", (event)=> {
    event.target.classList.remove("active")
})
