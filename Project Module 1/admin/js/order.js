// hien thi trang thai theo ma trang thai
const handleStatusCodeOrder = (statusCode)=>{
    switch (statusCode){
        case 1:
            return `<button type="button" class="btn btn-secondary">Wait for confirmation. ...</button>`;
        case 2:
            return `<button type="button" class="btn btn-success">Confirmed.</button>`;
        case 3:
            return `<button type="button" class="btn btn-danger">Refused.</button>`;
    }
};


let orders = JSON.parse(localStorage.getItem("orders"))||[];

// total of page
let totalOrder = orders.length; // tổng số sp
let count = 5;// số sp trên 1 trang
let pageCurrent = 0;
let totalPage = Math.ceil(totalOrder/count); // tổng số trang


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
    orders.sort((a, b) =>b.user_id - a.user_id);
    let orderPaginate = orders.filter((p,index)=>(index>=(pageCurrent*count)&&index<(pageCurrent+1)*count))
    showListUser(orderPaginate)
    showPagination()
}



  // tổng giá sản phảm
  let total_price ="";
    for (let i = 0; i < orders.length; i++) {
      const element = orders[i]
         total_price += Number(element.price)*Number(element.quantity);
       }
// hien thi toan bo don hang theo thu tu ngay gan nhat
// lay danh sach don hang

const showOrders = ()=>{
  let orders = JSON.parse(localStorage.getItem("orders"))||[];
  list = orders
  const products = JSON.parse(localStorage.getItem("products"))

    let string = list.reduce(
        (str, value) => {
let stringDetail = ""

value.cart.forEach(element => {

  const product = products.find(e => e.product_id == element.idProduct)

  stringDetail += 
  `
    <li>
    <img width="50px" src="${product.image[0]}" alt="img"> | 
      <span>price: ${element.price} $</span> | 
      <span>quantity: ${element.quantity}</span>
    </li>
  `
});


          return str +
          `<tr>
            <td>${value.id}</td>
            <td>${value.order_at}</td>
            <td>
              <ul style="list-style: none">${stringDetail}</ul>
            </td>
            <td>${value.total}$</td>
            <td>${handleStatusCodeOrder(value.status)}</td>
            <td>
                <button class="btn btn-success" onclick="accept(${value.id})">Confirm</button>
                <button class="btn btn-danger" onclick="refuse(${value.id})">Refuse</button>
            </td>  
          </tr>`
        }
      ,
    ""
  );

  document.getElementById("orders").innerHTML = string;
};
showOrders();

function accept(id) {
  let orders = JSON.parse(localStorage.getItem("orders"))||[];
  const index = orders.findIndex(e => e.id == id)
  orders[index].status = 2
  localStorage.setItem("orders", JSON.stringify(orders))
  showOrders()
}
function refuse(id) {
  let orders = JSON.parse(localStorage.getItem("orders"))||[];
  const index = orders.findIndex(e => e.id == id)
  orders[index].status = 3
  localStorage.setItem("orders", JSON.stringify(orders))
  showOrders()
}

