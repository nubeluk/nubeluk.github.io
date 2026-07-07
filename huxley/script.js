/* ==========================================================================
   HUXLEY MODERN REDESIGN LOGIC & INTERACTION (VANILLA JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Generate Starry Background
  initStarryBackground();
  
  // 2. Navigation Scrolling Effect & Mobile Menu
  initNavigation();
  
  // 3. Interactive Onboarding Steps Workflow
  initOnboardingTimeline();
  
  // 4. Contact Form Submission Handling
  initContactForm();

  // 5. Parallax Scroll Effect for Hero Backdrop
  initHeroParallax();

  // 6. Hero Dashboard Cards Autoplay Carousel
  initHeroCardsCarousel();

  // 7. Interactive Cursor Glow Backdrop
  initHeroMouseGlow();

  // 8. Scroll Progress and Scroll-to-Top Button
  initScrollEffects();

  // 9. Intersection Observer Scroll Reveals
  initScrollReveals();
});

/**
 * Generates dynamic, absolute-positioned star elements in the background container.
 */
function initStarryBackground() {
  const container = document.getElementById('starsContainer');
  if (!container) return;
  
  const starCount = 60;
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random positions
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    // Random sizes (0.5px to 2.5px)
    const size = 0.5 + Math.random() * 2;
    
    // Random delays
    const delay = Math.random() * 5;
    
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${delay}s`;
    
    container.appendChild(star);
  }
}



/**
 * Manages navbar scroll backgrounds and responsive mobile toggle menu actions.
 */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  
  // Sticky scroll class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

/**
 * Implements step timeline and progress updates for the onboarding workflow.
 */
function initOnboardingTimeline() {
  const timelineProgress = document.getElementById('timelineProgress');
  const stepItems = document.querySelectorAll('.step-item');
  const stepContents = document.querySelectorAll('.step-content');
  const prevBtn = document.getElementById('prevStepBtn');
  const nextBtn = document.getElementById('nextStepBtn');
  
  if (stepItems.length === 0 || !timelineProgress) return;
  
  let currentStep = 1;
  const totalSteps = stepItems.length;
  
  function updateWorkflow(stepIndex) {
    currentStep = stepIndex;
    
    // Calculate progress line percentage
    // Step 1 = 0%, Step 2 = 33.3%, Step 3 = 66.6%, Step 4 = 100%
    const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;
    timelineProgress.style.width = `${percent}%`;
    
    // Update timeline bubbles
    stepItems.forEach(item => {
      const idx = parseInt(item.getAttribute('data-step'));
      if (idx === currentStep) {
        item.classList.add('active');
        item.classList.remove('completed');
      } else if (idx < currentStep) {
        item.classList.remove('active');
        item.classList.add('completed');
      } else {
        item.classList.remove('active');
        item.classList.remove('completed');
      }
    });
    
    // Update active content
    stepContents.forEach(content => {
      content.classList.remove('active');
    });
    const activeContent = document.getElementById(`step-${currentStep}`);
    if (activeContent) {
      activeContent.classList.add('active');
    }
    
    // Disable/Enable control buttons
    if (currentStep === 1) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }
    
    if (currentStep === totalSteps) {
      nextBtn.textContent = 'Finish Onboarding';
    } else {
      nextBtn.textContent = 'Next Step';
    }
  }
  
  // Click on bubbles directly
  stepItems.forEach(item => {
    item.addEventListener('click', () => {
      const stepVal = parseInt(item.getAttribute('data-step'));
      updateWorkflow(stepVal);
    });
  });
  
  // Control buttons
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < totalSteps) {
        updateWorkflow(currentStep + 1);
      } else {
        // Wrap back or highlight form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
    
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        updateWorkflow(currentStep - 1);
      }
    });
  }
}

/**
 * Handles the contact form submittals and triggers a mailto link with details.
 * Also hooks select-plan buttons to auto-populate the dropdown.
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formSuccessAlert');
  const planSelect = document.getElementById('form-plan');
  const planBtns = document.querySelectorAll('.select-plan-btn');
  
  // Listen for plan selections to auto-populate form
  planBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedPlan = btn.getAttribute('data-plan');
      if (planSelect && selectedPlan) {
        planSelect.value = selectedPlan;
      }
    });
  });
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const requirements = document.getElementById('form-message').value;
    const chosenPlan = planSelect ? planSelect.options[planSelect.selectedIndex].text : 'None selected';
    
    // Format mailto body
    const emailTo = 'info@nubel.co.uk';
    const subject = encodeURIComponent('Huxley Platform Enquiry');
    const bodyContent = encodeURIComponent(
      `Huxley Platform Enquiry Request\n` +
      `==============================\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Selected Plan: ${chosenPlan}\n\n` +
      `Enquiry / Requirements:\n` +
      `${requirements}\n` +
      `\n` +
      `Sent via Huxley Modern Platform Redesign Redirection.`
    );
    
    // Trigger opening of mail client
    const mailtoUrl = `mailto:${emailTo}?subject=${subject}&body=${bodyContent}`;
    window.location.href = mailtoUrl;
    
    // Show user-friendly success feedback
    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      // Auto-hide alert after 10 seconds
      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 10000);
    }
    
    // Reset Form
    form.reset();
  });
}

/**
 * Monitors window scrolls to update custom scroll offset property for parallax backdrops.
 */
function initHeroParallax() {
  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => {
      document.documentElement.style.setProperty('--scroll-offset', window.scrollY);
    });
  }, { passive: true });
}

/**
 * Automatically cycles the layout classes of the three hero dashboard cards.
 * Also pauses the rotation if the user hovers over the cards.
 */
function initHeroCardsCarousel() {
  const mockContainer = document.querySelector('.hero-dashboard-mock');
  if (!mockContainer) return;
  
  const cards = mockContainer.querySelectorAll('.dash-card');
  if (cards.length < 3) return;
  
  // Carousel states mapping
  let states = ['card-center', 'card-right', 'card-left'];
  let autoCycleInterval;
  
  function cycleCards() {
    states.unshift(states.pop());
    
    cards.forEach((card, index) => {
      card.classList.remove('card-center', 'card-left', 'card-right');
      card.classList.add(states[index]);
    });
  }
  
  function startAutoplay() {
    autoCycleInterval = setInterval(cycleCards, 4000);
  }
  
  function stopAutoplay() {
    clearInterval(autoCycleInterval);
  }
  
  mockContainer.addEventListener('mouseenter', stopAutoplay);
  mockContainer.addEventListener('mouseleave', startAutoplay);
  
  // Click support to manually slide a card to center
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (!card.classList.contains('card-center')) {
        stopAutoplay();
        
        while (states[index] !== 'card-center') {
          states.unshift(states.pop());
        }
        
        cards.forEach((c, idx) => {
          c.classList.remove('card-center', 'card-left', 'card-right');
          c.classList.add(states[idx]);
        });
        
        startAutoplay();
      }
    });
  });
  
  startAutoplay();
}

/**
 * Tracks cursor positions inside the hero section to update mouse-glow backdrop offsets.
 */
function initHeroMouseGlow() {
  const heroSection = document.getElementById('hero');
  const mouseGlow = document.getElementById('heroMouseGlow');
  
  if (!heroSection || !mouseGlow) return;
  
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseGlow.style.setProperty('--mouse-x', `${x}px`);
    mouseGlow.style.setProperty('--mouse-y', `${y}px`);
  }, { passive: true });
  
  heroSection.addEventListener('mouseleave', () => {
    mouseGlow.style.setProperty('--mouse-x', `-999px`);
    mouseGlow.style.setProperty('--mouse-y', `-999px`);
  }, { passive: true });
}

/**
 * Monitors page scrolls to update scroll progress bars and circular scroll-to-top button offsets.
 */
function initScrollEffects() {
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  const progressFill = document.querySelector('.progress-circle-fill');
  const circumference = 2 * Math.PI * 18; // ~113.1px
  
  if (!scrollProgressBar && !scrollToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    
    const scrollPercent = window.scrollY / scrollHeight;
    
    // 1. Update Top Progress Bar width
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent * 100}%`;
    }
    
    // 2. Show/Hide Scroll-to-Top circular button
    if (scrollToTopBtn) {
      if (window.scrollY > 400) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
      
      // 3. Update circular progress SVG fill
      if (progressFill) {
        const offset = circumference - (scrollPercent * circumference);
        progressFill.style.strokeDashoffset = offset;
      }
    }
  }, { passive: true });
  
  // Smooth scroll back to top on click
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/**
 * Connects IntersectionObserver to trigger smooth slide-up reveals on scroll-reveal elements.
 */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.scroll-reveal');
  if (reveals.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Reveal only once for performance
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -8% 0px', // Trigger slightly before element reaches viewport center
    threshold: 0.05
  });
  
  reveals.forEach(r => observer.observe(r));
}


