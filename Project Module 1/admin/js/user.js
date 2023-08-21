let users = JSON.parse(localStorage.getItem("users"))||[];

localStorage.setItem(("users"),JSON.stringify(users));
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




// total of page
let totalUser = users.length; // tổng số sp
let count = 5;// số sp trên 1 trang
let pageCurrent = 0;
let totalPage = Math.ceil(totalUser/count); // tổng số trang


// đổ ra giao diện
const showPagination = ()=>{
    let links = "";
for (let i = 0; i < totalPage; i++) {
   links+= `<li class="page-item ${i==pageCurrent?'active':''}" onclick="handlePagination(${i})"><a class="page-link" href="#">${i+1}</a></li>`
}

document.querySelector(".pagination").innerHTML=  `
${links}`
}

// phần trang  : số trang hiện tại / số phần tử trên 1 trang
const handlePagination= (page = 0)=>{
    pageCurrent  = page
    users.sort((a, b) =>b.user_id - a.user_id);
    let userPaginate = users.filter((p,index)=>(index>=(pageCurrent*count)&&index<(pageCurrent+1)*count))
    showListUser(userPaginate)
    showPagination()
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
            <button type="button" onclick="handleDeleteUser()(${element.user_id})" class="btn btn-danger">Delete</button>
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

const handleDeleteUser = (id)=>{
    if(confirm("Are you sure you want to remove this user?")){
        let indexDelete = users.findIndex(p=>p.user_id===id);
        users.splice(indexDelete,1);
        localStorage.setItem("users", JSON.stringify(users));
        location.reload();
    }
}

const handleSearch = ()=>{
    let username = document.getElementById("search").value;
    let usersSearch = users.filter(uname => uname.username.toLowerCase().includes(username.toLowerCase()));
    showListUser(usersSearch)
}

handlePagination(0);
