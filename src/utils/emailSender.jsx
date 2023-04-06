import emailjs from "@emailjs/browser";

export function sendEmail(e, templateId) {
  emailjs.send("gmail", templateId, { ...e }, "V7YTcY8m8QorDcClb").then(
    (result) => {
      console.log(result.text);
    },
    (error) => {
      console.log(error.text);
    }
  );
}
