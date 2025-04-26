const courseItems = [
    {
      "title": "Introduction to Social Strategy",
      "content": [
        "Learn the foundations of digital presence.",
        "Understand your target audience and tone.",
        "Build confidence with beginner-friendly tools.",
        "Real-life examples and case studies included.",
        "No prior experience needed."
      ],
      "badge": 1
    },
    {
      "title": "Creating Compelling Content",
      "content": [
        "Explore engaging formats: video, carousel, memes.",
        "Write captions that convert and connect.",
        "Master visual hierarchy in storytelling.",
        "Tools to enhance creativity.",
        "Includes content planner template."
      ],
      "badge": 2
    },
    {
      "title": "Mastering Instagram Reels",
      "content": [
        "Step-by-step guide to shooting Reels.",
        "Trending sound hacks and timing tricks.",
        "Editing like a pro using free apps.",
        "Tips for maximizing reach and discovery.",
        "Reel templates included!"
      ],
      "badge": 3
    },
    {
      "title": "Engagement & Community Building",
      "content": [
        "How to reply with tone and style.",
        "DM strategies for lead nurturing.",
        "Boost comments through clever CTAs.",
        "Real engagement case studies.",
        "Build lasting connections online."
      ],
      "badge": 4
    },
    {
      "title": "Scheduling & Consistency",
      "content": [
        "Craft a 30-day content schedule.",
        "Batch your creation workflow.",
        "Free and paid tools to automate posts.",
        "Time-saving tips for busy creators.",
        "Stay consistent with less burnout."
      ],
      "badge": 5
    }
  ];
  
  console.log ('course.js loaded');
  const courseGrid = document.getElementById("courseGrid");

  courseItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("course-grid-card");

    const badge = document.createElement("div");
    badge.classList.add("course-grid-badge");
    badge.textContent = item.badge || index + 1;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const paragraphs = item.content.map(text => `<p>${text}</p>`).join("");

    card.innerHTML = `
      ${badge.outerHTML}
      ${title.outerHTML}
      ${paragraphs}
    `;

    courseGrid.appendChild(card);
  });