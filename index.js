document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    const mobileLinks = document.querySelectorAll(".mobile-nav-link");

    function updateActiveLink() {
        let currentId = "";

        sections.forEach(section => {
            const offset = section.offsetTop - 100; // Offset for fixed navbar
            if (window.scrollY >= offset) {
                currentId = section.id;
            }
        });

        function setActive(links) {
            links.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentId}`) {
                    link.classList.add("active");
                }
            });
        }

        setActive(navLinks);
        setActive(mobileLinks);
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink(); // Call once on page load
});
