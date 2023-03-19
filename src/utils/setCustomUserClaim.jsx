const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.setCustomClaims = functions.https.onCall(async (data, context) => {
  try {
    const { uid, role } = data;

    await admin.auth().setCustomUserClaims(uid, { role });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message };
  }
});
