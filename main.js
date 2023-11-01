document.getElementById("mostrar-productos").addEventListener("click", function () {
    mostrarProductosDisponibles();
});

document.getElementById("eliminar-producto").addEventListener("click", function () {
    eliminarProductoSeleccionado();
});

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
    const productosLista = document.getElementById("lista-productos");
    productosLista.innerHTML = "";

    productos.forEach((producto, index) => {
        const listItem = document.createElement("li");
        listItem.dataset.id = index;
        listItem.textContent = `${producto.nombre} - $${producto.precio}`;

        const addButton = document.createElement("button");
        addButton.textContent = "Agregar al carrito";
        addButton.classList.add("agregar");
        addButton.addEventListener("click", () => agregarProductoAlCarrito(index));

        listItem.appendChild(addButton);
        productosLista.appendChild(listItem);
    });
}

function mostrarCarrito() {
    const carritoLista = document.getElementById("carrito");
    carritoLista.innerHTML = "";

    carrito.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.nombre} - ${item.unidades} unidades - Total: $${item.unidades * item.precio}`;

        const eliminarButton = document.createElement("button");
        eliminarButton.textContent = "Eliminar";
        eliminarButton.classList.add("eliminar");
        eliminarButton.addEventListener("click", () => eliminarProducto(index));

        listItem.appendChild(eliminarButton);
        carritoLista.appendChild(listItem);
    });

    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = `El total a pagar por tus compras es: $${total}`;
}

function eliminarProducto(index) {
    const productoEliminado = carrito.splice(index, 1)[0];
    total -= productoEliminado.unidades * productoEliminado.precio;
    guardarCarritoLocalStorage();
    mostrarCarrito();
}

function agregarProductoAlCarrito(index) {
    const producto = productos[index];
    if (producto) {
        const { nombre, precio } = producto;

        const productoEnCarrito = carrito.find(item => item.nombre === nombre);
        if (productoEnCarrito) {
            productoEnCarrito.unidades += 1;
        } else {
            carrito.push({ nombre, unidades: 1, precio });
        }

        total += precio;
        mostrarCarrito();
        guardarCarritoLocalStorage();
    } else {
        const mensaje = document.getElementById("mensaje");
        mensaje.textContent = "Producto no disponible.";
    }
}

function guardarCarritoLocalStorage() {
    const carritoJSON = JSON.stringify(carrito);
    localStorage.setItem('carrito', carritoJSON);
    localStorage.setItem('total', total);
}

function cargarCarritoLocalStorage() {
    const carritoGuardadoJSON = localStorage.getItem('carrito');
    const totalGuardado = parseFloat(localStorage.getItem('total'));

    if (carritoGuardadoJSON) {
        carrito.push(...JSON.parse(carritoGuardadoJSON));
        total = totalGuardado;
    }
}

function eliminarProductoSeleccionado() {
    mostrarCarrito();
    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = "Haz clic en el botón 'Eliminar' del producto que deseas eliminar del carrito.";
}

function iniciarPrograma() {
    cargarCarritoLocalStorage();
    mostrarProductosDisponibles();
}

iniciarPrograma();
