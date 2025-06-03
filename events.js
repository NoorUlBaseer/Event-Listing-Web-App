class EventsManager {
  constructor() {
    this.sampleEvents = [
      {
        id: 1,
        name: "Musical Concert",
        date: "2025-06-10",
        time: "7:00 PM",
        location: "F9 Park, Islamabad",
        description:
          "Join us for an unforgettable evening of live music featuring top local bands. Enjoy food stalls and a vibrant atmosphere.",
        image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "Music",
      },
      {
        id: 2,
        name: "Eid Festival",
        date: "2025-06-07",
        time: "6:00 PM",
        location: "Packages Mall, Lahore",
        description:
          "Celebrate Eid with family and friends at our annual festival. Enjoy traditional food, games, and cultural performances.",
        image: "https://images.pexels.com/photos/3243027/pexels-photo-3243027.jpeg",
        category: "Festival",
      },
      {
        id: 3,
        name: "IT Park Launch",
        date: "2025-07-15",
        time: "9:00 AM",
        location: "Tech Valley, Islamabad",
        description:
          "Join us for the grand opening of the new IT Park. Explore innovation hubs, attend workshops, and network with industry leaders.",
        image: "https://images.pexels.com/photos/16323581/pexels-photo-16323581/free-photo-of-a-man-sitting-at-a-desk-with-two-monitors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "Technology",
      },
      {
        id: 4,
        name: "Art Exhibition",
        date: "2025-07-18",
        time: "8:00 PM",
        location: "National Art Gallery, Karachi",
        description: "Explore the latest contemporary art from local and international artists. Enjoy guided tours and meet the artists.",
        image: "https://images.pexels.com/photos/1671014/pexels-photo-1671014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "Art",
      },
      {
        id: 5,
        name: "Tech Conference 2025",
        date: "2025-08-04",
        time: "8:00 AM",
        location: "Lahore Expo Center",
        description: "Join industry leaders and innovators at the Tech Conference 2025. Attend keynote speeches, panel discussions, and networking events.",
        image: "https://images.pexels.com/photos/19012048/pexels-photo-19012048/free-photo-of-people-at-the-acer-stand-during-computer-expo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        category: "Technology",
      },
    ]

    this.filteredEvents = [...this.sampleEvents]
    this.searchTerm = ""
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.renderEvents()
    this.addImageLoadingEffect()
  }

  setupEventListeners() {
    const searchInput = document.getElementById("searchInput")
    const clearSearchBtn = document.getElementById("clearSearch")

    if (searchInput) {
      searchInput.addEventListener("input", (e) => this.handleSearch(e))
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener("click", () => this.clearSearch())
    }
  }

  handleSearch(event) {
    this.searchTerm = event.target.value.toLowerCase()
    this.filterEvents()
    this.renderEvents()
  }

  filterEvents() {
    this.filteredEvents = this.sampleEvents.filter(
      (event) =>
        event.name.toLowerCase().includes(this.searchTerm) ||
        event.location.toLowerCase().includes(this.searchTerm) ||
        event.category.toLowerCase().includes(this.searchTerm),
    )
  }

  clearSearch() {
    const searchInput = document.getElementById("searchInput")
    if (searchInput) {
      searchInput.value = ""
    }
    this.searchTerm = ""
    this.filteredEvents = [...this.sampleEvents]
    this.renderEvents()
  }

  formatDate(dateString) {
    const date = new Date(dateString)
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }

  createEventCard(event) {
    return `
      <div class="event-card" data-event-id="${event.id}">
        <div class="event-image" style="background-image: url('${event.image}'); background-size: cover; background-position: center;">
          ${!event.image ? "Event Image" : ""}
        </div>
        <div class="event-content">
          <h3 class="event-title">${event.name}</h3>
          
          <div class="event-details">
            <div class="event-detail">
              <i class="fas fa-calendar"></i>
              <span>${this.formatDate(event.date)} at ${event.time}</span>
            </div>
            <div class="event-detail">
              <i class="fas fa-map-marker-alt"></i>
              <span>${event.location}</span>
            </div>
            <div class="event-detail">
              <i class="fas fa-tag"></i>
              <span>${event.category}</span>
            </div>
          </div>
          
          <p class="event-description">${event.description}</p>
          
          <button class="register-btn" onclick="eventsManager.handleRegister(${event.id})">
            <i class="fas fa-users"></i>
            Register Now
          </button>
        </div>
      </div>
    `
  }

  renderEvents() {
    const eventsGrid = document.getElementById("eventsGrid")
    const noResults = document.getElementById("noResults")

    if (!eventsGrid || !noResults) return

    if (this.filteredEvents.length === 0) {
      eventsGrid.style.display = "none"
      noResults.classList.remove("hidden")
    } else {
      eventsGrid.style.display = "grid"
      noResults.classList.add("hidden")

      eventsGrid.innerHTML = this.filteredEvents.map((event) => this.createEventCard(event)).join("")

      // Re-apply animations to new cards
      this.animateEventCards()
    }
  }

  animateEventCards() {
    const eventCards = document.querySelectorAll(".event-card")
    eventCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`
      card.style.opacity = "0"
      card.style.transform = "translateY(20px)"

      setTimeout(() => {
        card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out"
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      }, index * 100)
    })
  }

  handleRegister(eventId) {
    const event = this.sampleEvents.find((e) => e.id === eventId)
    if (event) {
      // Show a more sophisticated registration modal or redirect
      this.showRegistrationModal(event)
    }
  }

  showRegistrationModal(event) {
    // Simple alert for now - could be replaced with a proper modal
    const message = `Thank you for your interest in "${event.name}"!\n\nEvent Details:\n• Date: ${this.formatDate(
      event.date,
    )} at ${event.time}\n• Location: ${event.location}\n• Category: ${event.category}\n\nRegistration functionality would be implemented here.`

    alert(message)
  }

  addImageLoadingEffect() {
    setTimeout(() => {
      const images = document.querySelectorAll(".event-image")
      images.forEach((img) => {
        img.style.transition = "opacity 0.3s ease-in-out"
        if (img.style.backgroundImage) {
          img.style.opacity = "1"
        }
      })
    }, 100)
  }

  // Method to add new event
  addEvent(eventData) {
    const newEvent = {
      id: this.sampleEvents.length + 1,
      ...eventData,
    }
    this.sampleEvents.push(newEvent)
    this.filterEvents()
    this.renderEvents()
  }

  // Method to get event by ID
  getEventById(id) {
    return this.sampleEvents.find((event) => event.id === id)
  }

  // Method to filter by category
  filterByCategory(category) {
    if (category === "all") {
      this.filteredEvents = [...this.sampleEvents]
    } else {
      this.filteredEvents = this.sampleEvents.filter((event) => event.category.toLowerCase() === category.toLowerCase())
    }
    this.renderEvents()
  }
}

// Initialize Events Manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.eventsManager = new EventsManager()
})

// Export for potential module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = EventsManager
}
