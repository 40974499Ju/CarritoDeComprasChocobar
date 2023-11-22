document.addEventListener('DOMContentLoaded', function () {
    const cartItems = [];

    function updateCart() {
        const cartContainer = document.querySelector('.buy-card ul.nav-card');
        cartContainer.innerHTML = ''; // Limpiar contenido actual

        let total = 0;

        cartItems.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
            <div class="lista_de_biografias">
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
                <p>Precio: $${item.price}</p>
                <p>Cantidad: ${item.quantity}</p>
                <p><button class="remove-item" data-id="${item.id}">Eliminar</button></p>
            </div>
            `;

            cartContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        // Mostrar total
        const totalElement = document.createElement('li');
        totalElement.textContent = `Total: $${total}`;
        cartContainer.appendChild(totalElement);
    }

    function addToCart(button) {
        const itemId = parseInt(button.getAttribute('data-id'));
        const itemName = button.getAttribute('data-title');
        const itemPrice = parseFloat(button.getAttribute('data-price'));
        const itemImage = button.getAttribute('data-image');

        const existingItem = cartItems.find(item => item.id === itemId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ id: itemId, name: itemName, price: itemPrice, quantity: 1, image: itemImage });
        }

        updateCart();
    }

    function removeFromCart(id) {
        const index = cartItems.findIndex(item => item.id === id);

        if (index !== -1) {
            if (cartItems[index].quantity > 1) {
                cartItems[index].quantity -= 1;
            } else {
                cartItems.splice(index, 1);
            }
            updateCart();
        }
    }

    function clearCart() {
        cartItems.length = 0;
        updateCart();
    }

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('add-to-cart')) {
            addToCart(event.target);
        } else if (event.target.classList.contains('remove-item')) {
            const itemId = parseInt(event.target.getAttribute('data-id'));
            removeFromCart(itemId);
        } else if (event.target.classList.contains('clear-cart')) {
            clearCart();
        }
    });
});
