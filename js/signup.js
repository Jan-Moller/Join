function checkEmptyInput() {
    checkEmptyName();
    checkEmptyMail();
    checkEmptyPassword();
    checkEmptyPasswordConfirm();
}

function checkEmptyName() {
    let name = document.getElementById('sign_up_name');
    if (name.value === '') {
        name.classList.add('error_msg_outline')
    }
}

function checkEmptyMail() {
    let mail = document.getElementById('sign_up_mail');
    if (mail.value === '') {
        mail.classList.add('error_msg_outline')
    }

}

function checkEmptyPassword() {
    let password = document.getElementById('sign_up_password');
    if (password.value === '') {
        password.classList.add('error_msg_outline')
    }
}

function checkEmptyPasswordConfirm() {
    let password_confirm = document.getElementById('sign_up_password_confirm');
    if (password_confirm.value === '') {
        password_confirm.classList.add('error_msg_outline')
    }
}

function checkPrivacyPolicy() {
    let checkbox = document.getElementById('custom_checkbox')
    if (!checkbox.checked) {
        return false
    }
    return true;
}

function checkPasswordSimilarity(){
    let password = document.getElementById('sign_up_password').value;
    let password_confirm = document.getElementById('sign_up_password_confirm').value;
    let password_confirm_container = document.getElementById('password_confirmation_msg');

    if (password !== password_confirm) {
        console.log('Passwort stimmt nicht überein');
        password_confirm_container.classList.remove('d_none')
        return false;
    }
    else { return true; }
}

function checkExistingUser() {
    let mail = document.getElementById('sign_up_mail').value;

    let existing_user = users.some(user => user.mail === mail);

    if (existing_user) {
        console.log('Benutzer mit dieser E-Mail-Adresse existiert bereits.');
        document.getElementById('error_message').innerText = 'Diese E-Mail-Adresse ist bereits registriert.';
        return true;
    } else {
        return false; 
    }
}