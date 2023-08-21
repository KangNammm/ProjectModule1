let usernameLogin = JSON.parse(localStorage.getItem(usernameLogin))||[];
if(usernameLogin != null && usernameLogin.role == "ADMIN"){
document.getElementById("login").innerText = usernameLogin.username;
}else{
    location.href"http://127.0.0.1:5500/Project%20Module%201/admin/403.html"
}