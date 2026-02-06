import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import '../styles/HelpPage.css';

function HelpPage() {
  const { translate } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState('ngo');
  const [location, setLocation] = useState('');
  const [showEmergency, setShowEmergency] = useState(false);

  const ngoData = [
    {
      id: 1,
      name: 'PRADAN (Professional Assistance for Development Action)',
      location: 'Multiple villages across India',
      services: ['Financial literacy training', 'Women self-help groups', 'Livelihood support'],
      contact: '1800-123-4567',
      website: 'www.pradan.net',
      rating: '★★★★☆'
    },
    {
      id: 2,
      name: 'SELCO Foundation',
      location: 'Karnataka, Rajasthan, Bihar, Assam',
      services: ['Energy financing', 'Solar solutions for livelihoods', 'Financial inclusion'],
      contact: '080-2679 3200',
      website: 'www.selcofoundation.org',
      rating: '★★★★★'
    },
    {
      id: 3,
      name: 'BASIX Sub-K iTransactions',
      location: 'Andhra Pradesh, Telangana, Maharashtra',
      services: ['Banking correspondents', 'Digital payments training', 'Microfinance'],
      contact: '040-2343 5678',
      website: 'www.basixindia.com',
      rating: '★★★★☆'
    },
    {
      id: 4,
      name: 'Village Financial Services',
      location: 'West Bengal, Odisha, Jharkhand',
      services: ['Micro-savings groups', 'Insurance awareness', 'Financial counseling'],
      contact: '033-2456 7890',
      website: 'www.vfsindia.org',
      rating: '★★★☆☆'
    }
  ];

  const governmentHelp = [
    {
      department: 'Banking',
      offices: ['Local Bank Branch', 'Business Correspondent (Bank Mitra)', 'ATM Centers'],
      services: ['Account opening', 'Loan applications', 'Document assistance'],
      contact: 'Bank toll-free numbers'
    },
    {
      department: 'Post Office',
      offices: ['Post Office Savings Bank', 'India Post Payments Bank'],
      services: ['Savings accounts', 'Recurring deposits', 'Money transfers'],
      contact: 'Local postmaster'
    },
    {
      department: 'Panchayat',
      offices: ['Gram Panchayat Office', 'Block Development Office'],
      services: ['Scheme applications', 'Document certification', 'Grievance redressal'],
      contact: 'Sarpanch office'
    },
    {
      department: 'Agriculture',
      offices: ['Krishi Vigyan Kendra', 'Agriculture Department'],
      services: ['Crop loan assistance', 'Insurance claims', 'Subsidy information'],
      contact: 'District agriculture officer'
    }
  ];

  const emergencyContacts = [
    { name: 'Cyber Crime Helpline', number: '1930', type: 'emergency' },
    { name: 'Bank Fraud Helpline', number: '14440', type: 'emergency' },
    { name: 'Women Helpline', number: '181', type: 'emergency' },
    { name: 'Consumer Helpline', number: '1915', type: 'support' },
    { name: 'UIDAI (Aadhaar)', number: '1947', type: 'support' },
    { name: 'Income Tax Help', number: '1800-180-1961', type: 'support' }
  ];

  const faqItems = [
    {
      question: 'How do I know if an NGO is trustworthy?',
      answer: 'Check if they are registered with NITI Aayog NGO Darpan. Ask for their registration certificate. Never pay money to NGOs for "registration fees".'
    },
    {
      question: 'What documents should I carry for bank work?',
      answer: 'Always carry: 1) Aadhaar card 2) PAN card if available 3) Recent photographs 4) Address proof 5) Mobile number linked to Aadhaar'
    },
    {
      question: 'What if I lost money in a UPI scam?',
      answer: '1) Immediately call your bank 2) Block your card if needed 3) File complaint at cybercrime.gov.in 4) Contact police cyber cell'
    },
    {
      question: 'How to get help in my local language?',
      answer: 'Most banks and government offices have staff who speak local languages. You can also use NoteKaka in your preferred language.'
    }
  ];

  const handleCall = (number) => {
    if (window.confirm(`Call ${number}?`)) {
      window.location.href = `tel:${number}`;
    }
  };

  const handleVisitWebsite = (url) => {
    window.open(`https://${url}`, '_blank');
  };

  const handleLocationSearch = () => {
    if (location.trim()) {
      alert(`Searching for help centers near: ${location}\n(Note: This is a demo. In real app, this would use GPS/location services)`);
    }
  };

  return (
    <div className="help-page">
      <div className="help-header">
        <h1>Human Help & Support</h1>
        <p>Find real people who can help you with financial matters. NGOs, government offices, and trusted contacts.</p>
      </div>

      <div className="emergency-section">
        <button 
          className="emergency-toggle"
          onClick={() => setShowEmergency(!showEmergency)}
        >
          <div className="emergency-alert">
            <span className="alert-icon">🚨</span>
            <h2>Emergency Contacts {showEmergency ? '▲' : '▼'}</h2>
          </div>
          <p>Immediate help for scams, fraud, or urgent issues</p>
        </button>
        
        {showEmergency && (
          <div className="emergency-contacts">
            <div className="contacts-grid">
              {emergencyContacts.map((contact, index) => (
                <div 
                  key={index} 
                  className={`contact-card ${contact.type}`}
                  onClick={() => handleCall(contact.number)}
                >
                  <div className="contact-name">{contact.name}</div>
                  <div className="contact-number">{contact.number}</div>
                  <div className="contact-action">Tap to Call</div>
                </div>
              ))}
            </div>
            
            <div className="emergency-tips">
              <h3>If you're in immediate trouble:</h3>
              <ul>
                <li>Call your bank immediately if money is lost</li>
                <li>Visit nearest police station for fraud complaints</li>
                <li>Don't delete any evidence (messages, screenshots)</li>
                <li>Inform family members immediately</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="location-search">
        <h2>Find Help Near You</h2>
        <div className="search-box">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your village, town, or pin code"
            className="location-input"
          />
          <button 
            className="button button-primary"
            onClick={handleLocationSearch}
          >
            Search Nearby
          </button>
        </div>
        <p className="search-note">
          Or use your current location to find the closest help centers
        </p>
      </div>

      <div className="help-tabs">
        <div className="tab-buttons">
          <button 
            className={`tab-button ${activeTab === 'ngo' ? 'active' : ''}`}
            onClick={() => setActiveTab('ngo')}
          >
            <span className="tab-icon">🤝</span>
            NGOs & Trusts
          </button>
          <button 
            className={`tab-button ${activeTab === 'government' ? 'active' : ''}`}
            onClick={() => setActiveTab('government')}
          >
            <span className="tab-icon">🏛️</span>
            Government Offices
          </button>
          <button 
            className={`tab-button ${activeTab === 'bank' ? 'active' : ''}`}
            onClick={() => setActiveTab('bank')}
          >
            <span className="tab-icon">🏦</span>
            Banks & Post Offices
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'ngo' && (
            <div className="ngo-list">
              <h2>Trusted NGOs Working in Rural Finance</h2>
              <p className="section-description">
                These organizations provide free financial literacy training and support
              </p>
              
              <div className="ngo-grid">
                {ngoData.map(ngo => (
                  <div key={ngo.id} className="ngo-card">
                    <div className="ngo-header">
                      <h3>{ngo.name}</h3>
                      <div className="ngo-rating">{ngo.rating}</div>
                    </div>
                    
                    <div className="ngo-location">
                      <span className="location-icon">📍</span>
                      {ngo.location}
                    </div>
                    
                    <div className="ngo-services">
                      <h4>Services Offered:</h4>
                      <ul>
                        {ngo.services.map((service, index) => (
                          <li key={index}>{service}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="ngo-contact">
                      <div className="contact-info">
                        <strong>Contact:</strong> {ngo.contact}
                      </div>
                      <div className="contact-info">
                        <strong>Website:</strong> {ngo.website}
                      </div>
                    </div>
                    
                    <div className="ngo-actions">
                      <button 
                        className="button button-primary"
                        onClick={() => handleCall(ngo.contact)}
                      >
                        Call Now
                      </button>
                      <button 
                        className="button button-outline"
                        onClick={() => handleVisitWebsite(ngo.website)}
                      >
                        Visit Website
                      </button>
                    </div>
                    
                    <div className="ngo-note">
                      <small>✅ Verified organization. Free services only.</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'government' && (
            <div className="government-list">
              <h2>Government Offices for Financial Help</h2>
              <p className="section-description">
                Visit these offices for scheme applications, documents, and official work
              </p>
              
              <div className="office-grid">
                {governmentHelp.map((office, index) => (
                  <div key={index} className="office-card">
                    <div className="office-header">
                      <h3>{office.department}</h3>
                      <div className="office-badge">Government</div>
                    </div>
                    
                    <div className="office-locations">
                      <h4>Where to go:</h4>
                      <ul>
                        {office.offices.map((loc, i) => (
                          <li key={i}>{loc}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="office-services">
                      <h4>They can help with:</h4>
                      <ul>
                        {office.services.map((service, i) => (
                          <li key={i}>{service}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="office-contact">
                      <strong>Contact:</strong> {office.contact}
                    </div>
                    
                    <div className="office-tips">
                      <p>💡 Tip: Visit in morning hours, carry all documents, be patient in queues</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bank' && (
            <div className="bank-list">
              <h2>Banking & Post Office Help</h2>
              <p className="section-description">
                Financial institutions that can assist with accounts, loans, and payments
              </p>
              
              <div className="bank-grid">
                <div className="bank-card">
                  <div className="bank-icon">🏦</div>
                  <h3>Public Sector Banks</h3>
                  <ul>
                    <li>SBI, PNB, Bank of Baroda</li>
                    <li>Business Correspondents (Bank Mitra)</li>
                    <li>Micro ATM services</li>
                    <li>Financial literacy camps</li>
                  </ul>
                  <div className="bank-tip">
                    <strong>Best for:</strong> Basic accounts, government scheme payments
                  </div>
                </div>
                
                <div className="bank-card">
                  <div className="bank-icon">📮</div>
                  <h3>India Post Payments Bank</h3>
                  <ul>
                    <li>Available at local post offices</li>
                    <li>No minimum balance needed</li>
                    <li>Domestic money transfers</li>
                    <li>Bill payments and insurance</li>
                  </ul>
                  <div className="bank-tip">
                    <strong>Best for:</strong> Villages without bank branches
                  </div>
                </div>
                
                <div className="bank-card">
                  <div className="bank-icon">🤝</div>
                  <h3>Cooperative Banks</h3>
                  <ul>
                    <li>District Cooperative Banks</li>
                    <li>Regional Rural Banks (RRBs)</li>
                    <li>Agriculture and crop loans</li>
                    <li>Local language support</li>
                  </ul>
                  <div className="bank-tip">
                    <strong>Best for:</strong> Farmers, rural businesses
                  </div>
                </div>
                
                <div className="bank-card">
                  <div className="bank-icon">💳</div>
                  <h3>Small Finance Banks</h3>
                  <ul>
                    <li>Equitas, Ujjivan, ESAF</li>
                    <li>Micro-loans and savings</li>
                    <li>Digital banking facilities</li>
                    <li>Financial inclusion focus</li>
                  </ul>
                  <div className="bank-tip">
                    <strong>Best for:</strong> Small businesses, micro-savings
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question">
                <h3>{item.question}</h3>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="request-help">
        <div className="request-card">
          <div className="request-icon">✍️</div>
          <div className="request-content">
            <h3>Need Personalized Help?</h3>
            <p>Our volunteers can call you back or visit if available in your area</p>
            <button className="button button-primary">
              Request Call Back
            </button>
          </div>
        </div>
      </div>

      <div className="safety-guidelines">
        <h2>Safety Guidelines</h2>
        <div className="guidelines-grid">
          <div className="guideline-card">
            <div className="guideline-icon">✅</div>
            <h3>Do's</h3>
            <ul>
              <li>Verify credentials before sharing documents</li>
              <li>Meet in public places or official offices</li>
              <li>Take a family member with you</li>
              <li>Get receipts for any payments made</li>
            </ul>
          </div>
          
          <div className="guideline-card">
            <div className="guideline-icon">❌</div>
            <h3>Don'ts</h3>
            <ul>
              <li>Never pay for "free" government schemes</li>
              <li>Don't share OTP, PIN, or passwords</li>
              <li>Avoid middlemen promising quick results</li>
              <li>Don't sign documents without understanding</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;