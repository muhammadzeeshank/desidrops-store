"use server";

import { ContactFormType } from "@/app/(client)/contact/page";

export async function sendContactForm(values: ContactFormType) {
  try {
    console.log("action contact form called: ", values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("message", values.message);
    formData.append("access_key", process.env.WEB3_FORMS_ACCESS_KEY ?? "");
    const object = Object.fromEntries(formData);

    console.log("object: ", object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(object),
    });

    const result = await response.json();

    console.log("result: ", result);

    return result;
  } catch (error) {
    console.error("Error sending contact form:", error);
    throw error;
  }
}
