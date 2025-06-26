// Main JavaScript file for common functionality

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const randomToolBtn = document.getElementById('random-tool-btn');
const randomToolResult = document.getElementById('random-tool-result');
const randomToolName = document.getElementById('random-tool-name');
const randomToolDescription = document.getElementById('random-tool-description');
const randomToolLink = document.getElementById('random-tool-link');
const saveRandomTool = document.getElementById('save-random-tool');
const starsContainer = document.getElementById('stars-container');

// Initialize theme from localStorage before anything else
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  console.log('Theme initialized as:', savedTheme);
};

// Call theme initialization immediately
initializeTheme();

// Initialize everything else after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create stars background
  createStars();
  
  // Add page transition class
  const mainElement = document.querySelector('main');
  if (mainElement) {
    mainElement.classList.add('page-transition');
  }
});

// Theme toggle functionality
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// Mobile menu toggle
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (mobileMenu && mobileMenu.classList.contains('show') && 
      !mobileMenu.contains(e.target) && 
      !mobileMenuToggle.contains(e.target)) {
    mobileMenu.classList.remove('show');
  }
});

// Create starry background
function createStars() {
  if (!starsContainer) return;
  
  const starCount = Math.floor((window.innerWidth * window.innerHeight) / 1000);
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random size between 1px and 3px
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Random position
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    
    // Random twinkle animation
    const animationClass = Math.random() < 0.33 ? 'twinkle-slow' : 
                          Math.random() < 0.66 ? 'twinkle-medium' : 'twinkle-fast';
    star.classList.add(animationClass);
    
    // Random color with slightly different hues
    const hue = Math.random() * 30 + 240; // Blue-purple range
    const saturation = Math.random() * 30 + 70; // High saturation
    const lightness = Math.random() * 30 + 70; // Bright
    star.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    starsContainer.appendChild(star);
  }
}

// Sample data for tools (would be fetched from a real API in production)
const toolsData = [
  {
    name: "VS Code",
    description: "A powerful code editor with extensions for almost any language or framework.",
    link: "https://code.visualstudio.com/",
    category: "frontend"
  },
  {
    name: "React",
    description: "A JavaScript library for building user interfaces with components.",
    link: "https://reactjs.org/",
    category: "frontend"
  },
  {
    name: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine.",
    link: "https://nodejs.org/",
    category: "backend"
  },
  {
    name: "MongoDB",
    description: "A document database with the scalability and flexibility you want.",
    link: "https://www.mongodb.com/",
    category: "backend"
  },
  {
    name: "TensorFlow",
    description: "An end-to-end open source platform for machine learning.",
    link: "https://www.tensorflow.org/",
    category: "datascience"
  },
  {
    name: "Pandas",
    description: "Fast, powerful, flexible and easy to use open source data analysis tool built on Python.",
    link: "https://pandas.pydata.org/",
    category: "datascience"
  },
  {
    name: "Docker",
    description: "Empowers application development and deployment in containers.",
    link: "https://www.docker.com/",
    category: "devops"
  },
  {
    name: "Kubernetes",
    description: "Container orchestration system for automating deployment, scaling, and management.",
    link: "https://kubernetes.io/",
    category: "devops"
  },
  {
    name: "Flutter",
    description: "Google's UI toolkit for building natively compiled applications from a single codebase.",
    link: "https://flutter.dev/",
    category: "mobile"
  },
  {
    name: "Figma",
    description: "A collaborative interface design tool that's taking design teams by storm.",
    link: "https://www.figma.com/",
    category: "ux-ui"
  },
  {
    name: "Unity",
    description: "The world's leading platform for creating and operating interactive, real-time 3D content.",
    link: "https://unity.com/",
    category: "game-dev"
  },
  {
    name: "PyTorch",
    description: "An open source machine learning framework that accelerates the path from research to production.",
    link: "https://pytorch.org/",
    category: "ai-ml"
  }
];

// Random tool suggestion
if (randomToolBtn) {
  randomToolBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * toolsData.length);
    const randomTool = toolsData[randomIndex];
    
    randomToolName.textContent = randomTool.name;
    randomToolDescription.textContent = randomTool.description;
    randomToolLink.href = randomTool.link;
    
    // Show the result container with animation
    randomToolResult.classList.remove('hidden');
    randomToolResult.style.opacity = '0';
    randomToolResult.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      randomToolResult.style.opacity = '1';
      randomToolResult.style.transform = 'translateY(0)';
      randomToolResult.style.transition = 'all 0.5s ease';
    }, 10);
    
    // Configure save button
    saveRandomTool.dataset.toolName = randomTool.name;
    saveRandomTool.dataset.toolDescription = randomTool.description;
    saveRandomTool.dataset.toolLink = randomTool.link;
    saveRandomTool.dataset.toolCategory = randomTool.category;
  });
}

// Save to favorites functionality 
if (saveRandomTool) {
  saveRandomTool.addEventListener('click', () => {
    const toolToSave = {
      name: saveRandomTool.dataset.toolName,
      description: saveRandomTool.dataset.toolDescription,
      link: saveRandomTool.dataset.toolLink,
      category: saveRandomTool.dataset.toolCategory
    };
    
    // Get existing favorites or initialize empty array
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // Check if tool already exists in favorites
    const toolExists = favorites.some(tool => tool.name === toolToSave.name);
    
    if (!toolExists) {
      // Add to favorites
      favorites.push(toolToSave);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      
      // Update button text
      saveRandomTool.textContent = 'Saved!';
      setTimeout(() => {
        saveRandomTool.textContent = 'Save to Favorites';
      }, 2000);
    } else {
      // Already saved
      saveRandomTool.textContent = 'Already Saved';
      setTimeout(() => {
        saveRandomTool.textContent = 'Save to Favorites';
      }, 2000);
    }
  });
}

// Window resize handler for stars
window.addEventListener('resize', () => {
  // Remove all stars and recreate them
  if (starsContainer) {
    starsContainer.innerHTML = '';
    createStars();
  }
});

// Language switcher for frontend courses/resources
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var enBtn = document.querySelector('.lang-btn[data-lang="en"]');
    var arBtn = document.querySelector('.lang-btn[data-lang="ar"]');
    var enList = document.getElementById('resources-en');
    var arList = document.getElementById('resources-ar');
    if (enBtn && arBtn && enList && arList) {
      enBtn.addEventListener('click', function() {
        enBtn.classList.add('active');
        arBtn.classList.remove('active');
        enList.style.display = '';
        arList.style.display = 'none';
      });
      arBtn.addEventListener('click', function() {
        arBtn.classList.add('active');
        enBtn.classList.remove('active');
        enList.style.display = 'none';
        arList.style.display = '';
      });
    }
  });
})();
