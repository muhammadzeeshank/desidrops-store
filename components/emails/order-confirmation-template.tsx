import React from "react";

export interface EmailOrderProduct {
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface OrderConfirmationEmailTemplateProps {
  orderNumber: string;
  customerName: string;
  customerAddress: string;
  city: string;
  products: EmailOrderProduct[];
  subTotal: number;
  discountAmount: number;
  total: number;
}

export const OrderConfirmationTemplate: React.FC<OrderConfirmationEmailTemplateProps> = ({
  orderNumber,
  customerName,
  customerAddress,
  city,
  products,
  subTotal,
  discountAmount,
  total,
}) => (
  <div
    style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#0f172a",
      padding: "24px",
      maxWidth: "640px",
      margin: "auto",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
    }}
  >
    <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>
      🎉 Thank you for your order!
    </h1>
    <p style={{ fontSize: "16px", marginBottom: "16px" }}>
      Hi <strong>{customerName}</strong>,
      <br />
      We've received your order and it's being processed.
    </p>

    <div
      style={{
        backgroundColor: "#f8fafc",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "24px",
      }}
    >
      <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>
        🧾 Order Summary
      </h2>
      <p style={{ fontSize: "14px", marginBottom: "4px" }}>
        <strong>Order Number:</strong> {orderNumber}
      </p>

      <table
        width="100%"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          marginTop: "12px",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#e2e8f0", textAlign: "left" }}>
            <th style={{ padding: "8px" }}>Image</th>
            <th style={{ padding: "8px" }}>Product</th>
            <th style={{ padding: "8px" }}>Qty</th>
            <th style={{ textAlign: "right", padding: "8px" }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={index}
              style={{
                borderBottom: "1px solid #e5e7eb",
                backgroundColor: index % 2 === 0 ? "#fff" : "#f9fafb",
              }}
            >
              <td style={{ padding: "8px" }}>
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    width="48"
                    height="48"
                    style={{
                      borderRadius: "6px",
                      objectFit: "cover",
                      border: "1px solid #e2e8f0",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#e2e8f0",
                      borderRadius: "6px",
                    }}
                  />
                )}
              </td>
              <td style={{ padding: "8px" }}>{product.name}</td>
              <td style={{ padding: "8px" }}>{product.quantity}</td>
              <td style={{ textAlign: "right", padding: "8px" }}>
                PKR {(product.price * product.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          borderTop: "1px solid #e2e8f0",
          paddingTop: "12px",
          marginTop: "12px",
        }}
      >
        <p style={{ fontSize: "14px" }}>
          <strong>Subtotal:</strong> PKR {subTotal.toFixed(2)}
        </p>
        <p style={{ fontSize: "14px" }}>
          <strong>Discount:</strong> -PKR {discountAmount.toFixed(2)}
        </p>
        <p
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "8px",
          }}
        >
          Total: PKR {total.toFixed(2)}
        </p>
      </div>
    </div>

    <div
      style={{
        marginTop: "24px",
        fontSize: "14px",
        backgroundColor: "#f1f5f9",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ fontSize: "16px", marginBottom: "8px" }}>
        🚚 Shipping Information
      </h3>
      <p>
        <strong>Name:</strong> {customerName} <br />
        <strong>Address:</strong> {customerAddress} <br />
        <strong>City:</strong> {city}
      </p>
    </div>

    <p style={{ marginTop: "24px", fontSize: "14px" }}>
      📦 You’ll receive another email once your items are shipped.
    </p>

    <p
      style={{
        color: "#64748b",
        fontSize: "12px",
        marginTop: "32px",
        textAlign: "center",
      }}
    >
      If you have any questions, simply reply to this email.
    </p>
  </div>
);
