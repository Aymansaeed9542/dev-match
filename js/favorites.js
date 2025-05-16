document.addEventListener('DOMContentLoaded', () => {
  const favoritesGrid = document.querySelector('.favorites-grid');
  const noFavorites = document.querySelector('.no-favorites');
  const clearFavoritesButton = document.getElementById('clear-favorites');
  
  // Load favorites from localStorage
  loadFavorites();
  
  // Clear favorites event listener
  if (clearFavoritesButton) {
    clearFavoritesButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all your favorites?')) {
        localStorage.removeItem('favorites');
        loadFavorites();
        showNotification('All favorites have been cleared');
      }
    });
  }
  
  // Function to load favorites
  function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // Check if there are any favorites
    if (favorites.length === 0) {
      noFavorites.classList.remove('hidden');
      favoritesGrid.innerHTML = '';
      return;
    }
    
    // Hide the empty state
    noFavorites.classList.add('hidden');
    
    // Group favorites by category
    const categories = {};
    
    favorites.forEach(item => {
      const category = item.category || 'Other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(item);
    });
    
    // Clear the favorites grid
    favoritesGrid.innerHTML = '';
    
    // Create sections for each category
    for (const [category, items] of Object.entries(categories)) {
      const categorySection = document.createElement('div');
      categorySection.className = 'favorites-category';
      
      // Format category name for display
      const displayName = formatCategoryName(category);
      
      categorySection.innerHTML = `
        <h2 class="category-title">${displayName}</h2>
        <div class="category-items"></div>
      `;
      
      const categoryItems = categorySection.querySelector('.category-items');
      
      // Add each item to the category
      items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'favorite-card';
        itemCard.innerHTML = `
          <div class="favorite-header">
            <h3>${item.name}</h3>
            <button class="remove-favorite" data-tool="${item.name}">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <p>${item.description}</p>
          <div class="favorite-footer">
            <a href="${item.link}" target="_blank" class="btn btn-small">Visit Website</a>
          </div>
        `;
        
        // Add the card to the category
        categoryItems.appendChild(itemCard);
        
        // Add event listener to remove button
        const removeButton = itemCard.querySelector('.remove-favorite');
        removeButton.addEventListener('click', () => {
          removeFavorite(item.name);
        });
      });
      
      // Add the category section to the grid
      favoritesGrid.appendChild(categorySection);
    }
  }
  
  // Format category name
  function formatCategoryName(category) {
    // Convert kebab-case or snake_case to Title Case
    return category
      .replace(/-|_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  // Remove a favorite
  function removeFavorite(toolName) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // Find and remove the tool
    favorites = favorites.filter(item => item.name !== toolName);
    
    // Save updated favorites
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Reload the favorites display
    loadFavorites();
    
    // Show notification
    showNotification(`${toolName} removed from favorites`);
  }
  
  // Show notification
  function showNotification(message) {
    // Check if notification container exists
    let notificationContainer = document.querySelector('.notification-container');
    
    if (!notificationContainer) {
      // Create notification container
      notificationContainer = document.createElement('div');
      notificationContainer.className = 'notification-container';
      document.body.appendChild(notificationContainer);
      
      // Add styles for the container
      notificationContainer.style.position = 'fixed';
      notificationContainer.style.bottom = '20px';
      notificationContainer.style.right = '20px';
      notificationContainer.style.zIndex = '9999';
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    
    // Style the notification
    notification.style.backgroundColor = 'var(--card-bg)';
    notification.style.color = 'var(--text-color)';
    notification.style.padding = '12px 16px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 12px var(--shadow-color)';
    notification.style.marginTop = '10px';
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';
    notification.style.border = '1px solid var(--border-color)';
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
      notification.style.opacity = '1';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      notification.style.opacity = '0';
      
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
});

// Add favorites-specific styles
const favoritesStyles = document.createElement('style');
favoritesStyles.textContent = `
  .favorites-section {
    padding: 2rem 0 4rem;
  }
  
  .favorites-grid {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .favorites-category {
    margin-bottom: 1rem;
  }
  
  .category-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-color);
  }
  
  .category-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .favorite-card {
    background-color: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 1rem;
    padding: 1.5rem;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    height: 100%;
  }
  
  .favorite-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .favorite-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    position: relative;
  }
  
  .favorite-header h3 {
    margin: 0;
  }
  
  .remove-favorite {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--muted-color);
    padding: 5px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  .remove-favorite:hover {
    color: #ef4444;
    background-color: rgba(239, 68, 68, 0.1);
  }
  
  .favorite-footer {
    margin-top: auto;
    padding-top: 1rem;
  }
  
  .favorites-controls {
    margin-top: 3rem;
    text-align: center;
  }
  
  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .empty-state svg {
    color: var(--muted-color);
    margin-bottom: 1.5rem;
    stroke-width: 1px;
  }
  
  .empty-state h3 {
    margin-bottom: 1rem;
  }
  
  .empty-state p {
    color: var(--muted-color);
    margin-bottom: 1.5rem;
  }
  
  .hidden {
    display: none;
  }
  
  @media (max-width: 768px) {
    .category-items {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
  }
  
  @media (max-width: 480px) {
    .category-items {
      grid-template-columns: 1fr;
    }
  }
`;

document.head.appendChild(favoritesStyles);
