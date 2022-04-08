function init(){
    mostrarCategorias();
}

function mostrarCategorias()
{
    categorias.forEach((categoria)=>{
        const myBtn = document.createElement("button");
        myBtn.setAttribute("class", "btn");
        myBtn.innerHTML=categoria.nombre;
        myBtn.addEventListener("click",()=>mostrarProductos(categoria.nombre));
        document.getElementById("carrito").appendChild(myBtn);
  });
}

function mostrarProductos(nombreCategoria)
{
  const productosFiltrados = filtrarProductos(nombreCategoria);
  let cadena ='';
  productosFiltrados.forEach((element)=>{
    cadena +=`<div style="font.size:1.5rem; margin:2rem">
    Nombre Producto: ${element.nombre}<br>

    Variedad: ${element.variedad}<br>

    Precio: ${element.precio}<br>
    
    </div>`

    document.querySelector("#cateProd").innerHTML=cadena;
  });
}

function filtrarProductos(nombreCategoria)
{
    return almacen.filter(producto=>producto.categoria===nombreCategoria);
}