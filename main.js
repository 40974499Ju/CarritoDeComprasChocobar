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

function mostrarCarrito() {
    let productosEnCarrito = "Productos en tu carrito:\n";
    carrito.forEach((item, index) => {
        productosEnCarrito += `${index + 1}. ${item.nombre} - ${item.unidades} unidades - Total: ${item.unidades * item.precio}$\n`;
    });
    alert(productosEnCarrito);
}

function agregarProductoAlCarrito(producto, unidades) {
    const productoEncontrado = productos.find(p => p.nombre === producto);

    if (productoEncontrado) {
        const { nombre, precio } = productoEncontrado;

        const productoEnCarrito = carrito.find(item => item.nombre === nombre);
        if (productoEnCarrito) {
            productoEnCarrito.unidades += unidades;
        } else {
            carrito.push({ nombre, unidades, precio });
        }
        
        total += unidades * precio;
        console.log(`Producto: ${nombre}, Unidades: ${unidades}, Total a pagar: ${unidades * precio}`);
    } else {
        alert("Producto no disponible.");
    }
}

function realizarCompra() {
    mostrarCarrito();

    let continuarGestionCarrito = true;
    while (continuarGestionCarrito) {
        let gestion = prompt("¿Deseas eliminar o agregar más productos al carrito? (eliminar/agregar/nada)");
        if (gestion === "eliminar") {
            mostrarCarrito();
            let productoAEliminar = parseInt(prompt("Ingresa el número del producto que deseas eliminar")) - 1;
            if (productoAEliminar >= 0 && productoAEliminar < carrito.length) {
                const productoEliminado = carrito.splice(productoAEliminar, 1)[0];
                total -= productoEliminado.unidades * productoEliminado.precio;
                console.log(`Has eliminado: ${productoEliminado.nombre}`);
            } else {
                alert("Número de producto inválido. No se eliminó ningún producto.");
            }
        } else if (gestion === "agregar") {
            mostrarProductosDisponibles();
            let productoAAgregar = prompt("Agrega un producto a tu carrito");
            let unidadesAAgregar = parseInt(prompt("¿Cuántas unidades quieres llevar?"));
            agregarProductoAlCarrito(productoAAgregar, unidadesAAgregar);
        } else {
            continuarGestionCarrito = false;
        }
    }

    mostrarCarrito();
    console.log(`El total a pagar por tus compras es: ${total}`);
    alert("Gracias por tu compra, ¡vuelve pronto!");
}

function iniciarCompra() {
    let continuarComprando = true;

    while (continuarComprando) {
        mostrarProductosDisponibles();
        let producto = prompt("Agrega un producto a tu carrito");
        let unidades = parseInt(prompt("¿Cuántas unidades quieres llevar?"));

        if (isNaN(unidades) || unidades <= 0) {
            alert("Por favor, ingresa una cantidad válida.");
            continue;
        }

        agregarProductoAlCarrito(producto, unidades);

        let respuesta = prompt("¿Deseas seguir comprando? (si o no)");
        if (respuesta.toLowerCase() !== "si") {
            continuarComprando = false;
        }
    }

    realizarCompra();
}

function iniciarPrograma() {
    let seleccion = prompt("Hola, ¿deseas comprar algún producto? (si o no)");
    if (seleccion.toLowerCase() === "si") {
        iniciarCompra();
    } else {
        console.log("¡Gracias por visitarnos! ¡Hasta pronto!");
    }
}

iniciarPrograma();