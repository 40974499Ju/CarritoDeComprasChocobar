document.addEventListener('DOMContentLoaded', function () {
    const cartItems = [];
  
    function updateCart() {
      const cartContainer = document.querySelector('.buy-card ul.nav-card');
      cartContainer.innerHTML = ''; // Limpiar contenido actual
  
      let total = 0;
  
      cartItems.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
          <li>${item.name}</li>
          <li>${item.price}</li>
          <li>${item.quantity}</li>
          <li><button class="remove-item" data-id="${item.id}">Eliminar</button></li>
        `;
  
        cartContainer.appendChild(cartItem);
        total += item.price * item.quantity;
      });
  
      // Mostrar total
      const totalElement = document.createElement('li');
      totalElement.textContent = `Total: $${total}`;
      cartContainer.appendChild(totalElement);
    }
  
    function addToCart(id, name, price) {
      const existingItem = cartItems.find(item => item.id === id);
  
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({ id, name, price, quantity: 1 });
      }
  
      updateCart();
    }
  
    function removeFromCart(id) {
      const index = cartItems.findIndex(item => item.id === id);
  
      if (index !== -1) {
        cartItems.splice(index, 1);
        updateCart();
      }
    }
  
    function clearCart() {
      cartItems.length = 0;
      updateCart();
    }
  
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('remove-item')) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        removeFromCart(itemId);
      } else if (event.target.classList.contains('add-to-cart')) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        const itemName = event.target.parentElement.querySelector('h3').textContent;
        const itemPrice = parseFloat(event.target.parentElement.querySelector('.precio p:first-child').textContent.slice(1));
  
        addToCart(itemId, itemName, itemPrice);
      } else if (event.target.classList.contains('clear-cart')) {
        clearCart();
      }
    });
  });
  