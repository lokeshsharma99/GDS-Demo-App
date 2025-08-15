import React from 'react';
import { ArrowRight, Users, Home, CreditCard, FileText, Shield, Clock } from 'lucide-react';

interface LandingPageProps {
  onSelectService: (service: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectService }) => {
  const services = [
    {
      id: 'universal-credit',
      title: 'Apply for Universal Credit',
      description: 'Universal Credit is a payment to help with your living costs. It\'s paid monthly - or twice a month for some people in Scotland.',
      icon: <CreditCard className="w-8 h-8" />,
      eligibility: 'You may be able to get Universal Credit if you\'re on a low income, out of work or you cannot work.',
      timeToComplete: '30-45 minutes'
    },
    {
      id: 'housing-benefit',
      title: 'Apply for Housing Benefit',
      description: 'Housing Benefit can help you pay your rent if you\'re unemployed, on a low income or claiming benefits.',
      icon: <Home className="w-8 h-8" />,
      eligibility: 'You can apply if you pay rent and have a low income or are on benefits.',
      timeToComplete: '25-35 minutes'
    },
    {
      id: 'council-tax-support',
      title: 'Apply for Council Tax Support',
      description: 'Council Tax Support can help you pay your council tax bill if you\'re on a low income or claiming benefits.',
      icon: <FileText className="w-8 h-8" />,
      eligibility: 'You can apply if you\'re responsible for paying council tax and on a low income.',
      timeToComplete: '15-20 minutes'
    },
    {
      id: 'disability-benefits',
      title: 'Apply for Disability Benefits',
      description: 'Personal Independence Payment (PIP) helps with extra living costs if you have a long-term physical or mental health condition.',
      icon: <Users className="w-8 h-8" />,
      eligibility: 'You can apply if you\'re aged 16 to 64 and have a health condition or disability.',
      timeToComplete: '45-60 minutes'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-2">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm">GOV.UK</p>
        </div>
      </div>
      
      <div className="bg-blue-600 text-white py-4">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Apply for Benefits and Support</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Introduction */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get financial support when you need it most
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-3xl">
            Apply for government benefits and financial support online. Choose the service that best matches your situation below.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Secure and confidential</h3>
                <p className="text-blue-800">
                  All applications are processed securely. Your personal information is protected and will only be used to assess your eligibility for benefits.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service) => (
            <div key={service.id} className="border-2 border-gray-300 hover:border-blue-600 transition-colors duration-200">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-blue-600 mr-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>
                
                <p className="text-gray-700 mb-4">
                  {service.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 mb-2">Who can apply:</h4>
                  <p className="text-sm text-gray-700">
                    {service.eligibility}
                  </p>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mb-6">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Takes {service.timeToComplete} to complete</span>
                </div>
                
                <button
                  onClick={() => onSelectService(service.id)}
                  className="w-full bg-green-600 text-white font-bold py-3 px-6 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition-colors duration-200 flex items-center justify-center"
                  disabled={service.id !== 'universal-credit'}
                >
                  {service.id === 'universal-credit' ? 'Start application' : 'Coming soon'}
                  {service.id === 'universal-credit' && <ArrowRight className="w-5 h-5 ml-2" />}
                </button>
                
                {service.id !== 'universal-credit' && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    This service will be available soon
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Before you start</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">You'll need:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Your National Insurance number</li>
                <li>• Bank account details</li>
                <li>• Details of your income and savings</li>
                <li>• Information about your housing costs</li>
                <li>• Details of any other benefits you receive</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Getting help:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Call the Universal Credit helpline: 0800 328 5644</li>
                <li>• Textphone: 0800 328 1344</li>
                <li>• Welsh language: 0800 328 1744</li>
                <li>• Lines are open Monday to Friday, 8am to 6pm</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-300 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Services and information</h4>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Benefits</a></li>
                <li><a href="#" className="hover:underline">Births, deaths, marriages and care</a></li>
                <li><a href="#" className="hover:underline">Business and self-employed</a></li>
                <li><a href="#" className="hover:underline">Childcare and parenting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Departments and policy</h4>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li><a href="#" className="hover:underline">How government works</a></li>
                <li><a href="#" className="hover:underline">Departments</a></li>
                <li><a href="#" className="hover:underline">Worldwide</a></li>
                <li><a href="#" className="hover:underline">Publications</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Support links</h4>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Help</a></li>
                <li><a href="#" className="hover:underline">Privacy</a></li>
                <li><a href="#" className="hover:underline">Cookies</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-6 text-center">
            <p className="text-gray-600 text-sm">
              Built by the <a href="#" className="hover:underline">Government Digital Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;