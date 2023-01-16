const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.name.value;
    const password = form.pass.value;

    const params = new URLSearchParams();
    params.append('name', name);
    params.append('pass', password);

    fetch('/laba_3/login.php?' + params)
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            localStorage.setItem('username', name);
            localStorage.setItem('userid', data.result.id);
            window.location.href = 'chats.html';
        } else {
            alert("Login failed");
        }
    })
    .catch(error => console.log(error));
});



