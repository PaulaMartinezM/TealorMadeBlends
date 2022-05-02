function init() {

  showCategories();
}

const myShoppingCart = new Cart(JSON.parse(localStorage.getItem("MY_CART")) || []);

function showCategories() {
  categories.forEach((category) => {
    const myBtn = document.createElement("button");
    myBtn.setAttribute("class", "btn");
    myBtn.setAttribute("style", "margin-left:2rem");
    myBtn.innerHTML = category.name;
    document.querySelector("#cart").appendChild(myBtn);
    myBtn.addEventListener("click", () => showProducts(category));
  });
}

function showProducts(category) {
  const filteredProducts = filterProducts(category.name);
  let nodoProduct = document.getElementById("categoryProduct");
  let productList = '';

  filteredProducts.forEach((element) => {
    productList += getProductInfo(element);
    nodoProduct.innerHTML = productList;
  });

  showCart();
}

function filterProducts(categoryName) {
  return warehouse.filter((producto) => producto.category === categoryName);
}

function getProductInfo(product) {
  return `<div class="col">
                <div class="card h-100">
                  <img src="${product.photo}" class="card-img-top">
                  <div class="card-body">
                    <h5 class="card-title text-center">${product.name}</h5>
                    <p class="card-text text-center">Variedad: ${product.variety}</p>
                    <p class="card-text text-center">Precio: ${product.price}</p>
                  </div>
                  <div class="btn">
                    ${getProductButton(product)}
                  </div>
                </div>
            </div>`
}

function getProductButton(product) {
  if (product.stock > 0) {
    return `<button class="btn" onclick= "addCart(${product.id})">Agregar al Carrito</button>`
  } else {
     return `<button class="btn">No Disponible</button>`;
  }
}

function addCart(productId) {
  let productos = warehouse.map(element => element.id);
  let index = productos.findIndex(element => element === productId);
  let producto = warehouse[index];
  myShoppingCart.addProducto(producto);

  updateCart();
}

function updateCart() {
  let purchaseDetail = document.getElementById("compra");
  purchaseDetail.innerHTML = "";
  let prods = myShoppingCart.productos;
  let newContainer = document.createElement("div");
  newContainer.setAttribute("style", "display:flex;flex-direction:column; margin:2rem");
  newContainer.innerHTML = "<h3>Su Carrito:</h3>";

  prods.forEach((p) => {
    let nodoLi = document.createElement("div");
    nodoLi.innerHTML = `Cantidad: ${p.quantity} - Producto: ${p.producto.name} - Precio unitario: $ ${p.producto.price}<br>
    <button class="btn" onclick="deleteItem(${p.producto.id})">Eliminar</button>`;

    newContainer.appendChild(nodoLi)
  })

  let totalCart = myShoppingCart.productos.reduce((acc, element) => acc += element.producto.price * element.quantity, 0);
  let purchaseTotal = document.createElement("div");
  purchaseTotal.setAttribute("style", "margin:2rem")
  purchaseTotal.innerHTML = ` 
  <h3>TOTAL compra: $ ${totalCart}</h3>
  <button class="btn" style="display-flex;" onclick="deleteCart()">Vaciar Carrito</button><button  class="btn" type="submit" style="margin-left:2rem" onclick="buyCart()">Comprar</button>`;

  purchaseDetail.appendChild(newContainer);
  purchaseDetail.appendChild(purchaseTotal);

  myShoppingCart.saveCart();

}

function showCart() {
  let purchaseDetail = document.getElementById("mainContainer");
  let nodoCart = document.getElementById("cart");

  if (nodoCart === null) {
    nodoCart = document.createElement("div");
    nodoCart.setAttribute("id", "cart");
    nodoCart.innerHTML = "<h3>Su Carrito:</h3>";
    purchaseDetail.appendChild(nodoCart);
  }

  updateCart();
}

function deleteItem(producto) {
  let mapped = myShoppingCart.productos.map((element) => element.producto.id);
  let index = mapped.indexOf(producto.id);
  myShoppingCart.productos.splice(index, 1);
 
  showCart();
}

function deleteCart() {
  localStorage.clear();
  myShoppingCart.productos = [];
 
  showCart();
}

function buyCart() {
  purchaseSuccess();
}

function purchaseSuccess() {
  if (myShoppingCart.length === 0) {
    Toastify({
      text: "Su carrito está vacío",
      duration: 3000,
    }).showToast();
  } else {
      swal({
        title: `Gracias por tu compra!`,
        icon: "success",
      })

    localStorage.removeItem("MY_CART");
    myShoppingCart.productos = [];
    showCart();
  }
}