let checkIns = JSON.parse(localStorage.getItem('checkIns')) || [];

var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "https://ornate-squirrel-79ae43.netlify.app/",
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

function submitCheckIn() {
    let name = document.getElementById('name').value;
    let appointmentTime = document.getElementById('appointment-time').value;

    checkIns.push({ name, appointmentTime });
    localStorage.setItem('checkIns', JSON.stringify(checkIns));

    document.getElementById('welcome-message').style.display = 'block';
    document.getElementById('welcome-message').innerText = `Welcome ${name}! Your appointment is at ${appointmentTime}.`;

    document.getElementById('name').value = '';
    document.getElementById('appointment-time').value = '';
    document.getElementById('check-in-form').style.display = 'none';

    displayCheckIns();
}

function displayCheckIns() {
    let checkInList = document.getElementById('check-in-list');
    checkInList.innerHTML = '';

    for(let i = 0; i < checkIns.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = `${checkIns[i].name}, ${checkIns[i].appointmentTime} 
            <button onclick="removeCheckIn(${i})">Remove</button>`;
        checkInList.appendChild(li);
    }
}

function removeCheckIn(index) {
    checkIns.splice(index, 1);
    localStorage.setItem('checkIns', JSON.stringify(checkIns));
    displayCheckIns();
}

function removeAll() {
    localStorage.removeItem('checkIns');
    checkIns = [];
    displayCheckIns();
}

displayCheckIns();
