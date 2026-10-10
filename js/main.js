document.addEventListener("DOMContentLoaded", () => {
  const catalogGrid = document.getElementById("catalog-grid");

  if (!catalogGrid) return; // Guard clause if element doesn't exist on page

  fetch('content/catalog.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Safely access items list whether data is structured as object or array
      const items = Array.isArray(data) ? data : (data.items || []);

      if (!items || items.length === 0) {
        catalogGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">No products available at the moment.</p>';
        return;
      }

      catalogGrid.innerHTML = items.map(item => {
        // Fallback title and price
        const title = item.title ? item.title.trim() : 'Featured Fabric';
        const price = item.price ? item.price.trim() : 'Contact for pricing';
        const description = item.description ? item.description.trim() : '';

        // Normalize image path (removes extra leading slashes if present)
        let imageSrc = item.image || 'assets/placeholder.jpg';
        if (imageSrc.startsWith('/assets/')) {
          imageSrc = imageSrc.substring(1);
        }

        // Generate custom WhatsApp message
        const whatsappMsg = `Hello GUCCI MANE4pf's Textile, I am interested in ordering: ${title}`;
        const whatsappUrl = `https://wa.me/22890638574?text=${encodeURIComponent(whatsappMsg)}`;

        return `
          <div class="catalog-card">
            <img src="${imageSrc}" alt="${title}" loading="lazy" onerror="this.src='assets/placeholder.jpg'">
            <div class="card-body">
              <h4 class="card-title">${title}</h4>
              <div class="card-price">${price}</div>
              ${description ? `<p class="card-desc">${description}</p>` : ''}
              <a href="${whatsappUrl}" class="card-btn" target="_blank" rel="noopener noreferrer">
                Order via WhatsApp
              </a>
            </div>
          </div>
        `;
      }).join('');
    })
    .catch(error => {
      console.error('Error loading catalog:', error);
      catalogGrid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; color: red;">Failed to load catalog items. Please refresh or try again later.</p>';
    });
});