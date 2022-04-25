//const { showHelpOnFail } = require("yargs");

//const { red } = require("color-name");



function init(){
    
    mostrarCategorias();
}


const miCarrito = new Carrito(JSON.parse(localStorage.getItem("MI_CARRITO")) || []);

function mostrarCategorias()
{
    categorias.forEach((categoria)=>{
        const myBtn = document.createElement("button");
        myBtn.setAttribute("class", "btn");
        myBtn.innerHTML= categoria.nombre;
        document.querySelector("#carrito").appendChild(myBtn);
        myBtn.addEventListener("click",()=>mostrarProductos(categoria));
        
  });
}

function mostrarProductos(categoria)
{
  const productosFiltrados = filtrarProductos(categoria.nombre);
    
  let nodoProductos = document.getElementById("cateProd");
  let cadena ='';
  productosFiltrados.forEach((element)=>{
    cadena+=getProductInfo(element);
    nodoProductos.innerHTML=cadena;
  });

  mostrarCarrito();
}


  function filtrarProductos(nombreCategoria)
{
    return almacen.filter((producto)=>producto.categoria===nombreCategoria);
}

function getProductInfo(product)
{
  /* return `<div>
          <div style="font.size:1.5rem; margin:2rem">
          Nombre Producto: ${product.nombre}<br>

          Variedad: ${product.variedad}<br>

          Precio: ${product.precio}<br>
          </div>
          <div class="btn">
            ${getProductButton(product)}
          </div>
          </div>`
          */
    return `<div class="col">
                <div class="card h-100">
                  <img src="${product.foto}" class="card-img-top">
                  <div class="card-body">
                    <h5 class="card-title text-center">${product.nombre}</h5>
                    <p class="card-text text-center">Variedad: ${product.variedad}</p>
                    <p class="card-text text-center">Precio: ${product.precio}</p>
                  </div>
                  <div class="btn">
                    ${getProductButton(product)}
                  </div>
                </div>
            </div>`

}


function getProductButton(product)
{
    if(product.stock>0)
    {
      return `<button class="btn" onclick= "agregarAlCarrito(${product.id})">Agregar al Carrito</button>`
      
    }
    else{
      return `<button class="btn">No Disponible</button>`;
    } 
    
}

function agregarAlCarrito(productId)
{
  let productos = almacen.map(element=>element.id);
  let index = productos.findIndex(element=>element===productId);
  let producto = almacen[index];
  miCarrito.addProducto(producto);
  actualizarCarrito();
} 

function actualizarCarrito()
{
  let contenedor = document.getElementById("compra");
  contenedor.innerHTML="";
  let prods = miCarrito.productos;
  let nuevoContenedor=document.createElement("div");
  nuevoContenedor.setAttribute("style", "display:flex;flex-direction:column; margin:2rem");
  nuevoContenedor.innerHTML="<h3>Su Carrito:</h3>";
  prods.forEach((p)=>{
    let nodoLi = document.createElement("div");
    nodoLi.innerHTML=`Cantidad: ${p.cantidad} - Producto: ${p.producto.nombre} - Precio unitario: $ ${p.producto.precio}<br>
    <button class="btn" onclick="borrarItem(${p.producto.id})">Eliminar</button>`;

    nuevoContenedor.appendChild(nodoLi)
    })
  
  let totalCarrito = miCarrito.productos.reduce((acc,element)=>acc+=element.producto.precio*element.cantidad,0);
  
  let contenedorTotal = document.createElement("div");
  contenedorTotal.setAttribute("style","margin:2rem")
  contenedorTotal.innerHTML=` 
  <h3>TOTAL compra: $ ${totalCarrito}</h3>
  <button class="btn" style="display-flex" onclick="borrarCarrito()">Vaciar Carrito</button><button  class="btn" type="submit" onclick="comprarCarrito()">Comprar</button>`;
  
  contenedor.appendChild(nuevoContenedor);
  contenedor.appendChild(contenedorTotal);
  
  miCarrito.guardar();
  
}

function mostrarCarrito()
{
  let contenedor = document.getElementById("mainContainer");
  let nodoCarrito = document.getElementById("carrito");
      
  if(nodoCarrito===null)
  {
    nodoCarrito = document.createElement("div");
    nodoCarrito.setAttribute("id", "carrito");
    nodoCarrito.innerHTML="<h3>Su Carrito:</h3>";
    contenedor.appendChild(nodoCarrito);
  }
  

  actualizarCarrito(); 
}

function borrarItem(producto)
{
  let mapped = miCarrito.productos.map((element)=>element.producto.id);
  let index =mapped.indexOf(producto.id);
  miCarrito.productos.splice(index,1);
  mostrarCarrito();
  
}

function borrarCarrito()
{
  localStorage.clear();
  miCarrito.productos=[];
  mostrarCarrito();
  
}
function comprarCarrito()
{
  compraExitosa();
  
}

function compraExitosa()
{
  if (miCarrito.length===0)
  {
   Toastify({ text:"Su carrito está vacío", 
              duration: 3000, 
            }).showToast();
  }
  else
  {
    swal({
      title:`Gracias por tu compra!`,
      icon: "success",
    })

  localStorage.removeItem("MI_CARRITO");
  miCarrito.productos=[];
  mostrarCarrito();
  }
}