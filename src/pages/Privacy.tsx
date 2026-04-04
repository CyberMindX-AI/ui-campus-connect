import Layout from '@/components/Layout';

const Privacy = () => (
  <Layout>
    <div className="container mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: July 1, 2025</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">1. Information We Collect</h2>
          <p className="mt-2">
            We collect information you provide during registration: full name, @ui.edu.ng email address, faculty, matric number (optional), and profile photo (optional). We also collect transaction data, messages between users, and device/browser information for security purposes.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
          <p className="mt-2">
            Your information is used to verify your identity as a UI community member, facilitate transactions, enable communication between buyers and sellers, process payments via Paystack, send notifications about orders and messages, and improve the Platform.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">3. Data Sharing</h2>
          <p className="mt-2">
            We share limited information with Paystack for payment processing. Sellers can see buyer names for order fulfilment. We do not sell your personal data to third parties. We may disclose information if required by law or university administration.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">4. Data Security</h2>
          <p className="mt-2">
            We use encryption for data transmission and secure storage practices. Passwords are hashed and never stored in plain text. Payment information is handled entirely by Paystack and never stored on our servers.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">5. Your Rights</h2>
          <p className="mt-2">
            You can access, update, or delete your personal information through Settings. You can request a full data export. Account deletion includes a 30-day grace period during which your data can be recovered.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">6. Cookies</h2>
          <p className="mt-2">
            We use essential cookies for authentication and session management. No third-party tracking cookies are used.
          </p>
        </section>
        <section>
          <h2 className="font-heading text-lg font-semibold text-foreground">7. Contact</h2>
          <p className="mt-2">
            For privacy-related questions, contact our Data Protection Officer at privacy@uimarketplace.ng.
          </p>
        </section>
      </div>
    </div>
  </Layout>
);

export default Privacy;
