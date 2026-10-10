document.addEventListener("DOMContentLoaded", () => {
  const catalogGrid = document.getElementById("catalog-grid");

  fetch('content/catalog.json')
    .then(response => response.json())
    .then(data => {
      // Check if data has items or is structured as a collection
      const items = data.items || data;
      
      if (!items || items.length === 0) {
        catalogGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">No products available at the moment.</p>';
        return;
      }

      catalogGrid.innerHTML = items.map(item => `
        <div class="catalog-card">
          <img src="${item.image || 'assets/placeholder.jpg'}" alt="${item.title || 'Textile Item'}">
          <div class="card-body">
            <h4 class="card-title">${item.title || 'Featured Fabric'}</h4>
            <div class="card-price">${item.price || 'Contact for price'}</div>
            <p class="card-desc">${item.description || ''}</p>
            <a href="https://wa.me/22890638574?text=Hello,%20I%20want%20to%20order%20${encodeURIComponent(item.title)}" class="card-btn" target="_blank">Order via WhatsApp</a>
          </div>
        </div>
      `).join('');
    })
    .catch(error => {
      console.error('Error loading catalog:', error);
      catalogGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: red;">Failed to load catalog items.</p>';
    });
});