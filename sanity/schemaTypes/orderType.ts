import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clerkUserId",
      title: "Store User ID",
      readOnly: true,
      type: "string",
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Customer Phone",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Customer Address",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "Customer City",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "postalCode",
      title: "Customer Postal Code",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      readOnly: true,
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product Bought",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Quantity Purchased",
              type: "number",
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              quantity: "quantity",
              image: "product.image",
              price: "product.price",
              currency: "product.currency",
            },
            prepare(select) {
              return {
                title: `${select.product} x ${select.quantity}`,
                subtitle: `${select.price * select.quantity}`,
                media: select.image,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "subTotal",
      title: "Subtotal (Before Any Discounts)",
      type: "number",
      readOnly: true,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "standardDiscount",
      title: "Standard Discount Amount (Site/Product Discount)",
      type: "number",
      readOnly: true,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "couponDiscount",
      title: "Coupon Discount Amount",
      type: "number",
      readOnly: true,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "totalDiscount",
      readOnly: true,
      title: "Total Discount Amount",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      description: "Calculated as standardDiscount + couponDiscount",
    }),
    defineField({
      name: "totalPrice",
      title: "Final Total Price (After All Discounts)",
      type: "number",
      readOnly: true,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          {
            title: "Pending",
            value: "pending",
          },
          {
            title: "Paid",
            value: "paid",
          },
          {
            title: "Shipped",
            value: "shipped",
          },
          {
            title: "Delivered",
            value: "delivered",
          },
          {
            title: "Cancelled",
            value: "cancelled",
          },
        ],
      },
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      currency: "currency",
      orderId: "orderNumber",
      email: "email",
    },
    prepare(select) {
      const orderIdSnippet = `${select.orderId.slice(0, 5)}...${select.orderId.slice(-5)}`;
      return {
        title: `${select.name} (${orderIdSnippet})`,
        subtitle: `${select.amount} ${select.currency}, ${select.email}`,
        media: BasketIcon,
      };
    },
  },
});
