// this is our javascript file.

let budgetForm = document.querySelector("#budget-form")
// focus to the first element
budgetForm.elements["budget-title"].focus()

// create an event listener on the form.
budgetForm.addEventListener("submit", (event)=> {
  // prevent the form from being submitted.
  event.preventDefault()

  let form = event.target // that this is the same as budgetform
  // get the form element values for title, description and amount
  let title = form.elements["budget-title"]
  let description = form.elements["budget-description"]
  let amount = form.elements["amount"]

  // get the form values.
  // add the item
  addLineItem(title.value, amount.value, description.value)
  // update current budget total
  updateTotal(amount.value)
  // reset the values
  title.value = ""
  description.value = ""
  amount.value = ""
  // focus back at the title
  title.focus()
})

// add a budget item create function
/*
<li class="list-group-item list-group-item-action" aria-current="true">
  TITLE HERE (AMOUNT HERE) - DESCRIPTION HERE
</li>
*/
let budgetList = document.querySelector(".current-budget")
const addLineItem = (title, amount, description) => {
  budgetList.innerHTML += `<li class="list-group-item list-group-item-action" aria-current="true">
    the title is: ${title} <br/>
    the budget is: (${parseInt(amount).toFixed(2)}) <br/>
    the description is: ${description}
  </li>`
}

// add a updateTotal function
const updateTotal = (amount) => {
  // get the amount from the page through the element.
  let budgetTotal = document.querySelector("#budget-total")
  // set the value of that element to the parsed number plus the amount.
  let sum = parseFloat(budgetTotal.innerText) + parseFloat(amount)
  budgetTotal.innerText = sum.toFixed(2)
}

// add active class to list item on mouseover
budgetList.addEventListener("mouseover", (event)=> {
  console.log(event.target) // the specific list item I have.
  let listElement = event.target
  listElement.classList.add("active")
})

// remove active class from list item on mouseout.
budgetList.addEventListener("mouseout", (event)=> {
  console.log(event.target) // the specific list item I have.
  let listElement = event.target
  listElement.classList.remove("active")
})
