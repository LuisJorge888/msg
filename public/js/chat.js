const socket = io('http://localhost:3000/');

const btnSend = document.getElementById("btnSend");
const txtBody = document.getElementById("txtBody");

btnSend.addEventListener('click', () => {

    let body = txtBody.value;
    
    socket.emit('actionSendMsg', {
        body
    })
})

socket.emit('actionRecibeMsg', (data) => {
    console.log(data);
})