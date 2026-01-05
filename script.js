/* ========================================
   ROBOMIRACLE - ENHANCED JAVASCRIPT
   Modern animations, interactions & optimizations
   ======================================== */

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for performance optimization
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// ========================================
// FLOATING PARTICLES - ENHANCED
// ========================================

function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = window.innerWidth < 768 ? 20 : 40; // Responsive count
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 3px and 12px
    const size = Math.random() * 9 + 3;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random animation properties
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    const moveX = (Math.random() - 0.5) * 200;
    const opacity = Math.random() * 0.5 + 0.3;
    
    particle.style.setProperty('--duration', `${duration}s`);
    particle.style.setProperty('--delay', `${delay}s`);
    particle.style.setProperty('--move-x', `${moveX}px`);
    particle.style.setProperty('--opacity', opacity);
    particle.style.animationDelay = `${delay}s`;
    
    // Random colors from gradient palette
    const colors = [
      'rgba(102, 126, 234, 0.8)',
      'rgba(118, 75, 162, 0.8)',
      'rgba(240, 147, 251, 0.8)',
      'rgba(67, 233, 123, 0.8)',
      'rgba(79, 172, 254, 0.8)'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = `radial-gradient(circle, ${randomColor}, transparent)`;
    
    particlesContainer.appendChild(particle);
  }
}

// ========================================
// LOADING ANIMATION - ENHANCED
// ========================================

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  
  // Add exit animation
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      loader.style.display = 'none';
      
      // Trigger entrance animations
      document.body.classList.add('loaded');
      animateOnScroll(); // Initial check
    }, 500);
  }, 1000);
});

// ========================================
// INITIALIZE ON DOM LOAD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initializeHeader();
  initializeHeroSlider();
  initializeModalSystem();
  initializeScrollAnimations();
  initializeFormHandling();
  renderLogos();
  initializeSmoothScroll();
});

// ========================================
// HEADER / NAVBAR - ENHANCED
// ========================================

function initializeHeader() {
  const header = document.querySelector('header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
  
  // Scroll effect for header
  let lastScroll = 0;
  const headerScroll = throttle(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      header.classList.remove('scrolled');
      return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
      header.classList.add('scrolled');
    }
    
    lastScroll = currentScroll;
  }, 100);
  
  window.addEventListener('scroll', headerScroll);
  
  // Mobile menu toggle
  const toggleMobileMenu = (show) => {
    if (show) {
      mobileNav.classList.add('active');
      mobileMenuBtn.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Animate menu items
      mobileLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          link.style.transition = 'all 0.3s ease';
          link.style.opacity = '1';
          link.style.transform = 'translateX(0)';
        }, index * 100);
      });
    } else {
      mobileNav.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      document.body.style.overflow = '';
    }
  };
  
  mobileMenuBtn.addEventListener('click', () => {
    const isActive = mobileNav.classList.contains('active');
    toggleMobileMenu(!isActive);
  });
  
  mobileNavClose.addEventListener('click', () => toggleMobileMenu(false));
  
  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(false);
    });
  });
  
  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      if (mobileNav.classList.contains('active')) {
        toggleMobileMenu(false);
      }
    }
  });
}

// ========================================
// SMOOTH SCROLL FOR NAVIGATION
// ========================================

function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================
// HERO SLIDER - ENHANCED
// ========================================

