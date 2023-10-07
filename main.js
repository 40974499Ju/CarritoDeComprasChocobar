const productos = [
    { nombre: "serum rellenador", precio: 10300 },
    { nombre: "protector solar", precio: 17000 },
    { nombre: "crema hidratante", precio: 6400 },
    { nombre: "gel limpiador", precio: 6800 },
    { nombre: "agua micelar", precio: 3000 },
];
let carrito = [];
let total = 0;

let seleccion = prompt("Hola, ¿desea comprar algún producto? (si o no)");

while (seleccion !== "si" && seleccion !== "no") {
    alert("Por favor, ingrese 'si' o 'no'.");
    seleccion = prompt("Hola, ¿desea comprar algo? (si o no)");
}

if (seleccion === "si") {
    alert("A continuación, nuestra lista de productos:");
    let todosLosProductos = productos.map(
        (producto) => `${producto.nombre} - ${producto.precio}$`
    );
    alert(todosLosProductos.join("-"));
} else if (seleccion === "no") {
    alert("¡Gracias por venir! ¡Hasta pronto!");
}

while (seleccion !== "no") {
    let producto = prompt("Agregue un producto a su carrito");
    let precio = 0;
    let encontrado = false;

    for (let i = 0; i < productos.length; i++) {
        if (productos[i].nombre === producto) {
            encontrado = true;
            precio = productos[i].precio;
            break;
        }
    }

    if (encontrado) {
        let unidades = parseInt(prompt("¿Cuántas unidades quiere llevar?"));
        carrito.push({ producto, unidades, precio });
        total += unidades * precio; 
        console.log(carrito);
    } else {
        alert("Producto no disponible.");
    }

    seleccion = prompt("¿Desea seguir comprando? (si o no)");
}

if (seleccion === "no" && carrito.length > 0) {
    alert("Gracias por la compra. Aquí está su resumen de compra:");

    for (let i = 0; i < carrito.length; i++) {
        let item = carrito[i];
        console.log(`Producto: ${item.producto}, Unidades: ${item.unidades}, Total a pagar: ${item.unidades * item.precio}`);
    }

    console.log(`El total a pagar por sus compras es: ${total}`);
} else {
    alert("Gracias por visitarnos. ¡Hasta pronto!");
}












