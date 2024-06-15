document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const taskItem = createTaskElement(taskText);
        document.getElementById('pendingTasks').appendChild(taskItem);
        taskInput.value = '';
    }
}

function createTaskElement(taskText) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = `${taskText} (Added: ${new Date().toLocaleString()})`;

    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', () => completeTask(li));

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.classList.add('edit-btn');
    editBtn.addEventListener('click', () => editTask(li, span));

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteTask(li));

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

function completeTask(taskItem) {
    taskItem.querySelector('.complete-btn').remove();
    const completedDate = ` (Completed: ${new Date().toLocaleString()})`;
    taskItem.querySelector('span').textContent += completedDate;
    document.getElementById('completedTasks').appendChild(taskItem);
}

function deleteTask(taskItem) {
    taskItem.remove();
}

function editTask(taskItem, taskSpan) {
    const modal = document.getElementById('editTaskModal');
    const editTaskInput = document.getElementById('editTaskInput');
    editTaskInput.value = taskSpan.textContent.split(' (Added: ')[0]; // Remove the date part

    modal.style.display = 'flex';

    document.getElementById('saveEditBtn').onclick = function () {
        const updatedText = editTaskInput.value.trim();
        if (updatedText !== '') {
            taskSpan.textContent = `${updatedText} (Edited: ${new Date().toLocaleString()})`;
            modal.style.display = 'none';
        }
    };

    document.getElementById('cancelEditBtn').onclick = function () {
        modal.style.display = 'none';
    };
}

document.body.insertAdjacentHTML('beforeend', `
    <div id="editTaskModal">
        <div id="editTaskForm">
            <input type="text" id="editTaskInput">
            <button id="saveEditBtn">Save</button>
            <button id="cancelEditBtn">Cancel</button>
        </div>
    </div>
`);
