import emailjs from "@emailjs/browser";

export function sendEmail(e, templateId) {
  emailjs.send("gmail", templateId, { ...e }, "service_bq77glh").then(
    (result) => {
      console.log(result.text);
    },
    (error) => {
      console.log(error.text);
    }
  );
}
