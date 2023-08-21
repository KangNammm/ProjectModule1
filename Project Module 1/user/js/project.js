
let localCart = []

document.getElementById('dropdown_menu').addEventListener("click", function(e) {
  e.preventDefault()
  document.getElementById("hidden").classList.toggle("hiden")
})

function drawProduct() {
  const products = JSON.parse(localStorage.getItem("products"))||[]

  let stringHTML = ""

  products.forEach(element => {
    stringHTML +=
    `
      <li class="main-product">
          <div class="img-product">
              <img class="img-prd"
                  src="${element.image[0]}"
                  alt="img">
          </div>
          <div class="content-product">
              <h3 class="content-product-h3">${element.name}</h3>
              <div class="content-product-deltals">
                  <div class="price">
                      <span class="money"> <span>${element.product_price}</span> $</span>
                  </div>
                  <button id="${element.product_id}" type="button" class="btn btn-cart">Add to cart</button>
              </div>
          </div>
      </li>
    `
    document.getElementById("list_product").innerHTML = stringHTML
  });
}
drawProduct()


// Modal
let modal = document.getElementById("myModal");
let btn = document.getElementById("cart");
let close = document.getElementsByClassName("close")[0]; 
let close_footer = document.getElementsByClassName("close-footer")[0];
// let order = document.getElementsByClassName("order")[0];
btn.onclick = function () {
  modal.style.display = "block";
}
close.onclick = function () {
  modal.style.display = "none";
}
close_footer.onclick = function () {
  modal.style.display = "none";
}
// order.onclick = function () {
//   alert("Thank you for paying for the order.")
// }
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// dang nhap de payment
const handleLogInForPayMent = ()=>{
  let usernameLogin = JSON.parse(localStorage.getItem("usernameLogin"))||[];
  let date = new Date();
  console.log("==>", usernameLogin);
  if(!usernameLogin){
    alert("Please log in for payment");
    location.href = "http://127.0.0.1:5500/Project%20Module%201/user/login.html";
  } else{

    const orders = JSON.parse(localStorage.getItem("orders"))
    const users = JSON.parse(localStorage.getItem("users"))
    const index =users.findIndex(e =>  e.user_id == usernameLogin.user_id)

    const products = JSON.parse(localStorage.getItem("products"))
    let total = 0

    users[index].cart.forEach(item => {
      const product = products.find(e => e.product_id == item.idProduct)
      total += product.product_price * item.quantity
    })

    orders.push({
      id: Math.floor(100 + Math.random() * 899),
      userId: usernameLogin.user_id,
      cart: users[index].cart,
      order_at: date,
      status: 1,
      total
    })
    usernameLogin.cart = []

    localStorage.setItem("orders", JSON.stringify(orders))
    localStorage.setItem("usernameLogin", JSON.stringify(usernameLogin))
    users[index].cart = [],
    localStorage.setItem("users", JSON.stringify(users))
    alert("Successful purchase. !")

  }
}





// xóa cart
var remove_cart = document.getElementsByClassName("btn-danger");
for (var i = 0; i < remove_cart.length; i++) {
  var button = remove_cart[i]
  button.addEventListener("click", function () {
    var button_remove = event.target
    button_remove.parentElement.parentElement.remove()
  })
}
// update cart 
function updatecart() {
    var cart_item = document.getElementsByClassName("cart-items")[0];
    var cart_rows = cart_item.getElementsByClassName("cart-row");
    var total = 0;
    for (var i = 0; i < cart_rows.length; i++) {
      var cart_row = cart_rows[i]
      var price_item = cart_row.getElementsByClassName("cart-price ")[0]
      var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
      var price = parseFloat(price_item.innerText)// chuyển một chuổi string sang number để tính tổng tiền.
      var quantity = quantity_item.value // lấy giá trị trong thẻ input
      total = total + (price * quantity)
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = total + '$'
    // Thay đổi text = total trong .cart-total-price. Chỉ có một .cart-total-price nên mình sử dụng [0].
  }

// thay đổi số lượng sản phẩm
var quantity_input = document.getElementsByClassName("cart-quantity-input");
for (var i = 0; i < quantity_input.length; i++) {
  var input = quantity_input[i];
  input.addEventListener("change", function (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    updatecart()
  })
}

// Thêm vào giỏ, onclick button
var add_cart = document.getElementsByClassName("btn-cart");
for (var i = 0; i < add_cart.length; i++) {
  var add = add_cart[i];
  add.addEventListener("click", function (event) {

    var button = event.target;

    // -----------------------
    const userLogin = JSON.parse(localStorage.getItem("usernameLogin"))
const products = JSON.parse(localStorage.getItem("products"))
    const users = JSON.parse(localStorage.getItem("users"))
    const indexUser = users.findIndex(e => e.user_id == userLogin.user_id)
    let id = this.id
    // console.log("==>", indexUser);
    const productDetail = products.find(e => e.product_id == id)
    
    users[indexUser].cart.push({
      idProduct: id,
      quantity: 1,
      price: productDetail.product_price
    })

    localStorage.setItem("users", JSON.stringify(users))

    // -------------------------
    var product = button.parentElement.parentElement;
    var img = product.parentElement.getElementsByClassName("img-prd")[0].src
    var title = product.getElementsByClassName("content-product-h3")[0].innerText
    var price = product.getElementsByClassName("price")[0].innerText
    addItemToCart(title, price, img, id)
    // Khi thêm sản phẩm vào giỏ hàng thì sẽ hiển thị modal
    modal.style.display = "block";
    
    updatecart()
  })
}

function addItemToCart(title, price, img, id) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]
  var cart_title = cartItems.getElementsByClassName('cart-item-title')
  for (var i = 0; i < cart_title.length; i++) {
    if (cart_title[i].innerText == title) {
      alert('Products already in the cart.')
      return
    }
  }

  var cartRowContents = `
  <div class="cart-item cart-column">
      <img class="cart-item-image" src="${img}" width="100" height="100">
      <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
      <input id="${id}" class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">Delete</button>
  </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', function () {
    var button_remove = event.target
    button_remove.parentElement.parentElement.remove()
    updatecart()
  })
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', function (event) {
    var input = event.target

    console.log("==>", event.target.value);
    this.value = event.target.value
    
    const users = JSON.parse(localStorage.getItem("users"))
    const userLogin = JSON.parse(localStorage.getItem("usernameLogin"))

    const indexUser = users.findIndex(e => e.user_id == userLogin.user_id)

    const cart = users[indexUser].cart

    const indexCart = cart.findIndex(e => e.idProduct == id)

    cart[indexCart].quantity = event.target.value

    localStorage.setItem("users", JSON.stringify(users))

  })
}

 const products = JSON.parse(localStorage.getItem("products"))||[]
 const handleSearch = ()=>{
  let name = document.getElementById("search").value;
  let productsSearch = products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()))
  showListProduct(productsSearch)
}
