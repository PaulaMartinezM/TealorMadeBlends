/*
Simulador venta de Blends de Té y Yerba Mate
1- Preguntar Nombre
2- Preguntar Apellido
3- Preguntar que producto desea adquirir (completando de cada objeto nombre del Te, variedad de té y precio) y guardarlo en un array hasta que el usuario coloque "FIN". 
4- Sumar los precios de los productos cargados.
5- Mostrar Nombre + Apellido + Lista de productos en el carrito + Total de la compra
*/

let nombre=prompt("Indique su Nombre");
let apellido=prompt("Indique su Apellido");

// Creo el array compras
const compras = []

//Creo el class "Carrito"
class Carrito{
    constructor(nombreTe, variedadTe, precio){
        this.nombreTe = nombreTe,
        this.variedadTe = variedadTe,
        this.precio = precio
    }
}
//Declaración de la función de agregado de nuevo item
function nuevoItem(){
    let nombreTeIngresado = prompt("Ingrese el nombre del té que desea adquirir: Puerh - Earl Grey - Verde Miel - Verde Frutal")
    let variedadTeIngresada = prompt("Ingrese a que variedad de té pertenece: (Negro, Verde o Rojo)")
    let precioIngresado = parseInt(prompt("Ingrese el precio de su producto seleccionado: Puerh $300 - Earl Grey $350 - Verde Miel $250 - Verde Frutal $200"))
    let  nuevoItem = new Carrito(nombreTeIngresado, variedadTeIngresada, precioIngresado);
    compras.push(nuevoItem);
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

console.log("Usuario: "+nombre+" "+apellido);
let resultado = 0;
for(item of compras){
    resultado = resultado + item.precio;
    console.log("Usted agregó a su carrito el siguiente producto:"+item.nombreTe);
}
console.log("El total a pagar es:"+resultado);