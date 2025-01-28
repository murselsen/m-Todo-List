'use strict';

const application = {
  elements: {
    taskList: document.querySelector('#task-list'),
    taskForm: document.querySelector('#todo-form'),
  },
  init() {},
  addTask() {},
  removeTask() {},
  doneTask() {},
  render() {},
};

application.elements.taskForm.addEventListener('submit', event => {
  event.preventDefault();
  const _formData = new FormData(application.elements.taskForm);
  const _taskItemInputValue = _formData.get('todo-item-input');

  alert('Task Form submitted');
});

// Task Item
// --------------------------------------------------------------------------
//  <li id="task-134895739231239" class="task-item">
//    <span class="task-checkbox">✓</span>
//    <p class="task-text">
//      Integer urna interdum massa libero auctor neque turpis turpis semper. Duis
//      vel sed fames integer.
//    </p>
//    <button type="button" class="task-delete-btn">
//      
//    </button>
//  </li>;
