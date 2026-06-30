/* ==========================================================================
   HUXLEY MODERN REDESIGN LOGIC & INTERACTION (VANILLA JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Generate Starry Background
  initStarryBackground();
  
  // 2. Typing Effect for Hero Title
  initTypingEffect();
  
  // 3. Navigation Scrolling Effect & Mobile Menu
  initNavigation();
  
  // 4. Interactive Onboarding Steps Workflow
  initOnboardingTimeline();
  
  // 5. Contact Form Submission Handling
  initContactForm();
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
 * Creates a continuous loop typing different phrases in the hero title.
 */
function initTypingEffect() {
  const target = document.getElementById('typedText');
  if (!target) return;
  
  const phrases = [
    'Huxley?',
    'Modern Fundraising?',
    'Compliant Draws?',
    'Lower Rates?'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      target.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deletes faster
    } else {
      target.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Types slightly slower for premium feel
    }
    
    // If typing finished, pause before deletion
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing next word
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Start the typing animation loop
  setTimeout(type, 1000);
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
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formSuccessAlert');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const requirements = document.getElementById('form-message').value;
    
    // Format mailto body
    const emailTo = 'info@nubel.co.uk';
    const subject = encodeURIComponent('Huxley Platform Inquiry');
    const bodyContent = encodeURIComponent(
      `Huxley Platform Inquiry Request\n` +
      `==============================\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Inquiry / Requirements:\n` +
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
