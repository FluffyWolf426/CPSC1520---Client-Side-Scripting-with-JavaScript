/*
    Todolist

    We're going to make a todolist that counts how many todos we've completed.
    We'll do this using objects in the todos array shown below.

    HTML FOR The todo

    <li class="list-group-item">
        <input class="form-check-input todo-status"
            data-todo-id="INDEX HERE"
            type="checkbox"
            value="todo-INDEX HERE"
            COMPLETE HERE>
        DESCRIPTION HERE
    </li>

    Order of things
    - display the todolist on the page.
    - i'm going to add a todo to the list.
    - we're going to count the number of complete.
        - use reduce to do this.
    - we're to render the completed count.

*/

let todoForm = document.querySelector("#add-todo-form")
let todoList = document.querySelector(".todo-list")

let todos = [
    {
        description: 'Todo 1',
        complete: false,
    },
    {
        description: 'Todo 2',
        complete: true,
    }
];

console.log(todos)

todoForm.addEventListener("submit", (event)=> {
    // prevent the default action
    event.preventDefault()
    // create a new object
    let form = event.target
    let todoDescription = form.elements["todo-description"]
    let newTodo = {
        description: todoDescription.value,
        complete: false
    }
    // add the todo to the page.
    addTodo(newTodo)

    // reset the form
    
})

// listen to changes in the todoLIst element.
todoList.addEventListener("change", (event)=> {
    // the element the fired the event.
    let todoCheckbox = event.target
    // get the index attribute that we created
    let todoIndex = todoCheckbox.getAttribute("data-todo-id")
    
    // update my array
    // the complete is the opposite of what it was.
    todos[todoIndex].complete = !todos[todoIndex].complete 

    // call calculate complete
    calculateCompleteCount()
})


const addTodo = (todoObject) => {
    // add it the array
    todos.push(todoObject)
    // refresh the todos.
    renderTodos()
}

const calculateCompleteCount = () => {
    let todoCount = document.querySelector("#todo-complete-count")
    let initialValue = 0
    // loop through the items until you reduce to one number
    // which is the numbe rof completed items.
    let numberOfComplete = todos.reduce((accumulator, todo) => {
        // if it's complete i'm going to add one 
        // to the accumulator
        if (todo.complete) {
            return accumulator + 1
        }
        // reduce you always need to return a value.
        return accumulator
    }, initialValue)

    // add it to the page here.
    todoCount.innerText = numberOfComplete
}


const renderTodos = () => {
    console.log("in render todos.")
    // set the innerHTML to nothing of the todo list.
    todoList.innerHTML = ''
    // calculate the number of complete
    calculateCompleteCount()

    // loop through my todos and display them on the page.
    todos.forEach((todo, index) => {
        // add the checked string or not.
        let checkedText = ''
        if (todo.complete) {
            checkedText = "checked"
        }
        todoList.innerHTML += `<li class="list-group-item">
            <input class="form-check-input todo-status"
                data-todo-id="${index}"
                type="checkbox"
                value="todo-${index}"
                ${checkedText}>
            ${todo.description}
        </li>`
    })
}

// call the function so it runs on load.
renderTodos()
