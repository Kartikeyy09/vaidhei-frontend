// ✅ FILE: src/pages/PrivacyPolicyPage.jsx (COMPLETE AND REDESIGNED)

"use client";

import { Link } from "react-router-dom";
import { EnvelopeIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

// Table of Contents ke liye naya, simplified data
const sections = [
  { id: 'section-1', title: 'Introduction' },
  { id: 'section-2', title: 'Information We Collect' },
  { id: 'section-3', title: 'How We Use Your Information' },
  { id: 'section-4', title: 'Disclosure of Your Information' },
  { id: 'section-5', title: 'Security of Your Information' },
  { id: 'section-6', title: 'Changes to This Policy' },
  { id: 'section-7', title: 'Contact Us' },
];

// Helper Component for the Table of Contents
const TableOfContents = () => (
    <div className="mb-12 lg:mb-0">
        <h2 className="text-xl font-bold text-slate-800 mb-4">On This Page</h2>
        <nav>
            <ul className="space-y-2">
            {sections.map(section => (
                <li key={section.id}>
                <a href={`#${section.id}`} className="block px-3 py-2 rounded-md text-slate-600 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors duration-200">
                    {section.title}
                </a>
                </li>
            ))}
            </ul>
        </nav>
    </div>
);


const PrivacyPolicyPage = () => {
  return (
    <div className="bg-slate-50">
      {/* Page Header */}
      <header className="py-5 sm:py-5 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            Your privacy is important to us at Vaidehi Enterprises.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </header>

      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          
          {/* Sticky Sidebar for Table of Contents on large screens */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <TableOfContents />
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-slate-200/50">
              
              {/* Key Points Summary Box */}
              <div className="mb-12 p-6 bg-blue-50/50 border border-blue-200 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Key Points at a Glance</h3>
                <ul className="space-y-2">
                  <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" /><span className="text-slate-700">We only collect personal information (like name, email) when you voluntarily provide it through our contact forms.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" /><span className="text-slate-700">We use your information solely to respond to your inquiries and improve our website.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" /><span className="text-slate-700">We never sell your personal data to third parties.</span></li>
                </ul>
              </div>
            
              {/* Introduction and Policy Sections */}
              <div className="prose grid gap-12 prose-lg max-w-none prose-h2:text-slate-800 prose-h2:border-b prose-h2:pb-3 prose-h2:mt-12 prose-h2:mb-6 prose-h2:scroll-mt-24 prose-a:text-blue-600 hover:prose-a:underline prose-strong:text-slate-700">
                  
                  <section id="section-1">
                    <h2 className="text-slate-800 font-bold text-2xl">1. Introduction</h2>
                    <p>
                    Welcome to Vaidehi Enterprises ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                    </p>
                  </section>
                  
                  <section id="section-2">
                    <h2 className="text-slate-800 font-bold text-2xl">2. Information We Collect</h2>
                    <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
                    <ul>
                      <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, company name, email address, and telephone number, that you voluntarily give to us when you fill out a contact form or otherwise contact us.</li>
                      <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, browser type, operating system, and the pages you have viewed. This is used for analytics and does not personally identify you.</li>
                    </ul>
                  </section>
                  
                  <section id="section-3">
                    <h2  className="text-slate-800 font-bold text-2xl">3. How We Use Your Information</h2>
                    <p>Having accurate information about you permits us to provide you with a smooth and efficient experience. Specifically, we may use information collected about you to:</p>
                    <ul>
                      <li>Respond to your business inquiries and provide customer support.</li>
                      <li>Email you regarding our services or to solicit feedback.</li>
                      <li>Improve the efficiency and operation of our website.</li>
                      <li>Monitor and analyze usage and trends to enhance your experience.</li>
                    </ul>
                  </section>

                  <section id="section-4">
                    <h2 className="text-slate-800 font-bold text-2xl">4. Disclosure of Your Information</h2>
                    <p>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information. This does not include trusted third parties who assist us in operating our website or conducting our business (like hosting providers), so long as those parties agree to keep this information confidential.</p>
                  </section>
                  
                  <section id="section-5">
                    <h2 className="text-slate-800 font-bold text-2xl">5. Security of Your Information</h2>
                    <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the data you provide, please be aware that no security measures are perfect or impenetrable.</p>
                  </section>
                  
                  <section id="section-6">
                    <h2 className="text-slate-800 font-bold text-2xl">6. Changes to This Privacy Policy</h2>
                    <p>We reserve the right to make changes to this Privacy Policy at any time. We will alert you about any changes by updating the "Last Updated" date. You are encouraged to periodically review this Privacy Policy to stay informed.</p>
                  </section>
                  
                  <section id="section-7">
                    <h2 className="text-slate-800 font-bold text-2xl">7. Contact Us</h2>
                    <p>If you have questions or comments about this Privacy Policy, please contact us:</p>
                    <div className="not-prose mt-4 p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-bold text-slate-800">Vaidehi Enterprises</h3>
                        <p className="text-slate-500">House number 345, Sector H - Ayodhya Nagar,<br/>bhopal - 462041, India</p>
                        <a href="mailto:info@vaidehienterprises.com" className="inline-flex items-center mt-3 text-blue-600 hover:underline font-semibold">
                            <EnvelopeIcon className="w-5 h-5 mr-2" />
                            vaidehienterprises2027@gmail.com
                        </a>
                    </div>
                  </section>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;