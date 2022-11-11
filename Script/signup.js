document.querySelector('form').addEventListener('submit', function (event){
    event.preventDefault();
        
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = +document.getElementById('password').value;

    console.log(username, email, password)
})