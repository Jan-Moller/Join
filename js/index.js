function forwardToSignUpHTML() {
    window.location.href = 'signup.html'
}

function checkEmptyInput() {
    checkEmptyMail();
    checkEmptyPassword();
}

function login() {
    let email = document.getElementById('login_mail');
    let password = document.getElementById('login_password');
    let user = users.find(u => u.mail == email.value && u.password == password.value)
    if (user) {
        window.location.href = 'summary.html';
    }
    else {
        wrongCredentials();
    }
}

function checkEmptyPassword() {
    let password = document.getElementById('login_password');
    if (password.value === '') {
        password.classList.add('error_msg_outline')
    }
}

function checkEmptyMail() {
    let mail = document.getElementById('login_mail');
    if (mail.value === '') {
        mail.classList.add('error_msg_outline')
    }
}

function wrongCredentials() {
    document.getElementById('error_msg_wrong_login').innerText = 'Ungültige E-Mail-Adresse oder Passwort. Bitte versuchen Sie es erneut.'
}

