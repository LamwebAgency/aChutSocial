function runSyncCourses() {
  fetch('https://script.google.com/macros/s/AKfycbyOCVAgIfZiNRgmo2caJEoQJ2M9wEoLU8iPo-TtASSkt7CVbhBITHZgNoBUKS-cZKAv/exec', { mode: 'no-cors' })
    .then(() => alert('✅ Sync request sent (no-cors mode)!'))
    .catch(error => alert("Error syncing Courses: " + error));
}

function runSyncFAQ() {
  fetch('https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec?action=syncFAQ', { mode: 'no-cors' })
    .then(() => alert('✅ Sync request sent (no-cors mode)!'))
    .catch(error => alert("Error syncing FAQs: " + error));
}
