
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-12 underline decoration-blue-600">Privacy <span className="text-blue-600">Policy</span></h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">1. Introduction</h2>
            <p className="font-medium leading-relaxed">
              World Market Shop ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our marketplace services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">2. Information Collection</h2>
            <p className="font-medium leading-relaxed">
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 font-medium">
              <li>Register for an account or create a seller "Show".</li>
              <li>Place an order or make a purchase.</li>
              <li>Fill out a contact or inquiry form.</li>
              <li>Communicate with us via WhatsApp or email.</li>
            </ul>
            <p className="mt-4 font-medium">
              This information may include your name, email address, phone number, shipping address, and payment information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">3. Use of Personal Data</h2>
            <p className="font-medium leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 font-medium">
              <li>Process and fulfill your orders.</li>
              <li>Manage your account and seller profile.</li>
              <li>Improve our marketplace and customer service.</li>
              <li>Send you administrative information and marketing communications.</li>
              <li>Comply with legal obligations and prevent fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">4. Cookies Usage</h2>
            <p className="font-medium leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our marketplace and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">5. Payment Data Protection</h2>
            <p className="font-medium leading-relaxed">
              We prioritize the security of your payment data. All payment transactions are processed through secure, encrypted gateways. We do not store your full credit card or bank account details on our servers. Our payment processing partners comply with PCI-DSS standards to ensure the safe handling of your financial information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">6. Third-Party Sharing Policy</h2>
            <p className="font-medium leading-relaxed">
              We do not sell or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 font-medium">
              <li>Service providers who assist in our operations (e.g., shipping carriers, payment processors).</li>
              <li>Sellers on our platform, only to the extent necessary to fulfill your orders.</li>
              <li>Law enforcement or regulatory bodies when required by law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">7. Customer Rights</h2>
            <p className="font-medium leading-relaxed">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 font-medium">
              <li>The right to access the data we hold about you.</li>
              <li>The right to request correction of inaccurate data.</li>
              <li>The right to request deletion of your data.</li>
              <li>The right to object to or restrict processing of your data.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">8. Contact for Privacy Concerns</h2>
            <p className="font-medium leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer at:
            </p>
            <div className="mt-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="font-black uppercase text-sm">Email: privacy@worldmarketshop.com</p>
              <p className="font-black uppercase text-sm mt-2">WhatsApp: +923187536795</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
