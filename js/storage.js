const BASE_URL = 'https://join-your-organisation-default-rtdb.europe-west1.firebasedatabase.app/'

let users = [];

async function addUser() {
    document.getElementById('error_message').innerText = '';

    if (!checkPrivacyPolicy()) {
        console.log('Fehler: Datenschutzerklärung nicht akzeptiert.');
        return;
    }

    if (!checkPasswordSimilarity()) {
        return;
    }

    if (checkExistingUser())
        return;
    {
        let name = document.getElementById('sign_up_name').value;
        let mail = document.getElementById('sign_up_mail').value;
        let password = document.getElementById('sign_up_password').value;
        await postUser("/users", { "name": name, "mail": mail, "sign_up_password": password });
        document.getElementById('succesfull_sign_up_container').classList.add('show_succesfull_sign_up');
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 2000);
    }


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
