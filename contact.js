class ContactManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.setupFormValidation()
  }

  setupEventListeners() {
    const contactForm = document.getElementById("contactForm")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => this.handleFormSubmit(e))
    }

    // Real-time validation
    const formInputs = document.querySelectorAll("#contactForm input, #contactForm textarea")
    formInputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input))
      input.addEventListener("input", () => this.clearFieldError(input))
    })
  }

  setupFormValidation() {
    // Add custom validation styles
    const style = document.createElement("style")
    style.textContent = `
      .form-group.error input,
      .form-group.error textarea {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
      
      .form-group.success input,
      .form-group.success textarea {
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
      }
      
      .error-message {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: none;
      }
      
      .form-group.error .error-message {
        display: block;
      }
    `
    document.head.appendChild(style)

    // Add error message elements
    const formGroups = document.querySelectorAll(".form-group")
    formGroups.forEach((group) => {
      const errorDiv = document.createElement("div")
      errorDiv.className = "error-message"
      group.appendChild(errorDiv)
    })
  }

  validateField(field) {
    const formGroup = field.closest(".form-group")
    const errorMessage = formGroup.querySelector(".error-message")
    let isValid = true
    let message = ""

    // Remove previous states
    formGroup.classList.remove("error", "success")

    // Validation rules
    switch (field.type) {
      case "text":
        if (field.value.trim().length < 2) {
          isValid = false
          message = "This field must be at least 2 characters long"
        }
        break

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(field.value)) {
          isValid = false
          message = "Please enter a valid email address"
        }
        break

      default:
        if (field.hasAttribute("required") && field.value.trim() === "") {
          isValid = false
          message = "This field is required"
        }
    }

    // Special validation for textarea
    if (field.tagName === "TEXTAREA" && field.value.trim().length < 10) {
      isValid = false
      message = "Message must be at least 10 characters long"
    }

    // Apply validation state
    if (isValid && field.value.trim() !== "") {
      formGroup.classList.add("success")
    } else if (!isValid) {
      formGroup.classList.add("error")
      errorMessage.textContent = message
    }

    return isValid
  }

  clearFieldError(field) {
    const formGroup = field.closest(".form-group")
    formGroup.classList.remove("error")
  }

  validateForm() {
    const form = document.getElementById("contactForm")
    const inputs = form.querySelectorAll("input[required], textarea[required]")
    let isFormValid = true

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isFormValid = false
      }
    })

    return isFormValid
  }

  async handleFormSubmit(event) {
    event.preventDefault()

    const submitBtn = document.querySelector(".submit-btn")
    const originalText = submitBtn.innerHTML

    // Validate form
    if (!this.validateForm()) {
      this.showNotification("Please fix the errors in the form", "error")
      return
    }

    // Show loading state
    submitBtn.disabled = true
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'

    try {
      // Get form data
      const formData = this.getFormData()

      // Simulate API call
      await this.submitContactForm(formData)

      // Show success message
      this.showNotification("Thank you! Your message has been sent successfully.", "success")

      // Reset form
      this.resetForm()
    } catch (error) {
      console.error("Error submitting form:", error)
      this.showNotification("Sorry, there was an error sending your message. Please try again.", "error")
    } finally {
      // Reset button
      submitBtn.disabled = false
      submitBtn.innerHTML = originalText
    }
  }

  getFormData() {
    const form = document.getElementById("contactForm")
    const formData = new FormData(form)
    const data = {}

    for (const [key, value] of formData.entries()) {
      data[key] = value
    }

    return data
  }

  async submitContactForm(data) {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real application, you would send this data to your backend
    console.log("Contact form data:", data)

    // Simulate potential error (uncomment to test error handling)
    // throw new Error('Simulated server error');

    return { success: true, message: "Form submitted successfully" }
  }

  resetForm() {
    const form = document.getElementById("contactForm")
    form.reset()

    // Clear validation states
    const formGroups = document.querySelectorAll(".form-group")
    formGroups.forEach((group) => {
      group.classList.remove("error", "success")
    })
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === "success" ? "check-circle" : type === "error" ? "exclamation-circle" : "info-circle"}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `

    // Add notification styles
    if (!document.querySelector("#notification-styles")) {
      const style = document.createElement("style")
      style.id = "notification-styles"
      style.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 10000;
          max-width: 400px;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          animation: slideInRight 0.3s ease-out;
        }
        
        .notification-success {
          background: #10b981;
          color: white;
        }
        
        .notification-error {
          background: #ef4444;
          color: white;
        }
        
        .notification-info {
          background: #3b82f6;
          color: white;
        }
        
        .notification-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .notification-close {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          margin-left: auto;
          padding: 0.25rem;
          border-radius: 0.25rem;
          transition: background-color 0.2s;
        }
        
        .notification-close:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `
      document.head.appendChild(style)
    }

    // Add to page
    document.body.appendChild(notification)

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove()
      }
    }, 5000)
  }

  // Method to populate contact info dynamically
  updateContactInfo(info) {
    const contactItems = document.querySelectorAll(".contact-item")
    if (info.email && contactItems[0]) {
      contactItems[0].querySelector("p").textContent = info.email
    }
    if (info.phone && contactItems[1]) {
      contactItems[1].querySelector("p").textContent = info.phone
    }
    if (info.address && contactItems[2]) {
      contactItems[2].querySelector("p").innerHTML = info.address
    }
  }
}

// Initialize Contact Manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.contactManager = new ContactManager()
})

// Export for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = ContactManager
}
