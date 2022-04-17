


function init(){
    
    mostrarCategorias();
}

const data = JSON.parse(localStorage.getItem("MI_CARRITO"));


miCarrito = new Carrito([]);

if(!miCarrito)
{
  miCarrito = new Carrito([]);
}
else
{
  miCarrito = new Carrito(data);
}
console.log(miCarrito.productos.reduce((acc,element)=>acc+=element.precio,0));


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
  /*document.querySelector("#cateProd").innerHTML=`<h3>Productos en Categoría: ${categoria.nombre}</h3>`*/
  
  const productosFiltrados = filtrarProductos(categoria.nombre);
  
  let contenedor = document.getElementById("mainContainer");
  if(contenedor===null)
  {
    contenedor = document.createElement("div");
    contenedor.setAttribute("id", "mainContainer");
    document.querySelector("#cateProd").appendChild(contenedor);
  }
  
  let nodoProductos = document.getElementById("productos");
  if(nodoProductos===null)
  {
    nodoProductos = document.createElement("div");
    nodoProductos.setAttribute("id", "productos");
    contenedor.appendChild(nodoProductos);
  }
  else 
  {
    nodoProductos.innerHTML="";
  }

  let cadena ='';
  productosFiltrados.forEach((element)=>{
    cadena+=getProductInfo(element);
    nodoProductos.innerHTML=cadena;
  });

  mostrarCarrito();
}

  function filtrarProductos(nombreCategoria)
{
    return almacen.filter(producto=>producto.categoria===nombreCategoria);
}

function getProductInfo(product)
{
  return `<div>
          <div style="font.size:1.5rem; margin:2rem">
          Nombre Producto: ${product.nombre}<br>

          Variedad: ${product.variedad}<br>

          Precio: ${product.precio}<br>
          </div>
          <div class="btn">
            ${getProductButton(product)}
          </div>
          </div>`

}


function getProductButton(product)
{
    if(product.stock>0)
    {
      return `<button class="btn" onclick="agregarAlCarrito(${product.id})">Agregar al Carrito</button>`
      
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
  nuevoContenedor.setAttribute("style", "display:flex;flex-direction:column");
  prods.forEach(producto=>{
    let nodoLi = document.createElement("div");
    nodoLi.innerHTML=`${producto.nombre} - ${producto.precio}<br>`
    nuevoContenedor.appendChild(nodoLi)
    
  })

  contenedor.appendChild(nuevoContenedor);
  
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