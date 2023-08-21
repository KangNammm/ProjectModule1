let products = JSON.parse(localStorage.getItem("products"))||[];
// lay ra danh sach danh muc
let categories = JSON.parse(localStorage.getItem("categories"))||[];

// tim kiem ten danh muc theo id danh muc
const getCategoryNameByCategoryId=(id)=>{
    let kq = categories.find((cat)=>cat.category_id==id)
    if(kq) {

        return kq.category;
    }
};

// ham id tu tang
const getNewId = () =>{
    let max = 0;
    for (let i = 0; i < products.length; i++) {
        const element = products[i];
        if(max<element.product_id){
            max = element.product_id;
        }
    }
    return max+1;
}

// total of page
let totalProduct = products.length; // tổng số sp
let count = 5;// số sp trên 1 trang
let pageCurrent = 0;
let totalPage = Math.ceil(totalProduct/count); // tổng số trang

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
    products.sort((a, b) =>b.product_id - a.product_id);
    let productPaginate = products.filter((p,index)=>(index>=(pageCurrent*count)&&index<(pageCurrent+1)*count))
    showListProduct(productPaginate)
    showPagination()
}

// đổ danh sách danh mục ra 
let str = "";
for (let i = 0; i < categories.length; i++) {
    const element = categories[i];
    str += `<option value="${element.category_id}">${element.name}</option>`;
}
document.getElementById("category").innerHTML = str;
console.log(str);
document.getElementById("category_edit").innerHTML = str;
console.log(str);
// chuc nang hien thi
const showListProduct = (list = products)=>{
    list.sort((a,b) => b.product_id - a.product_id);
    let string = "";
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        string += `<tr>
        <td>${element.product_id}</td>
        <td>${element.name}</td>
        <td><img src="${element.image}" width="120" height="120" style="object-fit:cover" alt="#"></td>
        <td>${element.description.substring(0, 30)}</td>
        <td>${element.product_price} $</td>
        <td>${element.stock}</td>
        <td>${getCategoryNameByCategoryId(element.category_id)}</td>
        <td>
            <button type="button"  data-bs-toggle="modal" data-bs-target="#editModal" onclick ="showProductEdit(${element.product_id})" class="btn btn-warning">Edit</button>
        </td>
        <td>
            <button type="button" onclick ="handleDeleteProduct(${element.product_id})" class="btn btn-danger">Delete</button>
        </td>
    </tr>`;
    }
    document.getElementById("products").innerHTML = string;
}

// goi ham 1 lan khi tai trang
showListProduct();

// them chuc nang moi
function handleAddNewProducts() {
    // lay du lieu o input
    let product_id = getNewId();
    let name = document.getElementById("product_name").value;
    let image = getImage();
    let description = document.getElementById("description").value;
    let product_price = document.getElementById("product_price").value;
    let stock = document.getElementById("stock").value;
    let category_id = document.getElementById("category").value;
    let error = "";
    if(name.trim()==""){
        error = " The name must not be left blank."
        document.getElementById("error").innerHTML = error;
        return
    }

    if(product_price <=0){
        error = " The price must be greater than 0."
        document.getElementById("error").innerHTML = error;
        return
    }

    if(stock <=0){
        error = " The quantity must be greater than 0.";
        document.getElementById("error").innerHTML = error;
        return
    }

    let newProduct = {
        product_id,
        name,
        image,
        description,
        product_price,
        stock,
        category_id
    }

    products = [...products, newProduct];
    localStorage.setItem(("products"),JSON.stringify(products));
    location.reload();
}

// delete
const handleDeleteProduct =(id)=>{
    if(confirm("Are you sure you want to remove this product?")){
        let indexDelete = products.findIndex(p=>p.product_id===id);
        products.splice(indexDelete,1);
        localStorage.setItem("products", JSON.stringify(products));
        location.reload();
    }
}

// edit
const showProductEdit = (id)=>{
    console.log(id);
    let proEdit = products.find(product =>product.product_id==id);
    document.getElementById("product_id").value = proEdit.product_id;
    document.getElementById("product_name_edit").value = proEdit.name;
    document.querySelector("#old_image img").src = proEdit.image;
    document.getElementById("description_edit").value = proEdit.description;
    document.getElementById("product_price_edit").value = proEdit.product_price;
    document.getElementById("stock_edit").value = proEdit.stock;
    document.getElementById("category_edit").value = proEdit.category_id;
}

// update
const handleUpdateProduct = ()=>{
    let product_id = document.getElementById("product_id").value;
    let name = document.getElementById("product_name_edit").value;
    let image = getImage();
    let description = document.getElementById("description_edit").value;
    let product_price = document.getElementById("product_price_edit").value;
    let stock = document.getElementById("stock_edit").value;
    let category_id = document.getElementById("category_edit").value;
  
    console.log("-->", product_id);
    let indexUpdate = products.findIndex(p=>p.product_id == product_id);
    products[indexUpdate] = {...products[indexUpdate],name,image,product_price,stock,description,category_id}
    localStorage.setItem("products", JSON.stringify(products));
    location.reload();
}

// search

const handleSearch = ()=>{
    let name = document.getElementById("search").value;
    let productsSearch = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()))
    showListProduct(productsSearch)
}

handlePagination(0);