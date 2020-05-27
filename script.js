const addTodo = document.getElementById('add-todo');
const todoInput = document.getElementById('new-todo-input');
const footer = document.getElementById('footer');
const submitTodo = document.getElementById('submit-todo');

addTodo.addEventListener('click', () => {
	footer.style.display = 'none';
	todoInput.style.visibility = 'visible';
	todoInput.style.opacity = 1;
});

submitTodo.addEventListener('click', (e) => {
	const parent = e.target.parentElement;
	const todoItem = parent.children[0].value;

	todoInput.style.visibility = 'hidden';
	todoInput.style.opacity = 0;
	footer.style.display = 'flex';
});