function initializeHeroSlider() {
  const slides = [
    {
      image: "images/h1.jpg",
      chip: "FLAGSHIP SERIES X1",
      title: "AUTOMATING<br>THE FUTURE",
      text: "High‑precision robots engineered for 24/7 production floors."
    },
    {
      image: "images/h2.png",
      chip: "COLLABORATIVE LINE",
      title: "SAFER<br>COBOT TEAMS",
      text: "Human‑friendly robotics that work side‑by‑side with your crew."
    },
    {
      image: "images/h3.jpg",
      chip: "VISION SYSTEMS",
      title: "AI‑POWERED<br>INSPECTION",
      text: "Computer‑vision pipelines that detect every defect in milliseconds."
    },
    {
      image: "images/h4.png",
      chip: "WAREHOUSE STACK",
      title: "AUTONOMOUS<br>LOGISTICS",
      text: "Smart movers that store, pick and route inventory automatically."
    },
    {
      image: "images/h5.jpg",
      chip: "FIELD OPS",
      title: "RUGGED<br>FIELD ROBOTICS",
      text: "Outdoor‑ready platforms built for harsh, real‑world conditions."
    }
  ];

  const hero = document.querySelector('.hero');
  const chipEl = document.getElementById('hero-chip');
  const titleEl = document.getElementById('hero-title');
  const textEl = document.getElementById('hero-text');
  const buttons = document.querySelectorAll('.switch-btn');

  let currentIndex = 0;
  let autoplayInterval;
  let isTransitioning = false;

  function showSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    const slide = slides[index];

    // Fade out content
    chipEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    titleEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    textEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    chipEl.style.opacity = '0';
    chipEl.style.transform = 'translateY(-20px)';
    titleEl.style.opacity = '0';
    titleEl.style.transform = 'translateY(-20px)';
    textEl.style.opacity = '0';
    textEl.style.transform = 'translateY(-20px)';

    setTimeout(() => {
      // Update background with smooth transition
      hero.style.transition = 'background-image 0.5s ease';
      hero.style.backgroundImage = `linear-gradient(135deg, rgba(10, 14, 39, 0.7), rgba(30, 41, 82, 0.6)), url("${slide.image}")`;
      hero.style.backgroundSize = 'cover';
      hero.style.backgroundPosition = 'center';
      
      // Update content
      chipEl.textContent = slide.chip;
      titleEl.innerHTML = slide.title;
      textEl.textContent = slide.text;

      // Fade in content
      setTimeout(() => {
        chipEl.style.opacity = '1';
        chipEl.style.transform = 'translateY(0)';
        titleEl.style.opacity = '1';
        titleEl.style.transform = 'translateY(0)';
        textEl.style.opacity = '1';
        textEl.style.transform = 'translateY(0)';
        
        isTransitioning = false;
      }, 50);
    }, 300);

    // Update active button with animation
    buttons.forEach((btn, i) => {
      btn.classList.remove('active');
      if (i === index) {
        btn.classList.add('active');
        btn.style.animation = 'pulse 0.5s ease';
        setTimeout(() => btn.style.animation = '', 500);
      }
    });

    currentIndex = index;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000); // Increased to 5 seconds
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  // Initialize first slide
  showSlide(0);
  startAutoplay();

  // Manual controls
  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (!isTransitioning) {
        showSlide(index);
        resetAutoplay();
      }
    });
  });

  // Pause on hover (better UX)
  hero.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });

  hero.addEventListener('mouseleave', () => {
    startAutoplay();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (hero.getBoundingClientRect().top < window.innerHeight && hero.getBoundingClientRect().bottom > 0) {
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
        resetAutoplay();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoplay();
      }
    }
  });
}

// ========================================
// CLIENT LOGOS MARQUEE
// ========================================

