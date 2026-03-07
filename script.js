
// login form
document.getElementById('form-submit')
.addEventListener('click', function(e){
    e.preventDefault();
    const userName = document.getElementById('user-name').value;
    const password = document.getElementById('password').value;
    console.log(userName, password)

    if(userName === 'admin' && password === 'admin123'){
        window.location = "githubProject.html";
    }else{
        alert('Wrong user name and password..')
    }

})


