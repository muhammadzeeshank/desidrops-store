const PrivacyPage = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p>
        <strong>Last Updated:</strong> 01-July-2025
      </p>

      <div className="space-y-6 mt-4">
        <p>
          At <strong>DesiHome</strong>, we value and respect your privacy. This
          Privacy Policy outlines how we collect, use, disclose, and safeguard
          your information when you visit our website or use our services.
          <br />
          By accessing or using our services, you agree to the terms outlined in
          this policy.
        </p>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            1. Information Collection
          </h2>
          <p>
            We collect information you provide directly to us when using our
            services, as well as information about your use of our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. Use of Information</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Fulfill and manage orders</li>
            <li>Send order confirmations and updates</li>
            <li>Respond to customer service requests</li>
            <li>Improve our website and services</li>
            <li>Send marketing/promotional messages (if you opt-in)</li>
            <li>Ensure security and integrity of our platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Information Sharing</h2>
          <p>
            We <strong>do not sell or rent</strong> your personal information.
            We may share data with:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Service providers</strong> (e.g., payment gateways,
              shipping partners)
            </li>
            <li>
              <strong>Analytics tools</strong> (e.g., Google Analytics)
            </li>
            <li>
              <strong>Legal authorities</strong>, when required by law
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p>
            We use appropriate security measures to protect your data. However,
            no system is completely secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Access the personal data we hold</li>
            <li>Request corrections or deletions</li>
            <li>Opt-out of marketing emails</li>
            <li>Withdraw your consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Children&apos;s Privacy</h2>
          <p>
            Our services are not intended for children under 13, and we do not
            knowingly collect data from them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy occasionally. Updates will be
            posted here with a new effective date.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPage;
