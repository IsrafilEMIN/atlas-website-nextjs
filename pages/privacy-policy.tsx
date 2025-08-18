import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Atlas HomeServices</title>
        <meta
          name="description"
          content="View the privacy policy for Atlas HomeServices, a premium painting company serving homeowners in Richmond Hill and the York Region."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="bg-[#f9f6f2] min-h-screen px-6 py-16 md:px-12 text-[#2c3e50]">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-serif font-semibold mb-6 text-[#162733]">
            Privacy Policy
          </h1>
          <p className="mb-4 text-sm md:text-base leading-relaxed">
            Atlas HomeServices (“we”, “our”, or “us”) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard the personal information you provide when you interact with our website,{" "}
            <a
              href="https://atlas-paint.com"
              className="text-[#162733] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              atlas-paint.com
            </a>
            , or submit information through our advertising on platforms like Meta (Facebook and Instagram).
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
          <p className="mb-4">
            When you request a quote or contact us through our website or a lead form on a social media ad, we may collect personal information including your:
          </p>
          <ul className="list-disc list-inside mb-4 pl-4">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Project Address</li>
            <li>Details you provide about your project</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
          <p className="mb-4">
            Your information is used exclusively to provide you with our services. This includes:
          </p>
          <ul className="list-disc list-inside mb-4 pl-4">
            <li>Responding to your inquiries and scheduling consultations.</li>
            <li>Providing you with a detailed quote for your painting project.</li>
            <li>Communicating with you before, during, and after your project.</li>
            <li>Improving our services based on your feedback.</li>
            <li>Sending occasional emails about our services that may be relevant to you. You can opt-out at any time.</li>
          </ul>


          <h2 className="text-xl font-semibold mt-6 mb-2">3. Information Sharing and Third Parties</h2>
          <p className="mb-4">
            We do not sell, rent, or trade your personal information to third parties for marketing purposes. Your data is only shared with trusted partners who assist us in operating our business (such as our CRM software provider), and they are held to strict confidentiality agreements.
          </p>
          <p className="mb-4">
            When you submit information through a Meta lead ad, your data is also subject to Meta&apos;s Data Policy.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
          <p className="mb-4">
            We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure. However, please be aware that no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies and Tracking Technologies</h2>
          <p className="mb-4">
            Our website uses cookies to enhance your browsing experience and analytics tools (like Google Analytics and the Meta Pixel) to understand how visitors interact with our site. This helps us measure the effectiveness of our advertising and improve our website.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Privacy Rights</h2>
          <p className="mb-4">
            You have the right to request access to, correct, or delete your personal information at any time. To do so, please contact us using the information below.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">7. Policy Updates</h2>
          <p className="mb-4">
            We may update this privacy policy from time to time to reflect changes in our practices. We will post any changes on this page and update the &quot;Last updated&quot; date.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this privacy policy or our data practices, please do not hesitate to contact us at:{" "}
            <a href="mailto:info@atlas-paint.com" className="underline text-[#162733]">
              info@atlas-paint.com
            </a>.
          </p>
          
          <p className="text-xs text-gray-500">Last updated: August 18, 2025</p>
        </div>
      </main>
    </>
  );
}