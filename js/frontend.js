document.addEventListener('DOMContentLoaded', () => {
  // Initialize favorite buttons
  initFavoriteButtons();
  
  // Optimize page transitions
  optimizePageTransitions();
  
  // Animation for roadmap steps
  animateRoadmapOnScroll();
  
  // Force immediate rendering
  document.body.style.opacity = '1';
  document.body.style.visibility = 'visible';
  
  // Fade in main content
  fadeInMainContent();
});

// Optimize page transitions
function optimizePageTransitions() {
  const mainElement = document.querySelector('main');
  if (mainElement) {
    // Add transition class
    mainElement.classList.add('page-transition');
    
    // Let the CSS animation handle the transition
    // The class will be removed by the CSS animation
  }

  // Optimize animations
  const animatedElements = document.querySelectorAll('.tool-card, .resource-card, .roadmap-step');
  animatedElements.forEach(element => {
    element.style.willChange = 'transform, opacity';
  });
}

// Initialize favorite buttons functionality
function initFavoriteButtons() {
  const favoriteButtons = document.querySelectorAll('.favorite-btn');
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  // Process buttons immediately
  favoriteButtons.forEach(button => {
    const toolName = button.dataset.tool;
    const toolDescription = button.dataset.description;
    const toolLink = button.dataset.link;
    const toolCategory = button.dataset.category;
    
    // Check if this tool is already favorited
    const isFavorited = favorites.some(item => item.name === toolName);
    
    // Update button state
    updateFavoriteButton(button, isFavorited);
    
    // Add click event listener
    button.addEventListener('click', () => {
      toggleFavorite(button, toolName, toolDescription, toolLink, toolCategory);
    });
  });
}

// Update favorite button appearance
function updateFavoriteButton(button, isFavorited) {
  const icon = button.querySelector('i');
  
  if (isFavorited) {
    button.classList.add('favorited');
    icon.classList.remove('far');
    icon.classList.add('fas');
  } else {
    button.classList.remove('favorited');
    icon.classList.remove('fas');
    icon.classList.add('far');
  }
}

// Toggle favorite status
function toggleFavorite(button, toolName, toolDescription, toolLink, toolCategory) {
  // Get current favorites
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  // Check if tool is already favorited
  const existingIndex = favorites.findIndex(item => item.name === toolName);
  
  if (existingIndex === -1) {
    // Add to favorites
    favorites.push({
      name: toolName,
      description: toolDescription,
      link: toolLink,
      category: toolCategory
    });
    showNotification(`${toolName} added to favorites`);
  } else {
    // Remove from favorites
    favorites.splice(existingIndex, 1);
    showNotification(`${toolName} removed from favorites`);
  }
  
  // Save to localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));
  
  // Update button appearance
  updateFavoriteButton(button, existingIndex === -1);
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

// Animation for roadmap steps
function animateRoadmapOnScroll() {
  const steps = document.querySelectorAll('.roadmap-step');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        });
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  steps.forEach(step => {
    observer.observe(step);
  });
}

// Game Development specific initialization
function initGameDevFeatures() {
  // Initialize tool cards with enhanced animations
  const toolCards = document.querySelectorAll('.tool-card');
  toolCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px) scale(1.02)';
      card.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Initialize roadmap steps with enhanced animations
  const roadmapSteps = document.querySelectorAll('.roadmap-step');
  roadmapSteps.forEach((step, index) => {
    // Add delay based on index
    step.style.animationDelay = `${index * 0.2}s`;
    
    // Add click handler for expanding details
    step.addEventListener('click', () => {
      const content = step.querySelector('.step-content');
      if (content) {
        content.classList.toggle('expanded');
      }
    });
  });

  // Initialize resource cards with enhanced interactions
  const resourceCards = document.querySelectorAll('.resource-card');
  resourceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.02)';
      card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
    });
  });

  // Add smooth scrolling for roadmap steps
  document.querySelectorAll('.step-resources a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      window.open(href, '_blank');
    });
  });

  // Add keyboard navigation for roadmap steps
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const steps = document.querySelectorAll('.roadmap-step');
      const currentStep = document.querySelector('.roadmap-step:focus');
      let nextStep;
      
      if (currentStep) {
        const currentIndex = Array.from(steps).indexOf(currentStep);
        if (e.key === 'ArrowDown') {
          nextStep = steps[currentIndex + 1];
        } else {
          nextStep = steps[currentIndex - 1];
        }
      } else {
        nextStep = e.key === 'ArrowDown' ? steps[0] : steps[steps.length - 1];
      }
      
      if (nextStep) {
        nextStep.focus();
        nextStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });
}

