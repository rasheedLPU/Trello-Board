let tasks = [];

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event, status) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    const task = tasks.find(task => task.id == data);
    if (task) {
        task.status = status;
        saveTasksToLocalStorage();
        renderTasks();
    }
}

function openTaskModal(status) {
    document.getElementById('task-title').value = '';
    document.getElementById('task-status').value = status;
    document.getElementById('task-description').value = '';
    document.getElementById('task-details-modal').style.display = 'block';
}

function closeTaskModal() {
    document.getElementById('task-details-modal').style.display = 'none';
}

function saveTask() {
    const title = document.getElementById('task-title').value.trim(); // Trim any leading or trailing whitespace
    const status = document.getElementById('task-status').value;
    const description = document.getElementById('task-description').value;

    // Check if the title already exists
    const existingTask = tasks.find(task => task.title.toLowerCase() === title.toLowerCase());
    if (existingTask) {
        alert('Task with the same title already exists. Please choose a unique title.');
        return; // Exit the function if the title already exists
    }

    const task = { id: Date.now(), title, status, description };
    tasks.push(task);
    saveTasksToLocalStorage();
    renderTasks();
    closeTaskModal();
}


function deleteTask() {
    const taskId = document.getElementById('task-title').value;
    const index = tasks.findIndex(task => task.id == taskId);
    if (index !== -1) {
        tasks.splice(index, 1);
        saveTasksToLocalStorage();
        renderTasks();
        closeTaskModal();
    }
}

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

function renderTasks() {
    const todoTasksContainer = document.getElementById('todo-tasks');
    const inprogressTasksContainer = document.getElementById('inprogress-tasks');
    const doneTasksContainer = document.getElementById('done-tasks');

    todoTasksContainer.innerHTML = '';
    inprogressTasksContainer.innerHTML = '';
    doneTasksContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.textContent = task.title;
        taskElement.id = task.id;
        taskElement.draggable = true;
        taskElement.classList.add('task');
        taskElement.setAttribute('draggable', 'true');
        taskElement.setAttribute('ondragstart', 'drag(event)');
        taskElement.addEventListener('click', () => openTaskDetails(task.id));

        if (task.status === 'todo') {
            todoTasksContainer.appendChild(taskElement);
        } else if (task.status === 'inprogress') {
            inprogressTasksContainer.appendChild(taskElement);
        } else if (task.status === 'done') {
            doneTasksContainer.appendChild(taskElement);
        }
    });

    // Display count of cards under each status
    document.getElementById('todo-count').textContent = tasks.filter(task => task.status === 'todo').length;
    document.getElementById('inprogress-count').textContent = tasks.filter(task => task.status === 'inprogress').length;
    document.getElementById('done-count').textContent = tasks.filter(task => task.status === 'done').length;
}

function openTaskDetails(id) {
    const task = tasks.find(task => task.id == id);
    if (task) {
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-status').value = task.status;
        document.getElementById('task-description').value = task.description;
        document.getElementById('task-details-modal').style.display = 'block';
    }
}

function renderTasks() {
    const todoTasksContainer = document.getElementById('todo-tasks');
    const inprogressTasksContainer = document.getElementById('inprogress-tasks');
    const doneTasksContainer = document.getElementById('done-tasks');

    todoTasksContainer.innerHTML = '';
    inprogressTasksContainer.innerHTML = '';
    doneTasksContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = `
            <div class="task" id="${task.id}" draggable="true" ondragstart="drag(event)">
                <span>${task.title}</span>
                <button class="delete-task-btn" onclick="deleteTaskFromBox('${task.id}', '${task.status}')">&times;</button>
            </div>
        `;
        taskElement.setAttribute('draggable', 'true');
        taskElement.setAttribute('ondragstart', 'drag(event)');
        taskElement.addEventListener('click', () => openTaskDetails(task.id));

        if (task.status === 'todo') {
            todoTasksContainer.appendChild(taskElement);
        } else if (task.status === 'inprogress') {
            inprogressTasksContainer.appendChild(taskElement);
        } else if (task.status === 'done') {
            doneTasksContainer.appendChild(taskElement);
        }
    });

    // Display count of cards under each status
    document.getElementById('todo-count').textContent = tasks.filter(task => task.status === 'todo').length;
    document.getElementById('inprogress-count').textContent = tasks.filter(task => task.status === 'inprogress').length;
    document.getElementById('done-count').textContent = tasks.filter(task => task.status === 'done').length;
}

function renderTasks() {
    const todoTasksContainer = document.getElementById('todo-tasks');
    const inprogressTasksContainer = document.getElementById('inprogress-tasks');
    const doneTasksContainer = document.getElementById('done-tasks');

    todoTasksContainer.innerHTML = '';
    inprogressTasksContainer.innerHTML = '';
    doneTasksContainer.innerHTML = '';

    let todoCount = 0;
    let inprogressCount = 0;
    let doneCount = 0;

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.innerHTML = `
            <div class="task" id="${task.id}" draggable="true" ondragstart="drag(event)">
                <span>${task.title}</span>
                <button class="delete-task-btn" onclick="deleteTaskFromBox('${task.id}', '${task.status}')">&times;</button>
            </div>
        `;
        taskElement.setAttribute('draggable', 'true');
        taskElement.setAttribute('ondragstart', 'drag(event)');
        taskElement.addEventListener('click', () => openTaskDetails(task.id));

        if (task.status === 'todo') {
            todoTasksContainer.appendChild(taskElement);
            todoCount++;
        } else if (task.status === 'inprogress') {
            inprogressTasksContainer.appendChild(taskElement);
            inprogressCount++;
        } else if (task.status === 'done') {
            doneTasksContainer.appendChild(taskElement);
            doneCount++;
        }
    });

    // Display count of cards under each status
    document.getElementById('todo-count').textContent = todoCount;
    document.getElementById('inprogress-count').textContent = inprogressCount;
    document.getElementById('done-count').textContent = doneCount;
}


function deleteTaskFromBox(id, status) {
    const index = tasks.findIndex(task => task.id == id && task.status == status);
    if (index !== -1) {
        tasks.splice(index, 1);
        saveTasksToLocalStorage();
        renderTasks();
    }
}

function openTaskDetails(id) {
    const task = tasks.find(task => task.id == id);
    if (task) {
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-status').value = task.status;
        document.getElementById('task-description').value = task.description;
        document.getElementById('task-details-modal').style.display = 'block';
    }
}





loadTasksFromLocalStorage();
renderTasks();

