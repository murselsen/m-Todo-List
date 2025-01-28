const application = {
	elements: {
		taskList: document.querySelector('#task-list'),
		taskForm: document.querySelector('#todo-form'),
		taskCreatedCount: document.querySelector('#task-created-count'),
		taskCompletedCount: document.querySelector('#task-completed-count'),
	},
	data: [],

	init() {
		const taskList = localStorage.getItem('tasks');
		if (taskList !== null) {
			this.data = JSON.parse(taskList);
		} else {
			this.data = [];
		}
		this.render();
	},
	// Random number generator simple method
	random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	addTask(text) {
		this.data.push({
			id: this.random(10000000, 999999999),
			text: text.toLowerCase(),
			done: false,
		});
		localStorage.setItem('tasks', JSON.stringify(this.data));
		this.render();
	},
	removeTask(taskId) {
		taskId = Number(taskId);
		this.data = this.data.filter(task => task.id !== taskId);
		localStorage.setItem('tasks', JSON.stringify(this.data));
		this.render();
	},
	doneTask(taskId) {
		taskId = Number(taskId);
		this.data = this.data.map(task =>
			task.id === taskId ? { ...task, done: !task.done } : task,
		);
		localStorage.setItem('tasks', JSON.stringify(this.data));
		this.render();
	},
	render() {
		if (this.data.length !== 0) {
			this.elements.taskCreatedCount.innerText = this.data.length.toString();
			taskDoneCount = this.data.filter(task => task.done).length;
			this.elements.taskCompletedCount.innerText =
				this.data.length === taskDoneCount
					? this.data.length.toString()
					: taskDoneCount.toString() + ' de ' + this.data.length;

			this.elements.taskList.innerHTML = ' ';

			this.data.forEach(task => {
				const _taskItem = document.createElement('li');
				_taskItem.id = `${task.id}`;
				_taskItem.className = task.done ? 'task-item done' : 'task-item';
				_taskItem.innerHTML = `
                <span class="task-checkbox">${task.done ? '✓' : ''}</span>
                <p class="task-text">${task.text}</p>
                <button type="button" class="task-delete-btn">
                    <i class="fa fa-trash"></i>
                </button>
            `;
				this.elements.taskList.appendChild(_taskItem);
			});

			document.querySelectorAll('.task-checkbox').forEach(taskCheckbox => {
				taskCheckbox.addEventListener('click', event => {
					const taskId = event.target.parentNode.id;
					application.doneTask(taskId);
				});
			});

			document.querySelectorAll('.task-delete-btn').forEach(taskDeleteBtn => {
				taskDeleteBtn.addEventListener('click', event => {
					const taskItemDeleteId = event.target.parentNode.parentNode.id;

					application.removeTask(taskItemDeleteId);
				});
			});
		} else {
			this.elements.taskCreatedCount.innerText = '0';
			this.elements.taskCompletedCount.innerText = '0';
			this.elements.taskList.innerHTML = ' ';
		}
	},
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
