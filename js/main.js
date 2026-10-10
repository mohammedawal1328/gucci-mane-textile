document.addEventListener("DOMContentLoaded", () => {
  fetch('content/catalog.json')
    .then(response => response.json())
    .then(data => {
      // Set title if available
      const sectionTitle = document.querySelector('.section-title');
      if (sectionTitle && data.title) {
        sectionTitle.textContent = data.title;
      }

      // Populate Catalog Grid
      const grid = document.getElementById('catalog-grid');
      if (!grid) return;
      
      grid.innerHTML = ''; // Clear existing static cards

      if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
          const card = document.createElement('div');
          card.className = 'catalog-card';

          card.innerHTML = `
            <img src="${item.image || 'assets/images/placeholder.jpg'}" alt="${item.name}">
            <div class="card-content">
              <span class="category">${item.category}</span>
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <div class="price">${item.price ? item.price : ''}</div>
            </div>
          `;
          grid.appendChild(card);
        });
      } else {
        grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">No items found in catalog.</p>';
      }
    })
    .catch(error => {
      console.error('Error loading catalog data:', error);
    });
});