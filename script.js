const addTodo = document.getElementById('add-todo');
const todoInput = document.getElementById('new-todo-input');
const footer = document.getElementById('footer');
const submitTodo = document.getElementById('submit-todo');
const todos = document.getElementById('todos');
const checkbox = document.getElementById('completedCheck');
const close = document.getElementById('close');
const info = document.getElementById('info');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('closeModal');
const toggleSwitch = document.querySelector(
	'.theme-switch input[type="checkbox"]'
);

// Check if Current theme is saved in local storage
const currentTheme = localStorage.getItem('todoSideTheme')
	? localStorage.getItem('todoSideTheme')
	: null;

// If current theme is saved
if (currentTheme) {
	// Set the theme accordingly
	document.documentElement.setAttribute('data-theme', currentTheme);

	if (currentTheme === 'dark') {
		toggleSwitch.checked = true;
	}
}

// Switch theme
function switchTheme(e) {
	if (e.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('todoSideTheme', 'dark');
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('todoSideTheme', 'light');
	}
}

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
		todo:
			'On Desktop Hover on a todo to show the delete button. 🚮 but Mobile Devices show it by default',
		completed: false,
		id: generateID(),
	},
	{
		todo: 'Click on the check button to mark an item as completed. ✅',
		completed: true,
		id: generateID(),
	},
	{
		todo:
			'Enter Multiple Todos at onces by pressing the enter key after each Todo',
		completed: false,
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
		let checked;

		if (el.completed) {
			checked = true;
		} else {
			checked = false;
		}

		const todo = `
			<li id="${el.id}" class="${el.completed ? 'completed' : ''}">
			<label class='checkbox-label'>
				<input type='checkbox' id='completedCheck' ${checked ? 'checked' : ''}/>
				<span class='checkbox-custom'></span>
			</label>
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
	const todoItem = parent.children[2].value;

	if (todoItem) {
		let todoArray = [];
		todoArray = todoItem.split('\n');

		todoArray.forEach((el) => {
			const todoSingle = new Todo(el, false);

			const todo = `
				<li>
				<input type='checkbox' />
					${todoSingle.todo}
					<i class="fas fa-trash-alt" id="delete"></i>
				</li>
			`;

			// Check if todosData array exists
			todosData ? todosData : (todosData = []);

			todosData.push(todoSingle);

			localStorage.setItem('todoSideTodos', JSON.stringify(todosData));
			addtoDOM(todo);
		});

		todoInput.style.transition = 'all 0.3s ease-in-out;';
		todoInput.classList.remove('show');

		parent.children[2].value = '';

		// Call checkLocalStorage function after adding new Data
		setTimeout(checkLocalStorage, 1000);
	} else {
		const textarea = parent.children[2];
		textarea.classList.add('error');
		textarea.placeholder = 'Please enter a Todo!';
	}
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

// Toggle Switch
toggleSwitch.addEventListener('change', switchTheme, false);

// Toggle Completed Class
function toggleCompleted(e, data) {
	// console.log(e.target.parentElement);
	const todoCheck = e.target.parentElement.parentElement;
	if (data === dummyData) {
		if (e.target && e.target.matches('input')) {
			// Loop through storage
			for (i = 0; i < data.length; i++) {
				// console.log(todoCheck);
				if (data[i].id === todoCheck.id) {
					let completed = data[i].completed;
					// console.log(e.target, completed);
					if (completed) {
						todoCheck.classList.toggle('completed');
						data[i].completed = false;
					} else {
						todoCheck.classList.toggle('completed');
						data[i].completed = true;
					}
				}
			}
		}
	} else if (data === todosData) {
		// If the list item is clicked
		if (e.target && e.target.matches('input')) {
			// Loop through storage
			for (i = 0; i < data.length; i++) {
				if (data[i].id === todoCheck.id) {
					let completed = data[i].completed;
					// console.log(e.target, completed);
					if (completed) {
						todoCheck.classList.toggle('completed');
						data[i].completed = false;

						updateLocalStorage();
					} else {
						todoCheck.classList.toggle('completed');
						data[i].completed = true;

						updateLocalStorage();
					}
				}
			}
		}
	}
}

// Generate ID
function generateID() {
	return 'ts-' + Math.random().toString(36).substr(2, 16);
}

// Todo Object Constructor
function Todo(todo, completed = false, id = generateID()) {
	this.todo = todo;
	this.completed = completed;
	this.id = id;
}

// Update Local Storage
function updateLocalStorage() {
	localStorage.removeItem('todoSideTodos');
	localStorage.setItem('todoSideTodos', JSON.stringify(todosData));
	setTimeout(checkLocalStorage, 1000);
}

// Open Modal
info.addEventListener('click', () => {
	modal.classList.add('show-modal');
});

// Close Modal
modalClose.addEventListener('click', () => {
	modal.classList.remove('show-modal');
});

checkLocalStorage();
