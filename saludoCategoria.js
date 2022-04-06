function init(){
    escribirBienvenida();
    mostrarCategorias();
}

function escribirBienvenida(){
    const myTitle = document.createElement("h2");
    myTitle.setAttribute("class","text-center");  
    myTitle.innerHTML = "BIENVENIDX AL CARRITO DE COMPRAS DE TEALOR MADE";
    document.getElementById("saludo").appendChild(myTitle);
}

function mostrarCategorias()
{
    const myUl = document.createElement("ul");
    categorias.forEach((categoria)=>{
        myUl.innerHTML+=`<li style="color:#768D7B">${categoria.nombre}</li>`
  });
  document.getElementById("saludo").appendChild(myUl);
}