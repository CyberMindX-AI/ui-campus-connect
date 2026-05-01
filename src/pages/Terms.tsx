import Layout from '@/components/Layout';
import { FileText, ShieldCheck, Users, AlertTriangle, DollarSign, Scale, MessageCircle, Star } from 'lucide-react';

const Terms = () => (
  <Layout>
    <div className="container mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FileText className="h-5 w-5" />
        </div>
        <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Terms of Service</h1>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: May 1, 2026</p>

      {/* Seller Commission Banner */}
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
        <DollarSign className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-900">Seller Commission Notice</p>
          <p className="text-sm text-amber-800 mt-1">
            A <strong>10% platform commission</strong> is deducted from every product sold through UI Marketplace. 
            By registering as a seller, you agree to this fee structure. You will receive 90% of each sale amount.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
          </div>
          <p>
            By accessing or using UI Marketplace ("Platform"), you agree to be bound by these Terms of Service. The Platform is exclusively available to verified University of Ibadan students, staff, and faculty with a valid @ui.edu.ng email address.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-foreground">2. User Accounts</h2>
          </div>
          <p>
            You must register with a valid @ui.edu.ng email address. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must not share your login credentials with anyone.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-foreground">3. Buying &amp; Selling</h2>
          </div>
          <p>
            Sellers must provide accurate descriptions and images of their products. Prices must be listed in Nigerian Naira (₦). All payments are processed through Paystack with escrow protection. Funds are released to sellers only after the buyer confirms receipt.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-foreground">4. Platform Commission &amp; Fees (Sellers)</h2>
          </div>
          <div className="space-y-3">
            <p>
              UI Marketplace deducts a <strong className="text-foreground">10% platform commission</strong> from every successful sale. This fee covers platform maintenance, escrow protection, fraud prevention, and admin support.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Sellers receive <strong className="text-foreground">90%</strong> of the listed product price after commission.</li>
              <li>The 10% commission applies to all product categories — physical goods, food, services, and digital items.</li>
              <li>Commission is automatically deducted before payout; sellers do not need to manually pay this fee.</li>
              <li>The commission rate is subject to change with 14 days advance notice posted on the platform.</li>
            </ul>
            <div className="rounded-lg bg-muted p-3">
              <p className="text-xs font-bold text-foreground uppercase tracking-widest mb-1">Example</p>
              <p>If you list a product at <strong className="text-foreground">₦10,000</strong>, you will receive <strong className="text-foreground">₦9,000</strong> after the 10% (₦1,000) platform commission is deducted.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-foreground">5. Prohibited Items</h2>
          </div>
          <p>
            The following items are strictly prohibited: illegal substances, weapons, stolen goods, counterfeit products, academic fraud materials (e.g. exam answers), and any items that violate university policies.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-4 w-4 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-foreground">6. Disputes &amp; Refunds</h2>
          </div>
          <p>
            Buyers may raise a dispute within 48 hours of purchase. Our team reviews all disputes and resolves them within 3-5 business days. Refunds are processed back to the original payment method.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-foreground">7. Seller Verification</h2>
          </div>
          <p>
            All sellers must upload a valid University of Ibadan Student ID for verification. Unverified sellers cannot list products. The admin reserves the right to approve or reject any seller application or product listing, with a reason provided for any rejection.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-foreground">8. Privacy</h2>
          </div>
          <p>
            We collect only necessary information to operate the Platform. Your @ui.edu.ng email is used for verification and communication. We do not share personal data with third parties except as required for payment processing (Paystack).
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-foreground">9. Community Guidelines</h2>
          </div>
          <p>
            Users must maintain respectful communication. Harassment, discrimination, and abusive language are not tolerated. Violations may result in account suspension or permanent ban.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-4 w-4 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-foreground">10. Limitation of Liability</h2>
          </div>
          <p>
            UI Marketplace acts as an intermediary between buyers and sellers. We are not responsible for the quality of products or services provided by sellers. We provide escrow protection to minimise risk for both parties.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-foreground">11. Seller Badges</h2>
          </div>
          <p>
            Sellers may be awarded badges (Verified, Top Seller, Trusted, Featured) by the admin based on performance, transaction volume, and account standing. Badges improve listing visibility and buyer trust. Badges may be revoked for policy violations.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle className="h-4 w-4 text-primary" />
            <h2 className="font-heading text-lg font-semibold text-foreground">12. Contact</h2>
          </div>
          <p>
            For questions about these terms, contact the admin via the in-app "Contact Admin" feature or through the support WhatsApp channel. You can also email support@uimarketplace.ng.
          </p>
        </section>
      </div>
    </div>
  </Layout>
);

export default Terms;
