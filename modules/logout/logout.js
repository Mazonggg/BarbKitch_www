//Login user and redirect to home screen.

document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="modules/logout/logout.css">';

const userData = "userInfo";

var logoutLoader;
var logoutContainer;
var logoutButton;

window.addEventListener('load', function () {
    logoutLoader = document.getElementById('logoutLoader');
    createLogoutLoader();
})

function createLogoutLoader() {

    logoutButton = document.createElement('button');
    logoutButton.id = 'logoutButton';
    logoutButton.innerHTML = 'Log out';
    logoutButton.addEventListener('click', function () {
        logout();
    });

    logoutContainer = document.createElement('div');
    logoutContainer.id = 'logoutContainer';

    logoutContainer.appendChild(logoutButton);

    logoutLoader.parentNode.insertBefore(logoutContainer, logoutLoader.nextSibling);
}

function logout() {

    localStorage.setItem(userData, JSON.stringify(''));
    window.location.href = 'index.html';
}
