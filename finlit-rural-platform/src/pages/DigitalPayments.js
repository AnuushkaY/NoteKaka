import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import '../styles/DigitalPayments.css';

function DigitalPayments() {
  const { translate } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState('upi');
  const [showQR, setShowQR] = useState(false);
  const [qrAmount, setQrAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [showScamInfo, setShowScamInfo] = useState(false);

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payments',
      icon: '📱',
      description: 'Instant bank transfers using UPI ID',
      steps: [
        'Open your UPI app (Google Pay, PhonePe, Paytm)',
        'Click on "Send Money"',
        'Enter UPI ID or mobile number',
        'Enter amount and purpose',
        'Enter UPI PIN to confirm'
      ]
    },
    {
      id: 'qr',
      name: 'QR Code Payments',
      icon: '🔳',
      description: 'Scan QR to pay at shops',
      steps: [
        'Open your UPI app',
        'Tap on "Scan QR Code"',
        'Point camera at shop QR',
        'Enter amount and verify',
        'Enter UPI PIN to pay'
      ]
    },
    {
      id: 'wallet',
      name: 'Mobile Wallets',
      icon: '💰',
      description: 'Prepaid wallets for small payments',
      steps: [
        'Download wallet app (Paytm, Mobikwik)',
        'Add money using bank/UPI',
        'Use wallet balance to pay',
        'No need for bank details each time'
      ]
    },
    {
      id: 'bank',
      name: 'Bank Transfers',
      icon: '🏦',
      description: 'Direct bank account transfers',
      steps: [
        'Use NEFT/RTGS/IMPS',
        'Need account number and IFSC',
        'Takes few minutes to hours',
        'Good for large amounts'
      ]
    }
  ];

  const doDonts = {
    do: [
      '✓ Always verify recipient name before paying',
      '✓ Check UPI ID carefully (name@bank)',
      '✓ Use QR codes at trusted shops only',
      '✓ Set transaction limits in app',
      '✓ Keep UPI PIN secret, never share'
    ],
    dont: [
      '✗ Never share OTP or UPI PIN with anyone',
      '✗ Don\'t click unknown payment links',
      '✗ Avoid public Wi-Fi for payments',
      '✗ Don\'t save UPI PIN on phone',
      '✗ Don\'t make payments under pressure'
    ]
  };

  const commonScams = [
    {
      title: 'Fake Customer Care',
      description: 'Scammers pretend to be bank officials',
      warning: 'Banks never ask for OTP or UPI PIN',
      prevention: 'Call bank official number only'
    },
    {
      title: 'QR Code Swapping',
      description: 'Fake QR stickers at shops',
      warning: 'Always check shop name on QR',
      prevention: 'Ask shopkeeper to show app QR'
    },
    {
      title: 'Payment Request Spam',
      description: 'Random payment requests from strangers',
      warning: 'Don\'t accept unknown requests',
      prevention: 'Block and report spam requests'
    },
    {
      title: 'Fake Reward Messages',
      description: 'Messages claiming you won money',
      warning: 'Never pay to claim "prizes"',
      prevention: 'Real rewards never ask for payment'
    }
  ];

  const generateQRCode = () => {
    if (!qrAmount || qrAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    setShowQR(true);
  };

  const simulatePayment = () => {
    if (!upiId || !qrAmount) {
      alert('Please enter UPI ID and amount');
      return;
    }
    
    alert(`Payment of ₹${qrAmount} to ${upiId} successful! (This is a simulation)`);
    setUpiId('');
    setQrAmount('');
    setShowQR(false);
  };

  return (
    <div className="digital-payments">
      <div className="payments-header">
        <h1>Digital Payments Made Simple</h1>
        <p>Learn to use UPI, QR codes, and mobile wallets safely and confidently</p>
      </div>

      <div className="payment-methods">
        <div className="method-tabs">
          {paymentMethods.map(method => (
            <button
              key={method.id}
              className={`method-tab ${activeTab === method.id ? 'active' : ''}`}
              onClick={() => setActiveTab(method.id)}
            >
              <span className="tab-icon">{method.icon}</span>
              <span className="tab-name">{method.name}</span>
            </button>
          ))}
        </div>

        <div className="method-content">
          {paymentMethods.map(method => (
            activeTab === method.id && (
              <div key={method.id} className="method-details">
                <h2>{method.name}</h2>
                <p className="method-description">{method.description}</p>
                
                <div className="steps-container">
                  <h3>How to Use:</h3>
                  <div className="steps-list">
                    {method.steps.map((step, index) => (
                      <div key={index} className="step">
                        <div className="step-number">{index + 1}</div>
                        <div className="step-text">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {method.id === 'upi' && (
                  <div className="demo-section">
                    <h3>Try UPI Payment (Demo):</h3>
                    <div className="demo-form">
                      <div className="form-group">
                        <label>Enter UPI ID:</label>
                        <input
                          type="text"
                          placeholder="e.g., name@bank"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label>Amount (₹):</label>
                        <input
                          type="number"
                          placeholder="Enter amount"
                          value={qrAmount}
                          onChange={(e) => setQrAmount(e.target.value)}
                          min="1"
                          max="10000"
                        />
                      </div>
                      <div className="form-actions">
                        <button 
                          className="button button-primary"
                          onClick={simulatePayment}
                        >
                          Send Payment
                        </button>
                        <button 
                          className="button button-outline"
                          onClick={generateQRCode}
                        >
                          Generate QR
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {method.id === 'qr' && (
                  <div className="qr-section">
                    <h3>QR Code Guide:</h3>
                    <div className="qr-types">
                      <div className="qr-type">
                        <div className="qr-icon">🏪</div>
                        <h4>Static QR</h4>
                        <p>Shop QR for receiving payments</p>
                      </div>
                      <div className="qr-type">
                        <div className="qr-icon">🔄</div>
                        <h4>Dynamic QR</h4>
                        <p>Amount changes, more secure</p>
                      </div>
                      <div className="qr-type">
                        <div className="qr-icon">📱</div>
                        <h4>Personal QR</h4>
                        <p>Your QR to receive money</p>
                      </div>
                    </div>

                    {showQR && qrAmount && (
                      <div className="qr-demo">
                        <div className="qr-code-placeholder">
                          <div className="qr-lines">
                            <div className="qr-line horizontal"></div>
                            <div className="qr-line vertical"></div>
                          </div>
                          <div className="qr-amount">₹{qrAmount}</div>
                          <div className="qr-hint">Scan to Pay</div>
                        </div>
                        <p className="qr-note">This is a demo QR. In real app, this would be scannable.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </div>

      <div className="safety-section">
        <h2>Safety First: Do's and Don'ts</h2>
        
        <div className="safety-grid">
          <div className="safety-card do">
            <h3>✅ Do's</h3>
            <ul>
              {doDonts.do.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="safety-card dont">
            <h3>❌ Don'ts</h3>
            <ul>
              {doDonts.dont.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="scam-section">
        <button 
          className="scam-toggle"
          onClick={() => setShowScamInfo(!showScamInfo)}
        >
          <h2>⚠️ Scam & Rumor Buster {showScamInfo ? '▲' : '▼'}</h2>
          <p>Learn about common scams and how to avoid them</p>
        </button>
        
        {showScamInfo && (
          <div className="scam-info">
            <div className="scams-grid">
              {commonScams.map((scam, index) => (
                <div key={index} className="scam-card">
                  <div className="scam-header">
                    <h3>{scam.title}</h3>
                    <span className="warning-icon">🚨</span>
                  </div>
                  <p className="scam-desc">{scam.description}</p>
                  <div className="scam-warning">
                    <strong>Warning:</strong> {scam.warning}
                  </div>
                  <div className="scam-prevention">
                    <strong>Prevention:</strong> {scam.prevention}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="emergency-actions">
              <h3>If you're scammed:</h3>
              <div className="emergency-steps">
                <div className="emergency-step">
                  <div className="step-icon">1️⃣</div>
                  <div className="step-content">
                    <h4>Immediately Call Bank</h4>
                    <p>Use number behind your debit card</p>
                  </div>
                </div>
                <div className="emergency-step">
                  <div className="step-icon">2️⃣</div>
                  <div className="step-content">
                    <h4>Block Card/Account</h4>
                    <p>If suspicious activity</p>
                  </div>
                </div>
                <div className="emergency-step">
                  <div className="step-icon">3️⃣</div>
                  <div className="step-content">
                    <h4>File Police Complaint</h4>
                    <p>Cybercrime portal: cybercrime.gov.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="practice-section">
        <h2>Practice Safe Payments</h2>
        <div className="practice-cards">
          <div className="practice-card">
            <div className="practice-icon">🔐</div>
            <h3>Checklist Before Paying</h3>
            <ul>
              <li>Verify recipient name</li>
              <li>Double-check amount</li>
              <li>Confirm UPI ID/QR</li>
              <li>Check network security</li>
            </ul>
          </div>
          
          <div className="practice-card">
            <div className="practice-icon">📞</div>
            <h3>Emergency Contacts</h3>
            <ul>
              <li>Bank Customer Care</li>
              <li>UPI App Support</li>
              <li>Cyber Crime (1930)</li>
              <li>Local Police</li>
            </ul>
          </div>
          
          <div className="practice-card">
            <div className="practice-icon">🎮</div>
            <h3>Quick Quiz</h3>
            <p>Test your knowledge about digital payment safety</p>
            <button className="button button-primary">
              Take Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalPayments;