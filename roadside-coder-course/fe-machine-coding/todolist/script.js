// Approach: https://docs.google.com/document/d/1UQs4B1IRmzqcX6VeqrhHEvo8Qbi-xHBNFv0aOtdgV20/edit?usp=sharing

document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.querySelector(".todo-form");
  const todoInput = document.querySelector(".todo-input");
  const todoSubmit = document.querySelector(".todo-submit");
  const todoList = document.querySelector(".todo-list");

  let editMode = false;
  let editItem = null;

  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();

    // Error handling
    if (todoText !== "") {
      if (editMode) {
        editItem.firstChild.innerText = todoText;
        // Edit made, so bring back the "Add Todo" version.
        todoSubmit.innerText = "Add Todo";
        editMode = false;
        editItem = null;
      } else {
        addTodo(todoText);
      }

      todoInput.value = "";
    } else {
      alert("Please enter a valid task.");
    }
  });

  // Event Delegation
  // Could've added separate event listeners to editButton and removeButton
  // for edit todo and delete todo respectively, but then we would get 2 event
  // listeners for each todo item that we add, whereas we just need 2 i.e. one for
  // edit and another for delete todo. So, instead, we just create a single event
  // listener to the parent of todoItem i.e. todoList and use if-else to check
  // whether event is for edit or delete.
  todoList.addEventListener("click", function (event) {
    const target = event.target;

    if (target.tagName === "BUTTON") {
      const todoItem = target.parentNode;
      if (target.innerText === "❌") {
        todoItem.remove();
      } else if (target.innerText === "✏️") {
        editMode = true;
        editItem = todoItem;
        todoSubmit.innerText = "Edit Todo";
        todoInput.value = todoItem.firstChild.innerText;
        todoInput.focus();
      }
    }
  });

  function addTodo(todoText) {
    const todoItem = document.createElement("li");
    const editButton = document.createElement("button");
    const removeButton = document.createElement("button");

    todoItem.innerHTML = `<span>${todoText}</span>`;
    editButton.innerText = "✏️";
    removeButton.innerText = "❌";

    todoItem.appendChild(editButton);
    todoItem.appendChild(removeButton);
    todoList.appendChild(todoItem);
  }
});
