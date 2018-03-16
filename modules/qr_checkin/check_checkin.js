//Use cordova to scan QR-Code

document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="modules/qr_checkin/checkin.css">';

var scanLoader;
var scanContainer;

window.addEventListener('load', function () {
    scanLoader = document.getElementById('scan_qrLoader');


    scanContainer = document.createElement('div');
    scanContainer.id = 'scanContainer';

    scanLoader.parentNode.insertBefore(scanContainer, scanLoader.nextSibling);
})

function verifyCode(string) {

    var xmlhttp = new XMLHttpRequest();
    var ajax = 'http://h2678361.stratoserver.net/BarbaellKitchen/servering/check_checkin.php';
    xmlhttp.open('POST', ajax, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.onload = function () {
        readCheckin(this.response);
    };
    xmlhttp.send('usr=' + getUsername());
}

function readCheckin(response) {

    var p = document.createElement('p');
    p.innerHTML = "read_checkin: " + response;
    scanContainer.appendChild(p);
}
