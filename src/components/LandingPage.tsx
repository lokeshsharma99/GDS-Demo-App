import React from 'react';
import { ArrowRight, Shield, Clock } from 'lucide-react';

interface LandingPageProps {
  onSelectService: (service: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectService }) => {
  const startApplication = () => onSelectService('universal-credit');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-2">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-sm">GOV.UK</p>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Apply for Universal Credit</h1>
        <p className="mt-4 text-lg text-gray-700">
          Financial support if you're on a low income, out of work or cannot work.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            onClick={startApplication}
            className="inline-flex items-center justify-center bg-green-600 text-white font-bold px-6 py-3 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          >
            Start application
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            Takes 30–45 minutes
            <span className="mx-3">•</span>
            <Shield className="w-4 h-4 mr-2" />
            Secure and confidential
          </div>
        </div>

        <details className="mt-8 bg-gray-50 border border-gray-200 p-5">
          <summary className="font-semibold text-gray-900 cursor-pointer select-none">
            What you'll need
          </summary>
          <ul className="mt-3 text-gray-700 space-y-1">
            <li>• National Insurance number</li>
            <li>• Bank account details</li>
            <li>• Details of income and savings</li>
            <li>• Information about housing costs</li>
          </ul>
        </details>

        <p className="mt-10 text-sm text-gray-600">
          Other services (Housing Benefit, Council Tax Support, Disability Benefits) coming soon.
        </p>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-gray-200 py-6 mt-8">
        <div className="max-w-3xl mx-auto px-4 text-sm text-gray-600">
          Built by the Government Digital Service
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
