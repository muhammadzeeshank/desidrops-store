const ReturnPage = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Return & Refund Policy</h1>
      <p>
        <strong>Last Updated:</strong> 01-July-2025
      </p>

      <div className="space-y-6 mt-4">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Overview</h2>
          <p>
            At <strong>DesiHome</strong>, we take pride in delivering
            high-quality organic products, especially our organic canola oil.
            Due to the perishable and consumable nature of our products, returns
            are only accepted under specific conditions mentioned below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            2. Non-Returnable Items
          </h2>
          <p>
            For health and hygiene reasons, we do{" "}
            <strong>not accept returns</strong> on:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Opened or used products</li>
            <li>
              Products with broken seals or damaged packaging (unless received
              in that condition)
            </li>
            <li>
              Perishable goods such as organic oils, unless they arrived damaged
              or defective
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Eligible Returns</h2>
          <p>You may request a return or replacement if:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>You received a wrong item</li>
            <li>The product was delivered damaged or leaking</li>
            <li>The packaging was tampered with at the time of delivery</li>
          </ul>
          <p>
            In such cases, please contact us within{" "}
            <strong>24 hours of delivery</strong> with supporting photos and
            your order number.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Refunds</h2>
          <p>Once your return is approved:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>You may choose between a replacement or a refund</li>
            <li>Refunds will be issued to your original payment method</li>
            <li>
              <strong>
                Shipping charges are non-refundable and will be deducted
              </strong>{" "}
              from the total refund amount
            </li>
            <li>Processing may take 5–7 business days after confirmation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            5. How to Request a Return
          </h2>
          <p>Please follow these steps:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>
              Contact our support team at <strong>+923080437969</strong>
              (WhatsApp only) within 24 hours
            </li>
            <li>
              Include your order number, issue details, and clear photos (if
              applicable)
            </li>
            <li>
              Wait for our team to review and respond within 1–2 business days
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Cancellation Policy</h2>
          <p>
            Orders can only be cancelled before they are shipped. Once
            dispatched, the order cannot be cancelled or refunded unless it
            meets the return criteria listed above.
          </p>
        </section>
      </div>
    </main>
  );
};

export default ReturnPage;
