const BASE_URL = 'https://join-your-organisation-default-rtdb.europe-west1.firebasedatabase.app/'

let users = [];
let current_user_data = [];

function validateUserInput() {
    document.getElementById('error_message').innerText = '';
    if (!checkPrivacyPolicy()) {
        console.log('Fehler: Datenschutzerklärung nicht akzeptiert.');
        return false;
    }
    if (!checkPasswordSimilarity()) {
        return false;
    }
    if (checkExistingUser()) {
        return false;
    }
    return true;
}


async function addUser() {
    if (!validateUserInput()) {
        return;
    }
    let name = document.getElementById('sign_up_name').value;
    let mail = document.getElementById('sign_up_mail').value;
    let password = document.getElementById('sign_up_password').value;
    
    let tasks = {
        todo:           [{ task: "", priority: "", due_date: "" }],
        in_progress:    [{ task: "", priority: "", due_date: "" }],
        await_feedback: [{ task: "", priority: "", due_date: "" }],
        done:           [{ task: "", priority: "", due_date: "" }],
    };
    await postUser("/users", { 
        "name": name, 
        "mail": mail, 
        "sign_up_password": password, 
        "tasks": tasks 
    });

    await loadUser();

    let user = users.find(u => u.mail == mail && u.password == password);

    sessionStorage.setItem('current_user', JSON.stringify({
        id: user.id,
        name: user.name,
        mail: user.mail
    }));

    document.getElementById('succesfull_sign_up_container').classList.add('show_succesfull_sign_up');

    setTimeout(function () {
        window.location.href = 'summary.html';
    }, 2000);
}


async function postUser(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return responseToJson = await response.json();
}

async function loadUser(path = "/users") {
    let response = await fetch(BASE_URL + path + '.json');
    let responseToJson = await response.json();

    users = [];

    let UserKeysArray = Object.keys(responseToJson);
    for (let i = 0; i < UserKeysArray.length; i++) {
        users.push(
            {
                id: UserKeysArray[i],
                mail: responseToJson[UserKeysArray[i]].mail,
                name: responseToJson[UserKeysArray[i]].name,
                password: responseToJson[UserKeysArray[i]].sign_up_password,
            }
        )
    }
}

function removePlaceholders(tasks) {
    if (!tasks || typeof tasks !== 'object') {
        return {
            todo: [],
            in_progress: [],
            await_feedback: [],
            done: [],
        };
    }
    Object.keys(tasks).forEach(key => {
        tasks[key] = tasks[key] ? tasks[key].filter(task => task.task !== "" && task.priority !== "" && task.due_date !== "") : [];
    });
    return tasks;
}

async function loadCurrentUserData(id) {
    let path = `/users/${id}`;
    let response = await fetch(BASE_URL + path + '.json');
    let responseToJson = await response.json();

    current_user_data = []
    current_user_data = {
        id: id,
        mail: responseToJson.mail,
        name: responseToJson.name,
        password: responseToJson.sign_up_password,
        tasks: removePlaceholders(responseToJson.tasks),

    }
}
