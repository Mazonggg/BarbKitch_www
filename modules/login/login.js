//Login user and redirect to home screen.

document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="modules/login/login.css">';

const userData = "userInfo";
var userJSON = JSON.parse(localStorage.getItem(userData));
var userName = '';
try {
    console.log('userJSON', userJSON);
    userName = userJSON['username'];
} catch (Exception) {
    alert('nope');
}

if(userName) {
    completeLogin(userName);
    //localStorage.setItem(userData, JSON.stringify(''));
}

var loginLoader;
var loginContainer;
var loginButton;
var message;

var nameInput;
var pwdInput;

window.addEventListener('load', function () {
    loginLoader = document.getElementById('loginLoader');
    createLoginLoader();
})

function createLoginLoader() {

    nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'username';
    nameInput.placeholder = 'Username';
    var nameContainer = document.createElement('div');
    nameContainer.className = 'inputContainer';
    nameContainer.appendChild(nameInput);

    pwdInput = document.createElement('input');
    pwdInput.type = 'password';
    pwdInput.id = 'password';
    pwdInput.placeholder = 'Passwort';
    var pwdContainer = document.createElement('div');
    pwdContainer.className = 'inputContainer';
    pwdContainer.appendChild(pwdInput);

    loginButton = document.createElement('button');
    loginButton.id = 'loginButton';
    loginButton.className += " buttonlook";
    loginButton.innerHTML = 'Log in';
    loginButton.addEventListener('click', function () {
        login(nameInput.value, pwdInput.value);
    });

    message = document.createElement('p');
    message.id = 'message';
    message.style.display = 'none';

    loginContainer = document.createElement('div');
    loginContainer.id = 'loginContainer';

    loginContainer.appendChild(nameContainer);
    loginContainer.appendChild(pwdContainer);
    loginContainer.appendChild(loginButton);
    loginContainer.appendChild(message);

    loginLoader.parentNode.insertBefore(loginContainer, loginLoader.nextSibling);
}

function login(usr, pwd) {

    var xmlhttp = new XMLHttpRequest();
    var ajax = 'http://h2678361.stratoserver.net/BarbaellKitchen/servering/login.php';
    xmlhttp.open('POST', ajax, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onload = function () {
        computeLogin(this.response);
    };
    xmlhttp.send('usr=' + usr + '&pwd=' + pwd);
    loginButton.style.display = 'none';
}

function computeLogin(response) {

    switch (response) {
        case '0':
            showMessage('Server Error, try later!');
            break;
        case '1':
            showMessage('Falscher Username!');
            break;
        case '2':
            showMessage('Falsches Passwort!');
            break;
        case '3':
            completeLogin(nameInput.value);
            break;
    }
}

function showMessage(string) {
    message.innerHTML = string;
    message.style.display = '';

    setTimeout(function () {
        loginButton.style.display = '';
        message.style.display = 'none';
        message.innerHTML = '';
    }, 3000);
}

function completeLogin(username) {

    var userInfo = {};
    userInfo.username = username;
    localStorage.setItem(userData, JSON.stringify(userInfo));

    window.location.href = 'home.html';
}