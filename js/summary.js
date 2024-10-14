async function summaryInit() {
    let current_user = JSON.parse(sessionStorage.getItem('current_user'));
    await loadCurrentUserData(current_user.id);
    let name = document.getElementById('user_name');
    name.innerText = current_user_data.name;
}