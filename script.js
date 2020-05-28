const addTodo = document.getElementById('add-todo');
const todoInput = document.getElementById('new-todo-input');
const footer = document.getElementById('footer');
const submitTodo = document.getElementById('submit-todo');
const todos = document.getElementById('todos');

let todosData = JSON.parse(localStorage.getItem('todoSideTodos'));

function checkLocalStorage() {
	if ('todoSideTodos' in localStorage) {
		updateDOM(todosData);
	} else {
		dummyData = [
			'Welcome to TodoSide. 📝',
			'Click New Todo to add a new Todo. ➕',
			'Hover on a todo to show the delete button. 🚮',
			'Click on a button to mark it as completed. ✅',
		];
		updateDOM(dummyData);

		console.log('No Local Storage Item Available');
	}
}

checkLocalStorage();

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

addTodo.addEventListener('click', () => {
	todoInput.classList.add('show');
});

submitTodo.addEventListener('click', (e) => {
	const parent = e.target.parentElement;
	let todoItem = parent.children[0].value;

	const todo = `
  <li>
    ${todoItem}
    <i class="fas fa-trash-alt" id="delete"></i>
  </li>
  `;

	todosData ? todosData : (todosData = []);

	todosData.push(todoItem);

	localStorage.setItem('todoSideTodos', JSON.stringify(todosData));
	addtoDOM(todo);

	todoInput.style.transition = 'all 0.3s ease-in-out;';
	todoInput.classList.remove('show');

	parent.children[0].value = '';

	setTimeout(checkLocalStorage, 1000);
});

function addtoDOM(el) {
	todos.insertAdjacentHTML('beforeend', el);
}

todos.addEventListener('click', (e) => {
	if (e.target && e.target.matches('li')) {
		e.target.classList.toggle('completed');
	}

	if (e.target && e.target.matches('i')) {
		const el = e.target.parentElement;
		el.style.opacity = '0';
		setTimeout(function () {
			el.remove();
		}, 300);
	}
});
