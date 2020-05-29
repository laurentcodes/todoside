const addTodo = document.getElementById('add-todo');
const todoInput = document.getElementById('new-todo-input');
const footer = document.getElementById('footer');
const submitTodo = document.getElementById('submit-todo');
const todos = document.getElementById('todos');
const close = document.getElementById('close');
const info = document.getElementById('info');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('closeModal');

let todosData = JSON.parse(localStorage.getItem('todoSideTodos'));

// Dummy data
dummyData = [
	{ todo: 'Welcome to TodoSide. 📝', completed: false, id: generateID() },
	{
		todo: 'Click New Todo to add a new Todo. ➕',
		completed: false,
		id: generateID(),
	},
	{
		todo: 'Hover on a todo to show the delete button. 🚮',
		completed: false,
		id: generateID(),
	},
	{
		todo: 'Click on an item to mark it as completed. ✅',
		completed: true,
		id: generateID(),
	},
];

// Check if there's data in the localstorage and display if there is
function checkLocalStorage() {
	if ('todoSideTodos' in localStorage) {
		if (todosData.length > 0) {
			// Update DOM with todo data
			updateDOM(todosData);
		} else {
			// Update DOM with dummy data
			updateDOM(dummyData);
		}
	} else {
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
      <li id="${el.id}" class="${el.completed ? 'completed' : ''}">
        ${el.todo}
        <i class="fas fa-trash-alt" id="delete"></i>
      </li>
		`;

		if (el.id === 'undefined') {
			el.id = generateID();
		}

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

	const todoSingle = new Todo(todoItem, false);

	const todo = `
  <li>
    ${todoSingle.todo}
    <i class="fas fa-trash-alt" id="delete"></i>
  </li>
  `;

	// Check if todosData array exists
	todosData ? todosData : (todosData = []);

	todosData.push(todoSingle);

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
	if ('todoSideTodos' in localStorage) {
		if (todosData.length > 0) {
			toggleCompleted(e, todosData);
		} else {
			toggleCompleted(e, dummyData);
		}
	} else {
		toggleCompleted(e, dummyData);
	}

	// If the delete button is clicked
	if (e.target && e.target.matches('i')) {
		const el = e.target.parentElement;

		// Check if element selected is in the array and delete if found
		for (let i = 0; i < todosData.length; i++) {
			if (todosData[i].id === el.id) {
				todosData.splice(i, 1);

				// Update local storage
				updateLocalStorage();
			}
		}

		// Remove todo from DOM
		setTimeout(function () {
			el.remove();
		}, 300);
	}
});

// Close input modal when close button is clicked
close.addEventListener('click', () => {
	todoInput.classList.remove('show');
});

// Close the input modal if anywhere else on the screen is clicked
document.addEventListener('mouseup', (e) => {
	if (!todoInput.contains(e.target)) {
		todoInput.classList.remove('show');
	}
});

checkLocalStorage();

function Todo(todo, completed = false, id = generateID()) {
	this.todo = todo;
	this.completed = completed;
	this.id = id;
}

// Generate ID
function generateID() {
	return 'ts-' + Math.random().toString(36).substr(2, 16);
}

function updateLocalStorage() {
	localStorage.removeItem('todoSideTodos');
	localStorage.setItem('todoSideTodos', JSON.stringify(todosData));
	setTimeout(checkLocalStorage, 1000);
}

function toggleCompleted(e, data) {
	if (data === dummyData) {
		if (e.target && e.target.matches('li')) {
			// Loop through storage
			for (i = 0; i < data.length; i++) {
				if (data[i].id === e.target.id) {
					let completed = data[i].completed;
					// console.log(e.target, completed);
					if (completed) {
						e.target.classList.toggle('completed');
						data[i].completed = false;
					} else {
						e.target.classList.toggle('completed');
						data[i].completed = true;
					}
				}
			}
		}
	} else if (data === todosData) {
		// If the list item is clicked
		if (e.target && e.target.matches('li')) {
			// Loop through storage
			for (i = 0; i < data.length; i++) {
				if (data[i].id === e.target.id) {
					let completed = data[i].completed;
					// console.log(e.target, completed);
					if (completed) {
						e.target.classList.toggle('completed');
						data[i].completed = false;

						updateLocalStorage();
					} else {
						e.target.classList.toggle('completed');
						data[i].completed = true;

						updateLocalStorage();
					}
				}
			}
		}
	}
}

// Open Modal
info.addEventListener('click', () => {
	modal.classList.add('show-modal');
});

// Close Modal
modalClose.addEventListener('click', () => {
	modal.classList.remove('show-modal');
});
