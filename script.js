const addTodo = document.getElementById('add-todo');
const todoInput = document.getElementById('new-todo-input');
const footer = document.getElementById('footer');
const submitTodo = document.getElementById('submit-todo');
const todos = document.getElementById('todos');

let todosData = JSON.parse(localStorage.getItem('todoSideTodos'));

// Check if there's data in the localstorage and display if there is
function checkLocalStorage() {
	if ('todoSideTodos' in localStorage) {
		updateDOM(todosData);
	} else {
		// If no data, display dummy data/welcome page
		dummyData = [
			'Welcome to TodoSide. 📝',
			'Click New Todo to add a new Todo. ➕',
			'Hover on a todo to show the delete button. 🚮',
			'Click on an item to mark it as completed. ✅',
		];

		// Update DOM with dummy data
		updateDOM(dummyData);

		console.log('No Local Storage Item Available');
	}
}

// Update DOM with passed in data
function updateDOM(data) {
	todos.innerHTML = '';
	data.forEach((el) => {
		const todo = `
      <li>
        ${el}
        <i class="fas fa-trash-alt" id="delete"></i>
      </li>
    `;

		addtoDOM(todo);
	});
}

// Show Input field to add todo
addTodo.addEventListener('click', () => {
	todoInput.classList.add('show');
});

// Save todo to storage and display in DOM
submitTodo.addEventListener('click', (e) => {
	const parent = e.target.parentElement;
	let todoItem = parent.children[2].value;

	const todo = `
  <li>
    ${todoItem}
    <i class="fas fa-trash-alt" id="delete"></i>
  </li>
  `;

	// Check if todosData array exists
	todosData ? todosData : (todosData = []);

	todosData.push(todoItem);

	localStorage.setItem('todoSideTodos', JSON.stringify(todosData));
	addtoDOM(todo);

	todoInput.style.transition = 'all 0.3s ease-in-out;';
	todoInput.classList.remove('show');

	parent.children[2].value = '';

	// Call checkLocalStorage function after adding new Data
	setTimeout(checkLocalStorage, 1000);
});

// Adding new Element to DOm
function addtoDOM(el) {
	todos.insertAdjacentHTML('beforeend', el);
}

// Toggle completed and delete todo
todos.addEventListener('click', (e) => {
	// If the list item is clicked
	if (e.target && e.target.matches('li')) {
		e.target.classList.toggle('completed');
	}

	// If the delete button is clicked
	if (e.target && e.target.matches('i')) {
		const el = e.target.parentElement;
		// el.style.opacity = '0';

		// Check if element selected is in the array and delete if found
		for (let i = 0; i < todosData.length; i++) {
			if (todosData[i] === el.innerText) {
				todosData.splice(i, 1);

				console.log(todosData);

				// Update local storage
				localStorage.removeItem('todoSideTodos');
				localStorage.setItem('todoSideTodos', JSON.stringify(todosData));
			}
		}

		// Remove todo from DOM
		setTimeout(function () {
			el.remove();
		}, 300);
	}
});

// Close the input modal if anywhere else on the screen is clicked
document.addEventListener('mouseup', (e) => {
	if (!todoInput.contains(e.target)) {
		todoInput.classList.remove('show');
	}
});

checkLocalStorage();
console.log(todosData);
