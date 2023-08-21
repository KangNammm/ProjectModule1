let usernameLogin = JSON.parse(localStorage.getItem("usernameLogin"));
if(usernameLogin && usernameLogin.role == "USER"){
    document.getElementById("username").innerText = usernameLogin.username;
    location.href = "../../index.html"
}
else if (usernameLogin && usernameLogin.role == "ADMIN") {
    location.href = "../admin/index.html"
}
else{
    location.href = "../admin/403.html"
}