let categories = JSON.parse(localStorage.getItem("categories"))||[];
let listCategories = [
    {category_id: 1, name:"Mercedes-Benz"},
    {category_id: 2, name:"BMW"},
    {category_id: 3, name:"Rolls Royce"},
    {category_id: 4, name:"Koenigsegg"},
    {category_id: 5, name:"Lamborghini"},
    {category_id: 6, name:"Bugatti"}
]

// tim kiem ten danh muc theo id danh muc
const getCategoryNameByCategoryId=(id)=>{
    let kq = categories.find((cat)=>cat.category_id==id)
    if(kq){
        return kq.category;
    }
}


// ham id tu tang
const getNewId = () =>{
    let max = 0;
    for (let i = 0; i < categories.length; i++) {
        const element = categories[i];
        if(max<element.category_id){
            max = element.category_id;
        }
    }
    return max+1;
}

// tong trang
let totalCategory = categories.length;
const count = 5;
let pageCurrent = 0;
let totalPage = Math.ceil(totalCategory/count);

// do ra giao dien
const showPagination = ()=>{
    let links = "";
    for (let i = 0; i < totalPage; i++) {
        links+= `<li class="page-item ${i==pageCurrent?'active':''}" onclick="handlePagination(${i})"><a class="page-link" href="#">${i+1}</a></li>`
     }
     
     document.querySelector(".pagination").innerHTML=  `
     ${links}`
}

// so trang hien tai
const handlePagination = (page = 0)=>{
    pageCurrent = page
    categories.sort((a, b) =>b.category_id - a.category_id);
    let productPaginate = categories.filter((p,index)=>(index>=(pageCurrent*count)&&index<(pageCurrent+1)*count))
    showListCategory(productPaginate)
    showPagination()
}

// do danh sach danh muc
let str = "";
for (let i = 0; i < listCategories.length; i++) {
    const element = listCategories[i];
    str += `<option value="${element.category_id}">${element.name}</option>`;
}
// document.getElementById("category").innerHTML = str;
// document.getElementById("category_edit").innerHTML = str;


// chuc nang hien thi
const showListCategory = (list = categories)=>{
    list.sort((a,b) => b.category_id - a.category_id);
    let string = "";
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        string += `<tr>
        <td>${element.category_id}</td>
        <td>${element.category}</td>
        <td>${element.description.substring(0, 30)}</td>
        
        <td>
            <button type="button"  data-bs-toggle="modal" data-bs-target="#editModal" onclick ="showCategoryEdit(${element.category_id})" class="btn btn-warning">Edit</button>
        </td>
        <td>
            <button type="button" onclick ="handleDeleteCategory()(${element.category_id})" class="btn btn-danger">Delete</button>
        </td>
    </tr>`;
    }
    document.getElementById("categories").innerHTML = string;
}
showListCategory();

// them chuc nang moi
function handleAddNewCategory (){
    let category_id = getNewId();
    let category = document.getElementById("category_name").value;
    let description = document.getElementById("description").value;
    let error = "";
    if(category.trim()==""){
        error = " Category must not be left blank."
        document.getElementById("error").innerHTML = error;
        return   
    }

    if(description.trim()==""){
        error = " Description must not be left blank."
        document.getElementById("error").innerHTML = error;
        return
    }

    let newCategory = {
        category_id,
        category,
        description,
        
    }

    categories = [...categories, newCategory];
    localStorage.setItem(("categories"),JSON.stringify(categories));
    location.reload();
}

// delete
const handleDeleteCategory = (id)=>{
    if(confirm("Are you sure you want to remove this product?")){
        let indexDelete = categories.findIndex(p=>p.category_id===id);
        categories.splice(indexDelete,1);
        localStorage.setItem("categories", JSON.stringify(categories));
        location.reload();
    } 
}

// edit
const showCategoryEdit = (id)=>{
    // console.log("-->",id);
    let proEdit = categories.find(category =>category.category_id==id);
    document.getElementById("category_id").value = proEdit.category_id;
    document.getElementById("category_name_edit").value = proEdit.category;
    document.getElementById("description_edit").value = proEdit.description;
}

// update
const handleUpdateCategory = ()=>{
    let category_id = document.getElementById("category_id").value;
    let category = document.getElementById("category_name_edit").value;
    let description = document.getElementById("description_edit").value;
    console.log("-->", category_id);
    let indexUpdate = categories.findIndex(p=>p.category_id == category_id);
    categories[indexUpdate] = {...categories[indexUpdate],category,description}
    localStorage.setItem("categories", JSON.stringify(categories));
    location.reload();
}

// search

const handleSearch = ()=>{
    let category = document.getElementById("search").value;
    let categoriesSearch = categories.filter(category => category.name.toLowerCase().includes(category.toLowerCase()));
    showListCategory(categoriesSearch)
}

handlePagination(0);