// Enhanced notification system for game development
function showGameDevNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add game development specific styling
  notification.style.backgroundColor = type === 'success' ? 'var(--success-color)' : 
                                    type === 'error' ? 'var(--error-color)' : 
                                    'var(--card-bg)';
  notification.style.color = type === 'info' ? 'var(--text-color)' : 'white';
  
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Remove after animation
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Additional CSS styles for the frontend page
const frontendStyles = document.createElement('style');
frontendStyles.textContent = `
  /* Tool cards styling */
  .tools-section, .resources-section {
    padding: 4rem 0;
  }
  
  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .section-header p {
    color: var(--muted-color);
    max-width: 700px;
    margin: 0 auto;
  }
  
  .tools-grid, .resources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  
  .tool-card, .resource-card {
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
  
  .tool-card:hover, .resource-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .tool-header, .resource-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    position: relative;
  }
  
  .tool-icon, .resource-icon {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    color: white;
  }
  
  .tool-header h3, .resource-header h3 {
    margin: 0;
    flex: 1;
  }
  
  .favorite-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--muted-color);
    padding: 5px;
    border-radius: 50%;
    transition: all 0.3s ease;
    margin-left: auto;
  }
  
  .favorite-btn:hover {
    color: var(--primary-color);
    background-color: rgba(139, 92, 246, 0.1);
  }
  
  .favorite-btn.active {
    color: var(--primary-color);
  }
  
  .tool-footer, .resource-footer {
    margin-top: auto;
    padding-top: 1rem;
  }
  
  /* Roadmap styling */
  .roadmap-section {
    background-color: rgba(139, 92, 246, 0.05);
    padding: 4rem 0;
  }
  
  .roadmap-container {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }
  
  .roadmap-container::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 24px;
    width: 2px;
    background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
    transform: translateX(-50%);
  }
  
  .roadmap-step {
    display: flex;
    margin-bottom: 2rem;
    position: relative;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.6s ease;
  }
  
  .roadmap-step.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  .roadmap-step:nth-child(1) { transition-delay: 0.1s; }
  .roadmap-step:nth-child(2) { transition-delay: 0.2s; }
  .roadmap-step:nth-child(3) { transition-delay: 0.3s; }
  .roadmap-step:nth-child(4) { transition-delay: 0.4s; }
  .roadmap-step:nth-child(5) { transition-delay: 0.5s; }
  .roadmap-step:nth-child(6) { transition-delay: 0.6s; }
  
  .step-number {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.25rem;
    z-index: 2;
    margin-right: 1.5rem;
  }
  
  .step-content {
    flex: 1;
    background-color: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  
  .step-content h3 {
    margin-top: 0;
    color: var(--text-color);
  }
  
  .step-resources {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  
  .resource-link {
    background-color: rgba(139, 92, 246, 0.1);
    color: var(--primary-color);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    transition: all 0.3s ease;
  }
  
  .resource-link:hover {
    background-color: rgba(139, 92, 246, 0.2);
  }
  
  /* Responsive styles for roadmap */
  @media (max-width: 768px) {
    .tools-grid, .resources-grid {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
  }
  
  @media (max-width: 480px) {
    .roadmap-container::before {
      left: 20px;
    }
    
    .step-number {
      width: 40px;
      height: 40px;
      font-size: 1rem;
      margin-right: 1rem;
    }
    
    .step-content {
      padding: 1rem;
    }
  }
`;

document.head.appendChild(frontendStyles);

// Add performance optimized styles
const optimizedStyles = document.createElement('style');
optimizedStyles.textContent = `
  .page-transition {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  
  .tool-card, .resource-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    will-change: transform, opacity;
    backface-visibility: hidden;
  }
  
  .tool-card:hover, .resource-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .roadmap-step {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .roadmap-step.animate {
    opacity: 1;
    transform: translateY(0);
  }
  
  .step-content {
    transition: all 0.3s ease;
  }
  
  .step-content.expanded {
    transform: scale(1.02);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  .favorite-btn {
    transition: all 0.3s ease;
  }
  
  .favorite-btn:hover {
    transform: scale(1.1);
  }
  
  .favorite-btn.favorited {
    color: var(--primary-color);
    transform: scale(1.1);
  }
  
  .notification {
    animation: slideIn 0.3s ease forwards;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }
  
  /* Optimize animations */
  * {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

document.head.appendChild(optimizedStyles);

// Optimize window load
window.addEventListener('load', () => {
  // Force immediate rendering
  document.body.style.opacity = '1';
  document.body.style.visibility = 'visible';
});

// Fade in main content on page load
function fadeInMainContent() {
  const main = document.querySelector('main');
  if (main) {
    main.style.opacity = '0';
    main.style.transition = 'opacity 0.7s cubic-bezier(0.4,0,0.2,1)';
    requestAnimationFrame(() => {
      main.style.opacity = '1';
    });
  }
}

// Add CSS for fade-in effect
const fadeInStyles = document.createElement('style');
fadeInStyles.textContent = `
  main {
    opacity: 0;
  }
`;
document.head.appendChild(fadeInStyles);