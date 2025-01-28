const application = {
	elements: {
		taskList: document.querySelector('#task-list'),
		taskForm: document.querySelector('#todo-form'),
	},
	data: [],
	render() {
		console.log('Application Rendered');
		const taskList = localStorage.getItem('tasks');
		if (taskList !== '1') {
			this.data = JSON.parse(taskList);
		} else {
			this.data = [];
		}
	},
	init() {
		this.render();
		console.log(this);
	},
	// Random number generator simple method
	random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	addTask(text) {
		this.data.push({
			id: this.random(10000000, 999999999),
			text: text.toLocaleUpperCase(),
			done: false,
		});
		console.log(this.data);
		localStorage.setItem('tasks', JSON.stringify(this.data));
		this.render();
	},
	removeTask(taskId) {
		this.data = this.data.filter(task => task.id !== taskId);
		localStorage.setItem('tasks', JSON.stringify(this.data));
	},
	doneTask() {},
};

application.elements.taskForm.addEventListener('submit', event => {
	event.preventDefault();
	const _formData = new FormData(application.elements.taskForm);
	const _taskItemInputValue = _formData.get('todo-item-input');
	application.addTask(_taskItemInputValue);
	alert('Task Form submitted');
});

application.init();

// Task Item
// --------------------------------------------------------------------------
//  <li id="task-134895739231239" class="task-item">
//    <span class="task-checkbox"> </span>
//    <p class="task-text">
//      Integer urna interdum massa libero auctor neque turpis turpis semper. Duis
//      vel sed fames integer.
//    </p>
//    <button type="button" class="task-delete-btn">
//
//    </button>
//  </li>;

// random number generator
//
