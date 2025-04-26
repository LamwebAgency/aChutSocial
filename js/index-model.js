import {
    getFirestore,
    collection,
    getDocs,
  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
  
  const db = getFirestore();
  const courseContainer = document.querySelector(".courses");
  const courseSelect = document.getElementById('courseSelect'); // <== your select box
  
  function createClockIcon() {
    const clock = document.createElement("div");
    clock.classList.add("css-clock");
  
    const hour = document.createElement("div");
    hour.classList.add("hand", "hour");
  
    const minute = document.createElement("div");
    minute.classList.add("hand", "minute");
  
    clock.appendChild(hour);
    clock.appendChild(minute);
  
    return clock;
  }
  
  function createCourseCard(course) {
    const card = document.createElement("div");
    card.classList.add("course-card");
    card.style.backgroundImage = `url(${course.mainImageLink})`;
  
    const number = document.createElement("div");
    number.classList.add("course-number");
    number.textContent = `#${course.ID}`;
  
    const title = document.createElement("div");
    title.classList.add("course-title");
    const words = course.CourseTitleBox.split(" ");
    title.innerHTML = `
      <span>${words[0] || ""}</span><br />
      <span class="highlight">${words[1] || ""}</span> ${words.slice(2).join(" ")}
    `;
  
    const action = document.createElement("div");
    action.classList.add("course-action");
  
    if (course.Feature === "started") {
      const button = document.createElement("a");
      button.classList.add("learn-more-button");
      button.textContent = "TÌM HIỂU";
      button.href = `course_dyna.html?id=${course.ID}`;
      action.appendChild(button);
    } else if (course.Feature === "pending") {
      const clock = createClockIcon();
      action.appendChild(clock);
    }
  
    card.appendChild(number);
    card.appendChild(title);
    card.appendChild(action);
  
    return card;
  }
  
  async function loadAllCourses() {
    try {
      const querySnapshot = await getDocs(collection(db, "Courses"));
      const seenIDs = new Set();
      const allCourses = [];
  
      querySnapshot.forEach((docSnap) => {
        const course = docSnap.data();
        if (!seenIDs.has(course.ID)) {
          seenIDs.add(course.ID);
          allCourses.push(course);
  
          // Also create <option> for select box
          if (courseSelect) {
            const option = document.createElement('option');
            option.value = course.CourseTitleBox;
            option.textContent = course.CourseTitleBox;
            courseSelect.appendChild(option);
          }
        }
      });
  
      // Dynamically set grid columns
      let columns = 2;
      if (allCourses.length % 3 === 0) {
        columns = 3;
      }
      courseContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  
      // Render the course cards
      allCourses.forEach((course) => {
        const card = createCourseCard(course);
        courseContainer.appendChild(card);
      });
  
    } catch (error) {
      console.error("❌ Error loading courses:", error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", loadAllCourses);
  

 