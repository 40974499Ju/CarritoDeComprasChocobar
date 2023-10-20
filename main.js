const productos = [
    { nombre: "serum rellenador", precio: 10300 },
    { nombre: "protector solar", precio: 17000 },
    { nombre: "crema hidratante", precio: 6400 },
    { nombre: "gel limpiador", precio: 6800 },
    { nombre: "agua micelar", precio: 3000 },
];

const carrito = {};
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
        if (carrito[nombre]) {
            carrito[nombre].unidades += unidades;
        } else {
            carrito[nombre] = { unidades, precio };
        }
        total += unidades * precio;
        console.log(`Producto: ${nombre}, Unidades: ${unidades}, Total a pagar: ${unidades * precio}`);
    } else {
        alert("Producto no disponible.");
    }
}

function realizarCompra() {
    if (Object.keys(carrito).length > 0) {
        console.log("Gracias por la compra. Resumen de compra:");
        for (const nombreProducto in carrito) {
            if (carrito.hasOwnProperty(nombreProducto)) {
                const { unidades, precio } = carrito[nombreProducto];
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
        if (!producto) {
            alert("Debe ingresar un producto.");
            continue;
        }
        let unidades = parseInt(prompt("¿Cuántas unidades quiere llevar?"));
        if (isNaN(unidades) || unidades <= 0) {
            alert("La cantidad debe ser un número positivo.");
            continue;
        }
        agregarProductoAlCarrito(producto, unidades);

        let respuesta = prompt("¿Desea seguir comprando? (si o no)");
        if (respuesta && respuesta.toLowerCase() !== "si") {
            continuarComprando = false;
        } else {
            alert("¡gracias por visitarnos! ¡Hasta Pronto!")
        }

        
    }

    realizarCompra();
}

function iniciarPrograma() {
    let seleccion = prompt("Hola, ¿desea comprar algún producto? (si o no)");
    if (seleccion && seleccion.toLowerCase() === "si") {
        iniciarCompra();
    } else {
        alert("¡Gracias por visitarnos! ¡Hasta pronto!");
    }
}

iniciarPrograma();
