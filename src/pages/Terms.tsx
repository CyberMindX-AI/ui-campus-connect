import Layout from '@/components/Layout';

const Terms = () => (
  <Layout>
    <div className="container mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: July 1, 2025</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p className="mt-2">
            By accessing or using UI Marketplace ("Platform"), you agree to be bound by these Terms of Service. The Platform is exclusively available to verified University of Ibadan students, staff, and faculty with a valid @ui.edu.ng email address.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">2. User Accounts</h2>
          <p className="mt-2">
            You must register with a valid @ui.edu.ng email address. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must not share your login credentials with anyone.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">3. Buying & Selling</h2>
          <p className="mt-2">
            Sellers must provide accurate descriptions and images of their products. Prices must be listed in Nigerian Naira (₦). All payments are processed through Paystack with escrow protection. Funds are released to sellers only after the buyer confirms receipt. A 5% service fee applies to physical goods and 8% for digital products.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">4. Prohibited Items</h2>
          <p className="mt-2">
            The following items are strictly prohibited: illegal substances, weapons, stolen goods, counterfeit products, academic fraud materials (e.g., exam answers), and any items that violate university policies.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">5. Disputes & Refunds</h2>
          <p className="mt-2">
            Buyers may raise a dispute within 48 hours of purchase. Our team reviews all disputes and resolves them within 3–5 business days. Refunds are processed back to the original payment method.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">6. Privacy</h2>
          <p className="mt-2">
            We collect only necessary information to operate the Platform. Your @ui.edu.ng email is used for verification and communication. We do not share personal data with third parties except as required for payment processing (Paystack).
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">7. Community Guidelines</h2>
          <p className="mt-2">
            Users must maintain respectful communication. Harassment, discrimination, and abusive language are not tolerated. Violations may result in account suspension or permanent ban.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">8. Limitation of Liability</h2>
          <p className="mt-2">
            UI Marketplace acts as an intermediary between buyers and sellers. We are not responsible for the quality of products or services provided by sellers. We provide escrow protection to minimise risk for both parties.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">9. Contact</h2>
          <p className="mt-2">
            For questions about these terms, contact us at support@uimarketplace.ng or through the in-app support feature.
          </p>
        </section>
      </div>
    </div>
  </Layout>
);

export default Terms;
