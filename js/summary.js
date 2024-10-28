async function summaryInit() {
    let current_user = JSON.parse(sessionStorage.getItem('current_user'));
    await loadCurrentUserData(current_user.id);
    let name = document.getElementById('user_name');
    name.innerText = current_user_data.name;
    showNumberOfTasks();
    showNextDueDate();
}

function showNumberOfTasks() {
    const elements = getTaskElements();
    const taskNumbers = calculateTaskNumbers();
    updateTaskElements(elements, taskNumbers);
}

function updateTaskElements(elements, numbers) {
    elements.todo.innerHTML = numbers.number_of_todo;
    elements.done.innerHTML = numbers.number_of_done;
    elements.tasks_in_progress.innerHTML = numbers.number_of_tasks_in_progress;
    elements.wait_for_feedback.innerHTML = numbers.number_of_feedback;
    elements.urgent_tasks.innerHTML = numbers.number_of_urgent_tasks;
    elements.total_open_tasks.innerHTML = numbers.total_open_tasks;
}

function calculateTaskNumbers() {
    return {
        number_of_todo: current_user_data.tasks.todo.length,
        number_of_done: current_user_data.tasks.done.length,
        number_of_tasks_in_progress: current_user_data.tasks.in_progress.length,
        number_of_feedback: current_user_data.tasks.await_feedback.length,
        number_of_urgent_tasks: numberOfUrgentTasks(),
        total_open_tasks: current_user_data.tasks.todo.length + current_user_data.tasks.in_progress.length + current_user_data.tasks.await_feedback.length
    };
}

function getTaskElements() {
    return {
        todo: document.getElementById('todo_amount'),
        done: document.getElementById('completed_amount'),
        total_open_tasks: document.getElementById('all_tasks_amount'),
        tasks_in_progress: document.getElementById('tasks_progress_amount'),
        wait_for_feedback: document.getElementById('wait_for_feedback_amount'),
        urgent_tasks: document.getElementById('urgent_amount')
    };
}

function numberOfUrgentTasks() {
    let urgentTaskCount = 0;

    Object.keys(current_user_data.tasks).forEach(key => {
        urgentTaskCount += current_user_data.tasks[key].filter(task => task.priority === "urgent").length;
    });

    return urgentTaskCount;
}

function getNextDueDate() {
    let nextDueDate = null;
    Object.keys(current_user_data.tasks).forEach(key => {
        current_user_data.tasks[key].forEach(task => {
            if (task.due_date) {
                const taskDate = new Date(task.due_date * 1000).getTime(); 
                const now = new Date().getTime();
                if (taskDate > now && (nextDueDate === null || taskDate < nextDueDate)) {
                    nextDueDate = taskDate;
                }
            }
        });
    });
    return nextDueDate ? new Date(nextDueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "No upcoming due dates";
}

function showNextDueDate() {
    let deadline = document.getElementById('deadline_date');
    let nextDueDate = getNextDueDate();
    
    deadline.innerHTML = nextDueDate;
}
