import {
  OrderConfirmationEmailTemplateProps,
  OrderConfirmationTemplate,
} from "@/components/emails/order-confirmation-template";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderConfirmationEmail = async (
  email: string,
  orderInfo: OrderConfirmationEmailTemplateProps
) => {
  try {
    console.log("sending email");
    const { data, error } = await resend.emails.send({
      from: "DesiHome <no-reply@desihome.pk>",
      to: [email],
      subject: `${orderInfo.customerName}, Your Order Has Been Confirmed`,
      react: React.createElement(OrderConfirmationTemplate, orderInfo),
    });

    if (error) {
      console.log("email error: ", error);

      return Response.json({ error }, { status: 500 });
    }
    console.log("email success: ", data);

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
