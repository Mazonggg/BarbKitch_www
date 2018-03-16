//Use cordova to scan QR-Code

document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="modules/qr_checkin/checkin.css">';

var scanLoader;
var scanContainer;

window.addEventListener('load', function () {
    scanLoader = document.getElementById('scan_qrLoader');
    createScan_qrLoader();
})

function createScan_qrLoader() {

    var cordova = document.createElement('script');
    cordova.type = 'text/javascript';
    cordova.src = 'cordova.js';
    scanLoader.parentNode.insertBefore(cordova, scanLoader.nextSibling);

    var scanButton = document.createElement('button');
    scanButton.id = 'scanButton';
    scanButton.innerHTML = 'Check in';
    scanButton.addEventListener('click', scan);

    scanContainer = document.createElement('div');
    scanContainer.id = 'scanContainer';
    scanContainer.appendChild(scanButton);

    scanLoader.parentNode.insertBefore(scanContainer, scanLoader.nextSibling);
}

function scan() {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            if (!result.cancelled) {
                if (result.format == "QR_CODE") {
                    verifyCode(result.text);
                }
            }
        },
        function (error) {
            alert("Error: " + error);
        }
    );
}

function verifyCode(string) {

    var xmlhttp = new XMLHttpRequest();
    var ajax = 'http://h2678361.stratoserver.net/BarbaellKitchen/servering/scan_qr.php';
    xmlhttp.open('POST', ajax, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onload = function () {
        processCheckin(this.response);
    };
    xmlhttp.send('code=' + string + '&usr=' + getUsername() + "&op=checkin");
}

function processCheckin(response) {

    var p = document.createElement('p');
    p.innerHTML = "qr_checkin: " + response;
    scanContainer.appendChild(p);
}

function getUsername() {
    const userData = "userInfo";
    var userJSON = JSON.parse(localStorage.getItem(userData));
    var userName = '';
    try {
        console.log('userJSON', userJSON);
        userName = userJSON['username'];
    } catch (Exception) {
        alert('nope');
    }
    return userName;
}