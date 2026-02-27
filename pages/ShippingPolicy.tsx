
import React from 'react';

const ShippingPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-12 underline decoration-blue-600">Shipping <span className="text-blue-600">Policy</span></h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">1. Worldwide Shipping</h2>
            <p className="font-medium leading-relaxed">
              World Market Shop is proud to offer international shipping services to over 200 countries and islands worldwide. Nothing means more to us than bringing our customers great value and service. We will continue to grow to meet the needs of all our customers, delivering a service beyond all expectation anywhere in the world.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">2. Estimated Delivery Times</h2>
            <p className="font-medium leading-relaxed">
              Delivery times vary by location. These are our estimates:
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 font-black uppercase text-sm">Location</th>
                    <th className="py-3 font-black uppercase text-sm">Estimated Shipping Time</th>
                  </tr>
                </thead>
                <tbody className="font-medium">
                  <tr className="border-b border-gray-100">
                    <td className="py-3">United States & Canada</td>
                    <td className="py-3">7-12 Business Days</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3">Europe</td>
                    <td className="py-3">5-10 Business Days</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3">Australia & New Zealand</td>
                    <td className="py-3">10-15 Business Days</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3">Central & South America</td>
                    <td className="py-3">12-20 Business Days</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-3">Asia & Middle East</td>
                    <td className="py-3">5-10 Business Days</td>
                  </tr>
                  <tr>
                    <td className="py-3">Africa</td>
                    <td className="py-3">15-25 Business Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm italic text-gray-500">*This doesn’t include our 2-5 day processing time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">3. Order Processing Time</h2>
            <p className="font-medium leading-relaxed">
              All orders are processed within 2-5 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">4. Tracking Information</h2>
            <p className="font-medium leading-relaxed">
              You will receive a shipment confirmation email once your order has shipped containing your tracking number(s). The tracking information will be active within 24-48 hours. For many international shipments, tracking is available until the package leaves the origin country and upon arrival in the destination country.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">5. Customs, Duties, & Taxes</h2>
            <p className="font-medium leading-relaxed">
              World Market Shop is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">6. Bulk Shipping Details</h2>
            <p className="font-medium leading-relaxed">
              For large-scale team orders or wholesale inquiries, we offer specialized cargo shipping rates. Bulk orders may require additional processing time for manufacturing and quality control. Please contact our export department directly for a custom logistics quote.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">7. Shipping Support</h2>
            <p className="font-medium leading-relaxed">
              If you have any questions about the shipping and delivery of your order, please contact our support team:
            </p>
            <div className="mt-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="font-black uppercase text-sm">Email: logistics@worldmarketshop.com</p>
              <p className="font-black uppercase text-sm mt-2">WhatsApp Support: +923187536795</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
