import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
apiKey: "AIzaSyBEm_zsSjZfVcrYJVESFpUI8_7_yjPzQ_s",
authDomain: "achutsocial.firebaseapp.com",
projectId: "achutsocial",
storageBucket: "achutsocial.firebasestorage.app",
messagingSenderId: "250253286235",
appId: "1:250253286235:web:67a2e2373c66d66d28987e",
measurementId: "G-TBNK78F95E"
};

const app = initializeApp(firebaseConfig);
window.db = getFirestore(app);
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let videoEmbedUrl = ""; // Global variable to store embed URL

async function loadCourseById(id) {
  const courseId = String(id);
  const courseRef = doc(window.db, "Courses", courseId);
  const courseSnap = await getDoc(courseRef);

  if (courseSnap.exists()) {
    const course = courseSnap.data();
    videoEmbedUrl = course.videoLink;
    renderCourse(course);
  } else {
    console.error("❌ No course found with ID:", courseId);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (id) {
    loadCourseById(id);
  } else {
    console.warn("⚠️ No 'id' provided in URL. Example: ?id=1");
  }
});

function getEmbeddedYouTubeUrl(videoUrl) {
  try {
    const url = new URL(videoUrl);
    const videoId = url.searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch (e) {
    console.error("❌ Invalid YouTube URL:", videoUrl);
    return null;
  }
}

function renderCourse(course) {
  const setText = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  };

  const setHTML = (selector, value) => {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = value;
  };

  const setSrc = (selector, src) => {
    const el = document.querySelector(selector);
    if (el) el.src = src;
  };
  const setIframeSrc = (selector, src) => {
    const iframe = document.querySelector(selector);
    if (iframe) iframe.src = src;
  };
  
  setHTML(".course-title", insertLineBreakAfterSecondWord(course.CourseTitleBox));
  setText(".promo-discount", formatPrice(course.newPrice));
  setText(".promo-badge .old-price", formatPrice(course.oldPrice));
  setHTML(".promo-badge .title", insertLineBreakAfterSecondWord(course.CourseTitleBox));
  setHTML(".promo-content h1", course.headline);
  setText(".promo-content p", course.description);
  setSrc(".promo-image img", course.mainImageLink);
  setSrc("#videoThumbnail", course.mainImageLink);
  setText(".register-title", course.CourseTitleBox);
  setText(".old-price", formatPrice(course.oldPrice));
  setText(".discount-price", formatPrice(course.newPrice));
  console.log(course.videoLink);
  document.querySelector("#courseVideo").src = course.videoLink;

  

  // Set the videoEmbedUrl globally
  videoEmbedUrl = getEmbeddedYouTubeUrl(course.videoLink) || "";
  
  const metaRows = document.querySelectorAll(".meta-row .value");
  if (metaRows.length >= 2) {
    metaRows[0].textContent = course.duration;
    metaRows[1].textContent = course.audience;
  }

  if (course.cards && Array.isArray(course.cards)) {
    const courseGrid = document.getElementById("courseGrid");
    courseGrid.innerHTML = "";

    course.cards.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("course-grid-card");

      const badge = document.createElement("div");
      badge.classList.add("course-grid-badge");
      badge.textContent = index + 1;

      const title = document.createElement("h3");
      title.textContent = item.title;

      const paragraph = document.createElement("p");
      paragraph.textContent = item.content;

      card.innerHTML = `
        ${badge.outerHTML}
        ${title.outerHTML}
        ${paragraph.outerHTML}
      `;

      courseGrid.appendChild(card);
    });
  }
}

function formatPrice(price) {
  return parseInt(price).toLocaleString("vi-VN") + "VNĐ";
}

function insertLineBreakAfterSecondWord(text) {
  const words = text.trim().split(" ");
  if (words.length <= 2) return text;
  return `${words.slice(0, 2).join(" ")}<br>${words.slice(2).join(" ")}`;
}

