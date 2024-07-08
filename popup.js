document.addEventListener('DOMContentLoaded', function () {
	// Load tasks from storage
	chrome.storage.sync.get(['tasks'], function (result) {
		const tasks = result.tasks || [];
		updateTodoList(tasks);
	});

	// Handle checkbox change
	document.getElementById('todoList').addEventListener('change',
		function (event) {
			const checkbox = event.target;
			const taskId = checkbox.dataset.id;

			// Update task as completed
			chrome.storage.sync.get(['tasks'], function (result) {
				const tasks = result.tasks || [];
				const updatedTasks = tasks.map(task => {
					if (task.id === taskId) {
						task.completed = checkbox.checked;
					}
					return task;
				});

				// Save updated tasks
				chrome.storage.sync.set({ 'tasks': updatedTasks });

				// Remove completed task after 2 seconds
				if (checkbox.checked) {
					setTimeout(function () {
						const updatedTasks = tasks
							.filter(task => task.id !== taskId);
						chrome.storage.sync.set({ 'tasks': updatedTasks });
						updateTodoList(updatedTasks);
					}, 2000);
				}
			});
		});

	// Add task on Enter key press
	document.addEventListener('keypress', function (event) {
		if (event.key === 'Enter') {
			const input = document.getElementById('taskInput');
			const taskText = input.value.trim();

			if (taskText !== '') {
				chrome.storage.sync.get(['tasks'], function (result) {
					const tasks = result.tasks || [];
					const newTask = {
						id: Date.now().toString(),
						text: taskText, completed: false
					};
					const updatedTasks = [...tasks, newTask];

					chrome.storage.sync.set({ 'tasks': updatedTasks });
					updateTodoList(updatedTasks);
					input.value = ''; // Clear input field
				});
			}
		}
	});

	// Update the displayed todo list
	function updateTodoList(tasks) {
		const todoList = document.getElementById('todoList');
		todoList.innerHTML = '';

		tasks.forEach(task => {
			const listItem = document.createElement('li');
			listItem.innerHTML = `
		<input type="checkbox" class="checkbox" data-id="${task.id}"
		${task.completed ? 'checked' : ''}>
		<span class="${task.completed ? 'completed' : ''}">
		${task.text}</span>`;
			todoList.appendChild(listItem);
		});
	}
});
