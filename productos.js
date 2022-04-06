let nombreUsuario=prompt("Indique su Nombre");
let apellido=prompt("Indique su Apellido");

let compras = [];

//Declaración de la función de agregado de nuevo item
function nuevoItem(){
    let nombreTeIngresado = prompt(`Ingrese el nombre del té o mix para yerba mate que desea adquirir:
                                    Puerh
                                    Earl Grey
                                    Antonieta
                                    Frutos del Bosque
                                    Chai
                                    Verde Miel
                                    Verde Frutal
                                    Verde Citrico
                                    Mix Serrano
                                    Frutos Rojos`)
    
    const nuevoProd = almacen.filter((producto)=>
    producto.nombre.indexOf(nombreTeIngresado)!==-1)
      
    compras.push(nuevoProd[0]);                          
}
let opcion = ""
while (opcion!="FIN")
{
    opcion = prompt(`Seleccione una opción: 
                     1- Ingresar nuevo item al carrito
                     2- FIN`);
    if(opcion!="FIN"){
        nuevoItem() 

    }
    else{
        alert("Gracias por su compra!");
    }
}

console.log("Usuario: "+nombreUsuario+" "+apellido);

let resultado = 0;
let lista = "";
for(item of compras){
    resultado = resultado + item.precio;
    lista = lista +" "+ item.nombre;
   
}
console.log("Usted agregó a su carrito los siguientes productos: ");
console.log(compras);
console.log(compras.length)
console.log("Usted agregó a su carrito los siguientes productos: "+ lista);
console.log("El total a pagar es:"+ resultado);