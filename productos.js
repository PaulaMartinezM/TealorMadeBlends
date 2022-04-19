class Carrito{

    constructor(productos){
        this.productos=productos;
    }

    addProducto(producto)
    {   
        let mapped= this.productos.map(element=>element.producto);
        
        let enCarrito = mapped.find(element=>element.id===producto.id);

        if(!enCarrito){
            this.productos.push({cantidad:1, producto});
        }  
        else{
            
            let indexed = mapped.map(element=>element.id);
            let index = indexed.indexOf(producto.id);
            this.productos[index].cantidad+=1;
        }      
            

        console.log(this.productos);
    }
   
    guardar()
    {
        localStorage.setItem("MI_CARRITO",JSON.stringify(this.productos));
    }
    

}