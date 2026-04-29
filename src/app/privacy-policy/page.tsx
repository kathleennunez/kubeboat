export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background px-4 py-12 text-on-surface sm:px-6 sm:py-16">
      <main className="mx-auto max-w-5xl">
        <div className="border-4 border-outline-variant bg-surface-container-low p-6 sm:p-10">
          <h1 className="mb-2 font-headline text-2xl font-black uppercase italic tracking-tight text-primary sm:text-3xl">
            Privacy Policy - KubeBoat
          </h1>
          <p className="mb-8 font-body text-sm text-on-surface-variant">Last updated: April 29, 2026</p>

          <div className="space-y-6 text-sm leading-relaxed sm:text-base">
            <div>
              <h2 className="mb-2 font-headline text-lg font-bold uppercase tracking-wider text-primary">1. Who we are</h2>
              <p>
                KubeBoat is organized by GoGrow Company GmbH, Seestrasse 811, 8706 Meilen, Switzerland. We are the
                data controller for the personal data collected through this website.
              </p>
              <p className="mt-2">
                For any privacy-related questions or requests, contact us at:{" "}
                <a className="text-primary underline hover:text-white" href="mailto:phil@thegogrow.ch">
                  phil@thegogrow.ch
                </a>
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-headline text-lg font-bold uppercase tracking-wider text-primary">2. What data we collect</h2>
              <p>When you pre-register, we collect your name and email address.</p>
              <p className="mt-2">
                We also collect anonymous usage data through analytics tools to understand how visitors interact with
                the website (pages visited, device type, general location). No personal profiles are built from this
                data.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-headline text-lg font-bold uppercase tracking-wider text-primary">3. Why we collect it</h2>
              <p>
                We use your data for two purposes: to gauge interest in KubeBoat and decide whether to move forward
                with the event, and to notify you about the actual registration page if we go ahead.
              </p>
              <p className="mt-2">We will not use your email for anything else. No newsletters, no marketing, no third-party promotions.</p>
              <p className="mt-2">Legal basis (GDPR Art. 6): Your consent, given by submitting the pre-registration form.</p>
            </div>

            <div>
              <h2 className="mb-2 font-headline text-lg font-bold uppercase tracking-wider text-primary">4. Who we share it with</h2>
              <p>
                We do not sell, rent, or trade your personal data. Your data may be shared with the service provider
                that hosts the form and our analytics provider, strictly for the purposes described above. All service
                providers process data only on our instructions.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-headline text-lg font-bold uppercase tracking-wider text-primary">5. Where your data is stored</h2>
              <p>
                Your data may be processed in Switzerland, the EU, or the United States, depending on the service
                providers we use. Where data is transferred outside Switzerland or the EU, we ensure appropriate
                safeguards are in place (for example EU Standard Contractual Clauses or equivalent measures).
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-headline text-lg font-bold uppercase tracking-wider text-primary">6. How long we keep it</h2>
              <p>
                If the event goes ahead, we delete all pre-registration data within 30 days after the event (March
                14, 2027). If we decide not to proceed with the event, we delete all data within 30 days of that
                decision. Analytics data is aggregated and anonymous; it contains no personal information.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-headline text-lg font-bold uppercase tracking-wider text-primary">7. Your rights</h2>
              <p>
                Under GDPR and the Swiss Federal Act on Data Protection (FADP), you have the right to access the
                personal data we hold about you, to correct inaccurate data, to request deletion of your data at any
                time, to withdraw your consent at any time, and to data portability.
              </p>
              <p className="mt-2">
                To exercise any of these rights, email us at{" "}
                <a className="text-primary underline hover:text-white" href="mailto:phil@thegogrow.ch">
                  phil@thegogrow.ch
                </a>
                . We will respond within 30 days. You also have the right to lodge a complaint with the relevant
                supervisory authority (the Swiss Federal Data Protection and Information Commissioner, or your local EU
                data protection authority).
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-headline text-lg font-bold uppercase tracking-wider text-primary">8. Cookies and analytics</h2>
              <p>
                This website uses analytics tools to collect anonymous usage statistics. We may use cookies or similar
                technologies for this purpose. No advertising cookies or third-party tracking pixels are used. You can
                disable cookies in your browser settings at any time.
              </p>
            </div>

            <div>
              <h2 className="mb-2 font-headline text-lg font-bold uppercase tracking-wider text-primary">9. Changes to this policy</h2>
              <p>We may update this privacy policy if our tools or processes change. Any updates will be posted on this page with a revised date.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
