import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Atlas HomeServices</title>
        <meta
          name="description"
          content="View the privacy policy for Atlas HomeServices, a luxury painting company serving Ontario homeowners."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="bg-[#f9f6f2] min-h-screen px-6 py-16 md:px-12 text-[#2c3e50]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-serif font-semibold mb-6 text-[#162733]">
            Privacy Policy
          </h1>
          <p className="mb-4 text-sm md:text-base leading-relaxed">
            Atlas HomeServices (“we”, “our”, or “us”) values your privacy. This policy outlines how we collect, use, and protect your information when you use our website:{" "}
            <a
              href="https://atlas-paint.com"
              className="text-[#162733] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              atlas-paint.com
            </a>.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
          <p className="mb-4">
            We may collect personal information such as your name, email address, phone number, and address when you fill out forms or contact us through the site.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
          <p className="mb-4">
            Your information is used to respond to your inquiries, schedule consultations, improve our services, and occasionally send updates about promotions or service changes.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Protection</h2>
          <p className="mb-4">
            We implement standard security measures to protect your data. However, no transmission method over the internet is 100% secure.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">4. Sharing Information</h2>
          <p className="mb-4">
            We do not sell, rent, or trade your personal information. It may be shared with trusted vendors who assist in operating our business, under strict confidentiality.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies</h2>
          <p className="mb-4">
            We use cookies and analytics tools like Google Analytics to enhance your experience and track website performance.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
          <p className="mb-4">
            You can request access, correction, or deletion of your personal data at any time by contacting us.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">7. Updates to This Policy</h2>
          <p className="mb-4">
            This policy may be updated occasionally. Changes will be posted on this page with a revised date.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this privacy policy, please contact us at{" "}
            <a href="mailto:info@atlas-paint.com" className="underline text-[#162733]">
              info@atlas-paint.com
            </a>.
          </p>

          <p className="text-xs text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </main>
    </>
  );
}
