import React, { useState } from 'react';
import { ArrowRight, Users, Home, CreditCard, FileText, Shield, Clock, Search, Baby, Briefcase, Heart, GraduationCap, Car, Phone } from 'lucide-react';

interface LandingPageProps {
  onSelectService: (service: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectService }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    // Benefits and Financial Support
    {
      id: 'universal-credit',
      title: 'Apply for Universal Credit',
      description: 'Universal Credit is a payment to help with your living costs. It\'s paid monthly - or twice a month for some people in Scotland.',
      icon: <CreditCard className="w-8 h-8" />,
      eligibility: 'You may be able to get Universal Credit if you\'re on a low income, out of work or you cannot work.',
      timeToComplete: '30-45 minutes',
      category: 'benefits',
      popular: true
    },
    {
      id: 'housing-benefit',
      title: 'Apply for Housing Benefit',
      description: 'Housing Benefit can help you pay your rent if you\'re unemployed, on a low income or claiming benefits.',
      icon: <Home className="w-8 h-8" />,
      eligibility: 'You can apply if you pay rent and have a low income or are on benefits.',
      timeToComplete: '25-35 minutes',
      category: 'benefits',
      popular: true
    },
    {
      id: 'council-tax-support',
      title: 'Apply for Council Tax Support',
      description: 'Council Tax Support can help you pay your council tax bill if you\'re on a low income or claiming benefits.',
      icon: <FileText className="w-8 h-8" />,
      eligibility: 'You can apply if you\'re responsible for paying council tax and on a low income.',
      timeToComplete: '15-20 minutes',
      category: 'benefits',
      popular: false
    },
    {
      id: 'disability-benefits',
      title: 'Apply for Disability Benefits',
      description: 'Personal Independence Payment (PIP) helps with extra living costs if you have a long-term physical or mental health condition.',
      icon: <Users className="w-8 h-8" />,
      eligibility: 'You can apply if you\'re aged 16 to 64 and have a health condition or disability.',
      timeToComplete: '45-60 minutes',
      category: 'benefits',
      popular: false
    },
    // Family and Children
    {
      id: 'child-benefit',
      title: 'Apply for Child Benefit',
      description: 'Child Benefit is a tax-free payment that can help you with the costs of your children.',
      icon: <Baby className="w-8 h-8" />,
      eligibility: 'You can get Child Benefit if you\'re responsible for bringing up a child who is under 16.',
      timeToComplete: '20-30 minutes',
      category: 'family',
      popular: true
    },
    {
      id: 'childcare-support',
      title: 'Apply for Childcare Support',
      description: 'Get help with childcare costs through Tax-Free Childcare or 30 hours free childcare.',
      icon: <Heart className="w-8 h-8" />,
      eligibility: 'Available for working parents with children under 11 (or under 17 with disabilities).',
      timeToComplete: '25-35 minutes',
      category: 'family',
      popular: false
    },
    // Employment and Education
    {
      id: 'jobseekers-allowance',
      title: 'Apply for Jobseeker\'s Allowance',
      description: 'Jobseeker\'s Allowance (JSA) is a benefit for people who are looking for work.',
      icon: <Briefcase className="w-8 h-8" />,
      eligibility: 'You can apply if you\'re unemployed or working less than 16 hours per week.',
      timeToComplete: '35-45 minutes',
      category: 'employment',
      popular: true
    },
    {
      id: 'student-finance',
      title: 'Apply for Student Finance',
      description: 'Get financial support for university or college, including tuition fee loans and maintenance loans.',
      icon: <GraduationCap className="w-8 h-8" />,
      eligibility: 'Available for UK students starting higher education courses.',
      timeToComplete: '40-60 minutes',
      category: 'education',
      popular: true
    },
    // Transport and Driving
    {
      id: 'blue-badge',
      title: 'Apply for a Blue Badge',
      description: 'A Blue Badge helps people with disabilities or health conditions park closer to their destination.',
      icon: <Car className="w-8 h-8" />,
      eligibility: 'Available for people with permanent or temporary mobility issues.',
      timeToComplete: '15-25 minutes',
      category: 'transport',
      popular: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', count: services.length },
    { id: 'benefits', name: 'Benefits & Support', count: services.filter(s => s.category === 'benefits').length },
    { id: 'family', name: 'Family & Children', count: services.filter(s => s.category === 'family').length },
    { id: 'employment', name: 'Employment', count: services.filter(s => s.category === 'employment').length },
    { id: 'education', name: 'Education', count: services.filter(s => s.category === 'education').length },
    { id: 'transport', name: 'Transport', count: services.filter(s => s.category === 'transport').length }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularServices = services.filter(service => service.popular);

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

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 focus:border-blue-600 focus:outline-none text-lg"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Popular Services */}
        {selectedCategory === 'all' && searchTerm === '' && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularServices.map((service) => (
                <div key={service.id} className="border-2 border-blue-200 bg-blue-50 hover:border-blue-600 transition-colors duration-200">
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="text-blue-600 mr-3">
                        {service.icon}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900">
                        {service.title}
                      </h4>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Takes {service.timeToComplete}</span>
                    </div>
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="w-full bg-green-600 text-white font-bold py-2 px-4 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition-colors duration-200 flex items-center justify-center text-sm"
                      disabled={service.id !== 'universal-credit'}
                    >
                      {service.id === 'universal-credit' ? 'Start now' : 'Coming soon'}
                      {service.id === 'universal-credit' && <ArrowRight className="w-4 h-4 ml-2" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Services */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            {selectedCategory === 'all' && searchTerm === '' ? 'All Services' : 
             searchTerm ? `Search Results (${filteredServices.length})` :
             categories.find(c => c.id === selectedCategory)?.name}
          </h3>
          
          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No services found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-blue-600 hover:underline"
              >
                Clear filters and show all services
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredServices.map((service) => (
                <div key={service.id} className={`border-2 transition-colors duration-200 ${
                  service.popular ? 'border-blue-200 bg-blue-50 hover:border-blue-600' : 'border-gray-300 hover:border-blue-600'
                }`}>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-blue-600 mr-4">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {service.title}
                        </h3>
                        {service.popular && (
                          <span className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full mt-1">
                            Popular
                          </span>
                        )}
                      </div>
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
          )}
        </div>

        {/* Quick Help */}
        <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8">
          <div className="flex items-start">
            <Phone className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-green-900 mb-2">Need help choosing?</h3>
              <p className="text-green-800 mb-3">
                Not sure which service you need? Our advisors can help you find the right support.
              </p>
              <p className="text-green-800 text-sm">
                <strong>Call:</strong> 0800 328 5644 (Monday to Friday, 8am to 6pm)
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Before you start</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">You'll typically need:</h4>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Your National Insurance number</li>
                <li>• Bank account details</li>
                <li>• Details of your income and savings</li>
                <li>• Information about your housing costs</li>
                <li>• Details of any other benefits you receive</li>
                <li>• Identity documents (passport or driving licence)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Getting help:</h4>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Universal Credit helpline: 0800 328 5644</li>
                <li>• Textphone: 0800 328 1344</li>
                <li>• Welsh language: 0800 328 1744</li>
                <li>• Jobcentre Plus: Find your local office</li>
                <li>• Citizens Advice: Free, confidential advice</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Important to know:</h4>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Applications are processed securely</li>
                <li>• You can save and return to applications</li>
                <li>• Most decisions are made within 5 weeks</li>
                <li>• You may be asked to attend an interview</li>
                <li>• Keep evidence of your circumstances</li>
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