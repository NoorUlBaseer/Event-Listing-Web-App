class HeroManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.initAnimations()
  }

  setupEventListeners() {
    // Mobile menu functionality
    const menuToggle = document.getElementById("menuToggle")
    const mobileMenu = document.getElementById("mobileMenu")

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", () => this.toggleMobileMenu())

      // Close mobile menu when clicking outside
      document.addEventListener("click", (event) => {
        if (!event.target.closest(".navbar")) {
          this.closeMobileMenu()
        }
      })
    }

    // Smooth scrolling for navigation links
    this.setupSmoothScrolling()
  }

  toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu")
    if (mobileMenu) {
      mobileMenu.classList.toggle("hidden")
    }
  }

  closeMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu")
    if (mobileMenu) {
      mobileMenu.classList.add("hidden")
    }
  }

  setupSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  initAnimations() {
    // Add intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running"
        }
      })
    }, observerOptions)

    // Observe hero elements
    const heroTitle = document.querySelector(".hero-title")
    const heroSubtitle = document.querySelector(".hero-subtitle")

    if (heroTitle) observer.observe(heroTitle)
    if (heroSubtitle) observer.observe(heroSubtitle)
  }

  // Method to update hero content dynamically
  updateHeroContent(title, subtitle) {
    const heroTitle = document.querySelector(".hero-title")
    const heroSubtitle = document.querySelector(".hero-subtitle")

    if (heroTitle) {
      heroTitle.textContent = title
    }
    if (heroSubtitle) {
      heroSubtitle.textContent = subtitle
    }
  }

  // Method to add custom hero background
  setHeroBackground(imageUrl) {
    const hero = document.querySelector(".hero")
    if (hero && imageUrl) {
      hero.style.backgroundImage = `linear-gradient(135deg, rgba(37, 99, 235, 0.8) 0%, rgba(124, 58, 237, 0.8) 100%), url('${imageUrl}')`
      hero.style.backgroundSize = "cover"
      hero.style.backgroundPosition = "center"
    }
  }
}

// Initialize Hero Manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.heroManager = new HeroManager()
})

// Export for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = HeroManager
}
