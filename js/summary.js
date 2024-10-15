async function summaryInit() {
    let current_user = JSON.parse(sessionStorage.getItem('current_user'));
    await loadCurrentUserData(current_user.id);
    let name = document.getElementById('user_name');
    name.innerText = current_user_data.name;
    showNumberOfTasks();
}

function showNumberOfTasks() {
    let todo = document.getElementById('todo_amount');
    let done = document.getElementById('completed_amount');
    let total_open_tasks = document.getElementById('all_tasks_amount');
    let tasks_in_progress = document.getElementById('tasks_progress_amount');
    let wait_for_feedback = document.getElementById('wait_for_feedback_amount');
    let urgent_tasks = document.getElementById('urgent_amount'); 

    let number_of_todo = current_user_data.tasks.todo.length;
    let number_of_done = current_user_data.tasks.done.length;
    let number_of_tasks_in_progress = current_user_data.tasks.in_progress.length;
    let number_of_feedback = current_user_data.tasks.await_feedback.length;
    let number_of_urgent_tasks =  numberOfUrgentTasks();

    urgent_tasks.innerHTML = number_of_urgent_tasks;
    todo.innerHTML = number_of_todo;
    done.innerHTML = number_of_done; 
    tasks_in_progress.innerHTML = number_of_tasks_in_progress; 
    wait_for_feedback.innerHTML = number_of_feedback;
    total_open_tasks.innerHTML = number_of_todo + number_of_tasks_in_progress + number_of_feedback;
}

function numberOfUrgentTasks() {
    let urgentTaskCount = 0;

    Object.keys(current_user_data.tasks).forEach(key => {
        urgentTaskCount += current_user_data.tasks[key].filter(task => task.priority === "urgent").length;
    });

    return urgentTaskCount;
}