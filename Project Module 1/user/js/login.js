let user = JSON.parse(localStorage.getItem('users'))||[];

const handleLogIn = ()=>{
    let loginUsername = document.getElementById('loginUsername').value;
    let loginPass = document.getElementById('loginPass').value;

    if(loginUsername.trim()==="" || loginPass.trim()===""){
        document.getElementById("error").innerText = "You must not leave it blank.";
        return; 
    }
    let usernameLogin = checkLogin (loginUsername, loginPass);
    console.log(usernameLogin);
    if(usernameLogin== null){
        document.getElementById("error").innerText = "Incorrect email or password, please re-enter.";
        return;
    }
    localStorage.setItem("usernameLogin", JSON.stringify(usernameLogin));

    if(usernameLogin.role ==="ADMIN"){
        location.href= "http://127.0.0.1:5500/Project%20Module%201/admin/index.html";
    }else{
        location.href = "../index.html"
    }
}

const checkLogin = (username, password)=>{

    let check = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < check.length; i++) {
        const user = check[i];
        if(user.username == username && user.password == password){
            return user;
        } 
    }
    return null;
} 