function renderLogos() {
  const logos = [
    'images/p1.png', 'images/p2.png', 'images/p3.png', 'images/p4.png',
    'images/p5.png', 'images/p6.png', 'images/p7.png', 'images/p8.png',
    'images/p9.png', 'images/p10.png', 'images/p11.png', 'images/p12.png',
    'images/p13.png', 'images/p14.png', 'images/p15.png', 'images/p16.png'
  ];

  // Triple for seamless loop
  const allLogos = [...logos, ...logos, ...logos];
  const track = document.getElementById('clientsTrack');
  
  if (!track) return;

  allLogos.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Client ${(idx % logos.length) + 1}`;
    img.className = 'client-logo';
    img.loading = 'lazy'; // Performance optimization
    
    // Add hover animation
    img.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
      track.style.animationPlayState = 'paused';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
      track.style.animationPlayState = 'running';
    });
    
    track.appendChild(img);
  });
}

// ========================================
// MODAL SYSTEM - ENHANCED
// ========================================

function initializeModalSystem() {
  const robots = {
    1: {
      name: "Intelligent Humanoid Robot - Nila",
      description: "The Intelligent Reception & Interaction Robot.",
      image: "images/robot1.png",
      video: "mp4/robot1.mp4",
      status: "Active",
      version: "v2.0",
      duration: "2:45",
      specs: {
        "Model ID": "nila 2.0",
        "Height": "approximately 4.5 ft",
        "Weight": "around 40–55 kg",
        "Power Supply": "24 V, 25 Ah"
      },
      docs: [
        { title: "Nila Manual", sub: "PDF • 2.1 MB", url: "pdf/robot1.pdf" }
      ],
      features: [
        { title: "Mobile App Control", desc: "Control all robot motions via Wi‑Fi AP mode." },
        { title: "Remote Control", desc: "6‑channel control up to 1000m range." },
        { title: "Obstacle Detection", desc: "30cm detection radius for safe operation." },
        { title: "Multilingual", desc: "English, Hindi, Tamil, Malayalam support." }
      ]
    },
    2: {
      name: "Service Dinebot",
      description: "Smart autonomous delivery robot for restaurants.",
      image: "images/robot2.png",
      video: "mp4/robot2.mp4",
      status: "Online",
      version: "v1.8",
      duration: "3:10",
      specs: {
        "Model ID": "SVC-210",
        "Battery": "24V, 25Ah lithium",
        "Height": "4.5 ft",
        "Capacity": "30 kg"
      },
      docs: [
        { title: "Dinebot Guide", sub: "PDF • 1.3 MB", url: "pdf/robot2.pdf" }
      ],
      features: [
        { title: "Autonomous Service", desc: "Precise food delivery with minimal error." },
        { title: "High Capacity", desc: "Supports up to 30 kg per trip." },
        { title: "Long Battery", desc: "10 hours continuous operation." },
        { title: "Smart Navigation", desc: "Advanced obstacle avoidance system." }
      ]
    },
    3: {
      name: "Dog Robot Go2 Air",
      description: "Ultra-wide 4D LIDAR recognition system.",
      image: "images/robot3.png",
      video: "mp4/robot3.mp4",
      status: "Certified",
      version: "v4.0",
      duration: "5:00",
      specs: {
        "Scanning": "360°×90°",
        "Anti-highlight": "100Klux",
        "Blind Spot": "0.05m",
        "Frequency": "43200 points/s"
      },
      docs: [
        { title: "Go2 Air Manual", sub: "PDF • 950 KB", url: "pdf/robot3.pdf" }
      ],
      features: [
        { title: "4D LiDAR L1", desc: "360° ultra-wide scanning with small blind spot." },
        { title: "12 Motors", desc: "Strong knee joint motors for stability." },
        { title: "Tracking Module", desc: "Remote or automatic tracking modes." },
        { title: "Intercom", desc: "Built-in microphone for communication." }
      ]
    },
    4: {
      name: "Dog Robot Go2 Pro",
      description: "Professional logistics and inventory robot.",
      image: "images/robot4.png",
      video: "mp4/robot3.mp4",
      status: "Deployed",
      version: "v2.5",
      duration: "1:55",
      specs: {
        "Load Capacity": "500 kg",
        "Speed": "2 m/s",
        "Runtime": "16 hours"
      },
      docs: [
        { title: "Go2 Pro Guide", sub: "PDF • 950 KB", url: "pdf/robot4.pdf" }
      ],
      features: [
        { title: "Mobile Control", desc: "Wi‑Fi AP mode smartphone control." },
        { title: "Long Range", desc: "6‑channel remote up to 1000m." },
        { title: "Safety Sensors", desc: "30cm obstacle detection." },
        { title: "Foot Sensors", desc: "Real-time foot force perception." }
      ]
    },
    5: {
      name: "Unitree G1 Humanoid",
      description: "Next-gen AI-driven humanoid robot.",
      image: "images/robot5.png",
      video: "mp4/robot9.mp4",
      status: "Pilot",
      version: "v1.2",
      duration: "2:05",
      specs: {
        "Weight": "35 kg",
        "Height": "130cm",
        "DOF": "43 pieces",
        "Torque": "120 N.m",
        "Battery": "2 hours"
      },
      docs: [
        { title: "G1 Manual", sub: "PDF • 1.9 MB", url: "pdf/robot5.pdf" }
      ],
      features: [
        { title: "App Control", desc: "Full smartphone integration." },
        { title: "Advanced AI", desc: "Machine learning movement." },
        { title: "Safety System", desc: "Multi-sensor obstacle avoidance." },
        { title: "Natural Motion", desc: "Human-like movement patterns." }
      ]
    },
    6: {
      name: "Nexus A1 Humanoid",
      description: "Autonomous wheeled education robot.",
      image: "images/robot6.png",
      video: "mp4/robot6.mp4",
      status: "Field Tested",
      version: "v2.1",
      duration: "3:30",
      specs: {
        "Weight": "50 kg",
        "Height": "5.2ft",
        "Battery": "37V, 10Ah",
        "Gyroscope": "Single-axis yaw"
      },
      docs: [
        { title: "Nexus Guide", sub: "PDF • 1.4 MB", url: "pdf/robot6.pdf" }
      ],
      features: [
        { title: "Mobile Control", desc: "Wi‑Fi smartphone interface." },
        { title: "Human Motion", desc: "8+ DOF natural gestures." },
        { title: "Smart Navigation", desc: "Obstacle detection 30cm." },
        { title: "Auto Tour", desc: "Predefined guest guidance." }
      ]
    },
    7: {
      name: "Front Office Humanoid",
      description: "Reception and visitor greeting robot.",
      image: "images/robot7.png",
      video: "mp4/robot9.mp4",
      status: "Live",
      version: "v3.0",
      duration: "2:25",
      specs: {
        "Patrol Time": "24 hours",
        "Cameras": "360° view",
        "Height": "5.2ft",
        "Battery": "37V, 10Ah"
      },
      docs: [
        { title: "Reception Bot", sub: "PDF • 900 KB", url: "pdf/robot7.pdf" }
      ],
      features: [
        { title: "Safety Sensors", desc: "30cm crowd detection." },
        { title: "Auto Navigation", desc: "Tour mode with waypoints." },
        { title: "Smart Detection", desc: "Advanced obstacle avoidance." },
        { title: "Multilingual", desc: "Multiple language support." }
      ]
    },
    8: {
      name: "Robert Dancing Robot",
      description: "Fun educational dancing robot speaker.",
      image: "images/robot8.png",
      video: "mp4/robot8.mp4",
      status: "Beta",
      version: "v0.9",
      duration: "4:00",
      specs: {
        "Age Range": "4+ years",
        "Dimensions": "20×12×9 cm",
        "Speaker": "3Ω / 5W",
        "Battery": "3.7V / 1800mAh"
      },
      docs: [
        { title: "Robert Guide", sub: "PDF • 5.2 MB", url: "pdf/robot8.pdf" }
      ],
      features: [
        { title: "App Control", desc: "Smartphone motion control." },
        { title: "Dance Moves", desc: "Rhythm-based expressive movements." },
        { title: "Bluetooth Audio", desc: "Wireless music playback." },
        { title: "Educational", desc: "Learning through play." }
      ]
    },
    9: {
      name: "Aurra Humanoid",
      description: "Advanced intelligent humanoid platform.",
      image: "images/robot9.png",
      video: "mp4/robot9.mp4",
      status: "Deployed",
      version: "v2.0",
      duration: "1:40",
      specs: {
        "Charger": "29.4V / 5A",
        "Runtime": "4 hours",
        "Remote": "2.4 GHz"
      },
      docs: [
        { title: "Aurra Manual", sub: "PDF • 1.2 MB", url: "pdf/robot9.pdf" }
      ],
      features: [
        { title: "Wi‑Fi Control", desc: "AP mode smartphone integration." },
        { title: "Web Camera", desc: "Crystal Pro with night vision." },
        { title: "Safety System", desc: "30cm obstacle detection." },
        { title: "Voice System", desc: "Multi-language support." }
      ]
    }
  };

  const modal = document.getElementById('robotModal');
  const modalOverlay = modal.querySelector('.modal-overlay');
  const modalClose = document.getElementById('modalClose');
  const modalName = document.getElementById('modalName');
  const modalDesc = document.getElementById('modalDesc');
  const modalStatus = document.getElementById('modalStatus');
  const modalVersion = document.getElementById('modalVersion');
  const modalImage = document.getElementById('modalImage');
  const modalDuration = document.getElementById('modalDuration');
  const modalSpecs = document.getElementById('modalSpecs');
  const modalDocs = document.getElementById('modalDocs');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalVideo = document.getElementById('modalVideo');
  const modalVideoSource = document.getElementById('modalVideoSource');

  function openRobotModal(id) {
    const r = robots[id];
    if (!r) return;

    // Populate modal content
    modalName.textContent = r.name;
    modalDesc.textContent = r.description;
    modalStatus.textContent = r.status || 'Active';
    modalVersion.textContent = r.version;
    modalDuration.textContent = r.duration;
    modalImage.src = r.image;
    modalImage.alt = r.name;

    // Video setup
    modalVideo.pause();
    modalVideoSource.src = r.video;
    modalVideo.load();

    // Specifications
    modalSpecs.innerHTML = '';
    Object.entries(r.specs).forEach(([label, value]) => {
      const dt = document.createElement('dt');
      dt.textContent = label;
      const dd = document.createElement('dd');
      dd.textContent = value;
      modalSpecs.appendChild(dt);
      modalSpecs.appendChild(dd);
    });

    // Documents
    modalDocs.innerHTML = '';
    r.docs.forEach(doc => {
      const docCard = document.createElement('div');
      docCard.className = 'doc-item';
      docCard.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">📄</div>
        <div style="font-weight: 600; margin-bottom: 0.3rem;">${doc.title}</div>
        <div style="font-size: 0.85rem; color: var(--text-muted);">${doc.sub}</div>
      `;
      docCard.onclick = () => window.open(doc.url, '_blank');
      modalDocs.appendChild(docCard);
    });

    // Features
    modalFeatures.innerHTML = '';
    r.features.forEach(f => {
      const featureCard = document.createElement('div');
      featureCard.className = 'feature-item';
      featureCard.innerHTML = `
        <div style="font-weight: 700; margin-bottom: 0.5rem; color: #667eea;">${f.title}</div>
        <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">${f.desc}</div>
      `;
      modalFeatures.appendChild(featureCard);
    });

    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animate modal content
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'modalSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
  }

  function closeRobotModal() {
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'modalSlideOut 0.3s ease-out';
    
    setTimeout(() => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      modalVideo.pause();
      modalVideo.currentTime = 0;
    }, 300);
  }

  // Bind click events to view buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const card = e.currentTarget.closest('.card');
      const id = card.getAttribute('data-id');
      openRobotModal(id);
    });
  });

  // Close events
  modalClose.addEventListener('click', closeRobotModal);
  modalOverlay.addEventListener('click', closeRobotModal);
  
  // ESC key to close
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeRobotModal();
    }
  });
  
  // Add slide-out animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes modalSlideOut {
      from {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      to {
        opacity: 0;
        transform: translateY(-30px) scale(0.95);
      }
    }
  `;
  document.head.appendChild(style);
}

// ========================================
// SCROLL ANIMATIONS - ENHANCED
// ========================================

function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Card stagger animation
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
}

// Fallback for browsers without IntersectionObserver
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
};

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

const scrollToTopBtn = document.getElementById('scrollToTop');

const handleScrollButton = throttle(() => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
}, 100);

window.addEventListener('scroll', handleScrollButton);

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========================================
// FORM HANDLING - ENHANCED
// ========================================

function initializeFormHandling() {
  const form = document.getElementById('robotInquiryForm');
  const submitBtn = form.querySelector('.submit-btn');
  const formMessage = document.getElementById('formMessage');
  
  // Real-time validation
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
    
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });
  
  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    if (field.hasAttribute('required') && !value) {
      isValid = false;
    }
    
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
    }
    
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[0-9]{10}$/;
      isValid = phoneRegex.test(value.replace(/\D/g, ''));
    }
    
    if (isValid) {
      field.classList.remove('error');
      field.style.borderColor = 'rgba(102, 126, 234, 0.2)';
    } else {
      field.classList.add('error');
      field.style.borderColor = '#f5576c';
    }
    
    return isValid;
  }
  
  // Form submission
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate all fields
    let isFormValid = true;
    inputs.forEach(input => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });
    
    if (!isFormValid) {
      formMessage.className = 'form-message error';
      formMessage.textContent = 'Please fill all required fields correctly.';
      formMessage.style.display = 'block';
      return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite;">⏳</span> Submitting...';
    formMessage.style.display = 'none';
    
    const formData = new FormData(this);
    
    // Replace with your Google Apps Script URL
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbyEWsN4eBAREe3VP7D1_mBNvixsALaZtZ2Ge_dqqK-t-7LhVi7idEixQiua1RTXOkFJHA/exec';
    
    try {
      const response = await fetch(webAppUrl, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      // Success animation
      formMessage.className = 'form-message success';
      formMessage.textContent = '✓ ' + (data.message || 'Thank you! We will contact you soon.');
      formMessage.style.display = 'block';
      formMessage.style.animation = 'slideInUp 0.5s ease';
      
      // Reset form
      this.reset();
      
      // Confetti effect (optional)
      createConfetti();
      
    } catch (error) {
      formMessage.className = 'form-message error';
      formMessage.textContent = '✗ An error occurred. Please try again or call us directly.';
      formMessage.style.display = 'block';
      console.error('Error:', error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Inquiry';
    }
  });
}

// ========================================
// CONFETTI EFFECT (OPTIONAL)
// ========================================

function createConfetti() {
  const colors = ['#667eea', '#764ba2', '#f093fb', '#43e97b', '#4facfe'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.opacity = '1';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '10000';
    confetti.style.borderRadius = '50%';
    
    document.body.appendChild(confetti);
    
    const fall = confetti.animate([
      { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
      { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
      duration: Math.random() * 2000 + 1000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    fall.onfinish = () => confetti.remove();
  }
}

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// Preload critical assets
const preloadAssets = [
  'images/h1.jpg',
  'images/logo.png'
];

preloadAssets.forEach(asset => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = asset.endsWith('.jpg') || asset.endsWith('.png') ? 'image' : 'fetch';
  link.href = asset;
  document.head.appendChild(link);
});

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c🤖 ROBOMIRACLE Technologies', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cWelcome to the future of robotics!', 'font-size: 14px; color: #43e97b;');
console.log('%cBuilt with ❤️ and modern web technologies', 'font-size: 12px; color: #f093fb;');
