import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white mt-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 font-playfair mb-4">About Our Measurements</h3>
            <p className="text-gray-600 leading-relaxed">
              Our AI-powered body measurement system is designed to provide accurate estimations for fashion and health purposes.
              While we strive for precision, these measurements should not be considered as medical assessments.
              Always consult healthcare professionals for medical advice.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 font-playfair mb-4">Confidence & Body Positivity</h3>
            <p className="text-gray-600 leading-relaxed">
              Every body is unique and beautiful. Our goal is to help you find clothes that make you feel confident and comfortable.
              Remember that measurements are just numbers - what matters most is how you feel in your own skin.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} RECOM Metric. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}