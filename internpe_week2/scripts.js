document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0;

    searchButton.addEventListener('click', () => {
        const query = searchBar.value.trim().toLowerCase();
        if (query) {
            alert(`Searching for: ${query}`);
            // Implement search functionality here
        }
    });

    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }, 3000);

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const productElement = event.target.closest('.highlight-product, .best-seller');
            const productId = productElement.dataset.id;
            const productName = productElement.dataset.name;
            const productPrice = productElement.dataset.price;
            alert(`Added to cart: ${productName} - $${productPrice}`);
            // Implement add to cart functionality here
        });
    });

    document.querySelectorAll('.category').forEach(category => {
        category.addEventListener('click', event => {
            const categoryName = event.target.closest('.category').dataset.category;
            alert(`Navigating to category: ${categoryName}`);
            // Implement category navigation here
        });
    });
});
