document.addEventListener('DOMContentLoaded', () => {
    // Lógica del carrito
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeButton = document.querySelector('.close-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountSpan = document.getElementById('cart-count');
    const cartTotalSpan = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('checkout-button');
    let cart = [];

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
            checkoutButton.style.display = 'none';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `<span>${item.name} ($${item.price.toLocaleString('es-CO')})</span>`;
                cartItemsContainer.appendChild(itemElement);
                total += item.price;
            });
            checkoutButton.style.display = 'block';
        }
        cartCountSpan.textContent = cart.length;
        cartTotalSpan.textContent = total.toLocaleString('es-CO');
    }

    // Lógica para agregar productos al carrito
    function handleAddToCart(productItem) {
        const productName = productItem.querySelector('h4').textContent;
        const productPrice = parseFloat(productItem.querySelector('p').textContent.replace('$', '').replace(/\./g, ''));
        const product = { name: productName, price: productPrice };
        cart.push(product);
        updateCart();
        alert(`¡"${productName}" ha sido agregado al carrito!`);
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productItem = e.target.closest('.product-item');
            handleAddToCart(productItem);
        });
    });

    cartIcon.addEventListener('click', () => { cartModal.style.display = 'block'; });
    closeButton.addEventListener('click', () => { cartModal.style.display = 'none'; });
    window.addEventListener('click', (e) => { if (e.target === cartModal) { cartModal.style.display = 'none'; } });

    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            alert('¡Gracias por tu compra! Tu pedido ha sido procesado (simulado).');
            cart = [];
            updateCart();
            cartModal.style.display = 'none';
        } else {
            alert('Tu carrito está vacío. Por favor, agrega productos antes de pagar.');
        }
    });

    updateCart();

    // Lógica del modal de Login/Registro
    const loginModal = document.getElementById('login-modal');
    const openLoginBtn = document.getElementById('open-login-modal');
    const closeLoginBtn = document.querySelector('.close-button-login');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    openLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'block';
    });

    closeLoginBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Deshabilita el envío de formularios para evitar recarga de la página
    document.querySelectorAll('.form-container form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Esta funcionalidad requiere un backend. Los datos no se enviarán.');
        });
    });

    // Lógica del modo oscuro/claro
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Cargar la preferencia del usuario
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme && currentTheme === 'dark-mode') {
        body.classList.add('dark-mode');
        themeToggleBtn.checked = true; // Marca el interruptor si el tema es oscuro
    }

    themeToggleBtn.addEventListener('change', () => {
        if (themeToggleBtn.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // Lógica para el modal de producto
    const productItems = document.querySelectorAll('.product-item');
    const productModal = document.getElementById('product-modal');
    const closeProductModal = document.querySelector('.close-product-modal');
    const modalProductName = document.getElementById('modal-product-name');
    const modalProductPrice = document.getElementById('modal-product-price');
    const modalProductDescription = document.getElementById('modal-product-description');
    const modalProductVariants = document.getElementById('modal-product-variants');
    const modalAddToCartButton = document.getElementById('modal-add-to-cart');

    productItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // No hacer nada si se hace clic en el botón de agregar al carrito dentro del mismo item
            if (e.target.classList.contains('add-to-cart')) {
                return;
            }
            
            // Obtener la información del producto
            const productName = item.querySelector('h4').textContent;
            const productPrice = item.querySelector('p').textContent;
            const productImgSrc = item.querySelector('img').src;
            const productDescription = item.dataset.description;
            const productVariants = item.dataset.variants;

            // Llenar el modal con la información del producto
            modalProductName.textContent = productName;
            modalProductPrice.textContent = productPrice;
            modalProductDescription.textContent = productDescription;
            modalProductVariants.textContent = `Variantes: ${productVariants}`;
            document.getElementById('modal-product-img').src = productImgSrc;

            // Mostrar el modal
            productModal.style.display = 'block';

            // Actualizar el botón de "Agregar al carrito" en el modal
            modalAddToCartButton.onclick = () => handleAddToCart(item);
        });
    });

    closeProductModal.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.style.display = 'none';
        }
    });

    // Lógica para los carruseles de productos
    document.querySelectorAll('.product-carousel-container').forEach(carouselContainer => {
        const carouselTrack = carouselContainer.querySelector('.carousel-track');
        const prevBtn = carouselContainer.querySelector('.prev-btn');
        const nextBtn = carouselContainer.querySelector('.next-btn');

        nextBtn.addEventListener('click', () => {
            carouselTrack.scrollLeft += carouselTrack.offsetWidth;
        });

        prevBtn.addEventListener('click', () => {
            carouselTrack.scrollLeft -= carouselTrack.offsetWidth;
        });
    });
});