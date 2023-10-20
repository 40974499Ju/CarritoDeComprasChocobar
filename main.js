const productos = [
    { nombre: "serum rellenador", precio: 10300 },
    { nombre: "protector solar", precio: 17000 },
    { nombre: "crema hidratante", precio: 6400 },
    { nombre: "gel limpiador", precio: 6800 },
    { nombre: "agua micelar", precio: 3000 },
];

const carrito = [];
let total = 0;

function mostrarProductosDisponibles() {
    let productosDisponibles = "Productos disponibles:\n";
    productos.forEach((producto, index) => {
        productosDisponibles += `${index + 1}. ${producto.nombre} - ${producto.precio}$\n`;
    });
    alert(productosDisponibles);
}



function agregarProductoAlCarrito(producto, unidades) {
    const productoEncontrado = productos.find(p => p.nombre === producto);

    if (productoEncontrado) {
        const { nombre, precio } = productoEncontrado;
        carrito.push({ nombre, unidades, precio });
        total += unidades * precio;
        console.log(`Producto: ${nombre}, Unidades: ${unidades}, Total a pagar: ${unidades * precio}`);
    } else {
        console.log("El producto seleccionado no está disponible.");
    }
}

function realizarCompra() {
    if (carrito.length > 0) {
        console.log("Gracias por la compra. Resumen de compra:");
        const productosEnCarrito = {};

        carrito.forEach(item => {
            const { nombre, unidades, precio } = item;

            if (!productosEnCarrito[nombre]) {
                productosEnCarrito[nombre] = { unidades: 0, precio };
            }

            productosEnCarrito[nombre].unidades += unidades;
        });

        for (const nombreProducto in productosEnCarrito) {
            if (productosEnCarrito.hasOwnProperty(nombreProducto)) {
                const { unidades, precio } = productosEnCarrito[nombreProducto];
                console.log(`Producto: ${nombreProducto}, Unidades: ${unidades}, Total a pagar: ${unidades * precio}`);
            }
        }

        console.log(`El total a pagar por sus compras es: ${total}`);
    } else {
        console.log("No se agregaron productos al carrito. ¡Hasta pronto!");
    }
}

function iniciarCompra() {
    let continuarComprando = true;

    while (continuarComprando) {
        mostrarProductosDisponibles();
        let producto = prompt("Agregue un producto a su carrito");
        let unidades = parseInt(prompt("¿Cuántas unidades quiere llevar?"));
        agregarProductoAlCarrito(producto, unidades);

        let respuesta = prompt("¿Desea seguir comprando? (si o no)");
        if (respuesta.toLowerCase() !== "si") {
            continuarComprando = false;
        }
    }

    realizarCompra();
}

function iniciarPrograma() {
    let seleccion = prompt("Hola, ¿desea comprar algún producto? (si o no)");
    if (seleccion.toLowerCase() === "si") {
        iniciarCompra();
    } else {
        console.log("¡Gracias por visitarnos! ¡Hasta pronto!");
    }
}

iniciarPrograma();
