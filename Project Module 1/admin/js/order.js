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

