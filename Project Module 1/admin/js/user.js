let users = JSON.parse(localStorage.getItem("users"))||[];
// lay danh muc
let listRole = [
    {role_id: 1, role: "USER"},
    {role_id: 2, role: "ADMIN"}
]


// tim kiem ten danh muc theo id danh muc
const getRoleNameByRoleId = (id)=>{
    let kq = listRole.find((cat)=>cat.role===id)
        if (kq){
            return kq.role;
    }
}

// ham id tu tang 
const getNewId = ()=>{
    let max = 0;
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        if(max<element.user_id){
            max = element.user_id;
        }
    }
    return max+1;
}

// do danh sach danh muc ra
let str = "";
for (let i = 0; i < listRole.length; i++) {
    const element = listRole[i];{
        const element = listRole[i];
    str += `<option value="${element.name}">${element.name}</option>`;
    }
}

// chuc nang hien thi
const showListUser = (list = users)=>{
    list.sort((a,b)=>b.user_id - a.user_id);
    let string = "";
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        string +=` <tr>
        <td>${element.user_id}</td>
        <td>${element.username}</td>
        <td><img src="${element.avatar}" width="120" height="120" style="object-fit:cover" alt="avt"></td>
        <td>${element.full_name}</td>
        <td>${element.email}</td>
        <td>${element.role}</td>
        <td>
            <button type="button" class="btn btn-success">Unlock</button>
        </td>
        <td>
            <button type="button" class="btn btn-danger">Lock</button>
        </td>
    </tr>` 
    }
    document.getElementById("users").innerHTML = string;
}
showListUser();

// them chuc nang moi
function handleCreateNewAccout() {
    // lay du lieu
    let user_id = getNewId();
    let username = document.getElementById("username").value;
    let image = document.getElementById("user_image").value;
    let full_name = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let role = document.getElementById("role").value;
    let error = "";

    if(username.trim()==""){
        error = " The username must not be left blank."
        document.getElementById("error").innerHTML = error;
        return  
    }
    if(full_name.trim()==""){
        error = " The full name must not be left blank."
        document.getElementById("error").innerHTML = error;
        return  
    }
    if(email.trim()==""){
        error = " The email must not be left blank."
        document.getElementById("error").innerHTML = error;
        return  
    }

    let newUser = {
        user_id,
        username,
        image,
        full_name,
        email,
        role,
        cart: []
    }

    users = [...users, newUser];
    localStorage.setItem(("users"),JSON.stringify(users));
    location.reload();
}

