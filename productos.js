class Cart {
    constructor(productos) {
        this.productos = productos;
    }

    addProducto(producto) {
        let mapped = this.productos.map(element => element.producto);
        let inCart = mapped.find(element => element.id === producto.id);

            if (!inCart) {
            this.productos.push({ quantity: 1, producto });
            } else {

                let indexed = mapped.map(element => element.id);
                let index = indexed.indexOf(producto.id);
                this.productos[index].quantity += 1;
            }

        console.log(this.productos);
    }

    saveCart() {
        localStorage.setItem("MY_CART", JSON.stringify(this.productos));
    }
}