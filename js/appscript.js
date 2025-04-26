const FIREBASE_PROJECT_ID = "achutsocial";
const FIREBASE_COLLECTION = "Courses";
const FIREBASE_API_KEY = "AIzaSyBEm_zsSjZfVcrYJVESFpUI8_7_yjPzQ_s";
const SHEET_NAME = "Course_list";

function appendCoursesToFirestore() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const courseId = String(row[0]); // Column A = your document ID

    const cards = [];
    for (let c = 12; c < row.length; c += 2) {
      if (row[c] && row[c + 1]) {
        cards.push({ title: row[c], content: row[c + 1] });
      }
    }

    const payload = {
      fields: {
        ID: { integerValue: row[0] },
        courseTitle: { stringValue: row[1] },
        CourseTitleBox: { stringValue: row[2] },
        headline: { stringValue: row[3] },
        description: { stringValue: row[4] },
        oldPrice: { integerValue: row[5] },
        newPrice: { integerValue: row[6] },
        duration: { stringValue: row[7] },
        audience: { stringValue: row[8] },
        mainImageLink: { stringValue: row[9] },
        videoLink: { stringValue: row[10] },
        numberOfCards: { integerValue: row[11] },
        cards: {
          arrayValue: {
            values: cards.map(card => ({
              mapValue: {
                fields: {
                  title: { stringValue: card.title },
                  content: { stringValue: card.content }
                }
              }
            }))
          }
        }
      }
    };

    const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/${FIREBASE_COLLECTION}/${courseId}?key=${FIREBASE_API_KEY}`;
    const options = {
      method: "patch",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    try {
      const response = UrlFetchApp.fetch(url, options);
      const code = response.getResponseCode();
      Logger.log(`✔ Row ${i + 1} [ID ${courseId}]: ${code} - ${response.getContentText()}`);
    } catch (error) {
      Logger.log(`❌ Error syncing row ${i + 1} (ID ${courseId}): ${error}`);
    }
  }
}
