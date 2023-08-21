let signin = document.querySelector('signin');
let register = document.querySelector('register');
// setTimeout(function(){ register.checked = true}, 1000)
// setTimeout(function(){ signin.checked = true}, 2000)

//

let users = JSON.parse(localStorage.getItem('users'))||[];

const handleSigUp = ()=>{
    let username = document.getElementById('username').value;
    let fullName = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    let password= document.getElementById('password').value;
    let confirmPass = document.getElementById('confirmPass').value;

    // username
    if(username.trim()===""){
        document.getElementById("usernameError").innerText= "You must not leave it blank.";
        return;
    }else if(users.findIndex((value)=>value.username ===username)> -1){
        document.getElementById("usernameError").innerText= "This account already exists, please enter another account.";
        return;
    }else{
        document.getElementById("usernameError").innerText="";
    }
    // fullname
    if(fullName.trim()===""){
        document.getElementById("fullNameError").innerText= "You must not leave it blank.";
        return;
    }else{
        document.getElementById("fullNameError").innerText="";
    }
    // email
    if(email.trim()===""){
        document.getElementById("emailError").innerText= "You must not leave it blank.";
        return;
    }else if(!validateEmail(email)){
        document.getElementById("emailError").innerText="Incorrect email format.";
        return;
    }else{
        document.getElementById("emailError").innerText="";
    }
    // password
    if(password.trim()===""){
        document.getElementById("passwordError").innerText= "You must not leave it blank.";
        return;
    }else if(!validatePassword(password)){
        document.getElementById("passwordError").innerText="Incorrect password format.";
        return;
    }else{
        document.getElementById("passwordError").innerText="";
    }
    // confirm password
    if(password !== confirmPass){
        document.getElementById("confirmPassError").innerText=" The password does not match, please enter it again.";
        return;
    }else{
        document.getElementById("confirmPassError").innerText=" You have successfully created an account."; 
    }
    let newUser = {
        user_id : getNewId(),
        username,
        email,
        full_name: fullName,
        password,
        role : "USER",
        avatar: "avatar.jpg",
        cart: []
    }
     users = [...users, newUser];
     localStorage.setItem("users", JSON.stringify(users));
     location.reload();
}

const validateEmail = (email)=>{
    return String (email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const validatePassword = (pass)=>{
    return String (pass)
    .toLowerCase()
    .match(/^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/);
}

const getNewId = ()=>{
    let users = JSON.parse(localStorage.getItem('users'))||[];
    let iMax=0;
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        console.log("-->",element);
        if(element.user_id>iMax){
            iMax = element.user_id;
        }  
    }
    return iMax+1;
}