

// CAROUSEL______

const track = document.getElementById('carou-track');
  const items = document.querySelectorAll('.carou-item');
  const prevBtn = document.getElementById('carou-prev');
  const nextBtn = document.getElementById('carou-next');

  let currentIndex = 0;
  const visibleCount = 3;

  function updateCarousel() {
    const offset = currentIndex * (items[0].offsetWidth + 32); // 32px = gap (2rem)
    track.style.transform = `translateX(-${offset}px)`;

    // Update "active" class
    items.forEach((item, index) => {
      item.classList.remove('active');
      if (index === currentIndex + 1) {
        item.classList.add('active'); // middle item
      }
    });
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < items.length - visibleCount) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  // Initialize
  updateCarousel();

