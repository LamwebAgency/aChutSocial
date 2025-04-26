import {
    getFirestore,
    collection,
    getDocs,
  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
  
  const db = getFirestore();
  const faqContainer = document.querySelector(".faq-container"); // Target your FAQ section
  
  function createFaqItem(faq) {
    const faqItem = document.createElement("div");
    faqItem.classList.add("faq-item");
  
    const faqQuestion = document.createElement("div");
    faqQuestion.classList.add("faq-question");
    faqQuestion.textContent = faq.question;
  
    const faqAnswer = document.createElement("div");
    faqAnswer.classList.add("faq-answer");
    faqAnswer.textContent = faq.answer;
  
    const faqIcon = document.createElement("div");
    faqIcon.classList.add("faq-icon");
    faqIcon.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  
    faqQuestion.appendChild(faqIcon);
    faqItem.appendChild(faqQuestion);
    faqItem.appendChild(faqAnswer);
  
    // Click toggle behavior
    faqQuestion.addEventListener("click", () => {
      faqItem.classList.toggle("active");
    });
  
    return faqItem;
  }
  
  async function loadAllFaqs() {
    try {
      const querySnapshot = await getDocs(collection(db, "faq"));
  
      querySnapshot.forEach((docSnap) => {
        const faq = docSnap.data();
        const faqElement = createFaqItem(faq);
        faqContainer.appendChild(faqElement);
      });
  
    } catch (error) {
      console.error("❌ Error loading FAQs:", error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", loadAllFaqs);
  
const items = document.querySelectorAll('.faq-item');

items.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    item.classList.toggle('active');
  });
});