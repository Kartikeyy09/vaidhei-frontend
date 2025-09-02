// FILE: src/pages/PrivacyPolicyPage.jsx

"use client";

import { Link } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-white">
      <main className="py-5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-slate-500">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* IMPORTANT: Disclaimer Box */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-md my-8 shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-bold text-yellow-800">Legal Disclaimer</h3>
                <div className="mt-2 text-base text-yellow-700">
                  <p>
                    This is a generic template for a Privacy Policy. You must review and customize this content to accurately reflect your business practices. We strongly recommend consulting with a legal professional to ensure your policy is compliant with all applicable laws and regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Styled with Tailwind Typography */}
          <div className="prose prose-lg max-w-none prose-h2:text-slate-800 prose-a:text-red-600 hover:prose-a:underline">
            
            <h2>1. Introduction</h2>
            <p>
              Welcome to Vaidehi Enterprises ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <Link to="/">vaidehienterprises.com</Link>. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <ul>
              <li>
                <strong>Personal Data:</strong> Personally identifiable information, such as your name, email address, and telephone number, that you voluntarily give to us when you fill out a contact form or otherwise contact us.
              </li>
              <li>
                <strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
              </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul>
              <li>Respond to your inquiries and provide customer support.</li>
              <li>Email you regarding our services or to solicit feedback.</li>
              <li>Improve the efficiency and operation of the Site.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            </ul>
            
            <h2>4. Disclosure of Your Information</h2>
            <p>
              We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law.
            </p>

            <h2>5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
            
            <h2>6. Changes to This Privacy Policy</h2>
            <p>
              We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p>
              Vaidehi Enterprises<br />
              123 Business District, Railway Plaza<br />
              New Delhi - 110001<br />
              Email: <a href="mailto:info@vaidehienterprises.com">info@vaidehienterprises.com</a>
            </p>

          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;