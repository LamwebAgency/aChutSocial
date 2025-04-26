let lastScrollY = window.scrollY;
const nav = document.getElementById("main-nav");

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY < 10 || currentScrollY < lastScrollY) {
    // Scrolling up or near top
    nav.classList.remove("nav-hidden");
  } else {
    // Scrolling down
    nav.classList.add("nav-hidden");
  }

  lastScrollY = currentScrollY;
});

// Optional: Show nav when hovering near the top
const hoverZone = document.createElement("div");
hoverZone.classList.add("nav-hover-zone");
document.body.appendChild(hoverZone);

hoverZone.addEventListener("mouseenter", () => {
  nav.classList.remove("nav-hidden");
});


window.addEventListener('DOMContentLoaded', () => {
  const logoContainers = document.querySelectorAll(".logo-container");
  const section = document.querySelector(".kh-parallax-section");

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const positions = [];

  // Step 1: Store final positions & set logos to center
  logoContainers.forEach(el => {
    const rect = el.getBoundingClientRect();
    const finalX = rect.left + rect.width / 2;
    const finalY = rect.top + rect.height / 2;
    const dx = finalX - centerX;
    const dy = finalY - centerY;

    positions.push({ dx, dy });

    gsap.set(el, {
      x: -dx,
      y: -dy
    });
  });

  // Step 2: Animate to final positions on scroll
  const triggerAnimation = () => {
    const sectionTop = section.offsetTop;
    const scrollY = window.scrollY + window.innerHeight;

    if (scrollY > sectionTop + 100) {
      gsap.to(".logo-container", {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: {
          amount: 1,
          grid: "auto",
          from: "center"
        }
      });

      window.removeEventListener("scroll", triggerAnimation);
    }
  };

  window.addEventListener("scroll", triggerAnimation);
});

// LOGO ANIMATED _________

window.addEventListener('DOMContentLoaded', () => {
    const logoContainers = document.querySelectorAll(".logo-container");
    const section = document.querySelector(".kh-parallax-section");
  
    // Wait for layout to stabilize before measuring positions
    setTimeout(() => {
      const sectionBox = section.getBoundingClientRect();
      const centerX = sectionBox.left + sectionBox.width / 2;
      const centerY = sectionBox.top + window.scrollY + sectionBox.height / 2;
  
      logoContainers.forEach(el => {
        const rect = el.getBoundingClientRect();
        const finalX = rect.left + rect.width / 2;
        const finalY = rect.top + window.scrollY + rect.height / 2;
        const dx = finalX - centerX;
        const dy = finalY - centerY;
  
        gsap.set(el, {
          x: -dx,
          y: -dy
        });
      });
  
      // Trigger animation on scroll
      const triggerAnimation = () => {
        const sectionTop = section.offsetTop;
        const scrollY = window.scrollY + window.innerHeight;
  
        if (scrollY > sectionTop + 100) {
          gsap.to(".logo-container", {
            x: 0,
            y: 0,
            duration: 1.5,
            delay: 1, // start 1 second after triggering
            ease: "power3.out",
            stagger: {
              amount: 1,
              grid: "auto",
              from: "center"
            }
          });
  
          window.removeEventListener("scroll", triggerAnimation);
        }
      };
  
      window.addEventListener("scroll", triggerAnimation);
    }, 50); // slight delay to ensure layout is stable
  });
