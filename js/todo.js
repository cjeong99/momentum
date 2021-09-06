const todoList = document.querySelector("#todo-list");
const todoInput = document.querySelector("#todo-form input");
const todoForm = document.querySelector("#todo-form");
const TODOS_KEY = "todos";
let todos = [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function handleDeleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  //update localStorage
  const id = li.id;
  todos = todos.filter(todo => todo.id !== parseInt(li.id));
  saveTodos();
}

function paintTodo(todoObj) {
  const span = document.createElement("span");
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.innerHTML = " 🚫";
  button.addEventListener("click", handleDeleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  li.id = todoObj["id"];
  span.innerHTML = todoObj["text"];
  todoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now()
  };

  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
  //console.log(todoInput.value);
}

todoForm.addEventListener("submit", handleToDoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  parsedTodos.forEach(item => paintTodo(item));
  //paintTodo(parsedTodos);
}
