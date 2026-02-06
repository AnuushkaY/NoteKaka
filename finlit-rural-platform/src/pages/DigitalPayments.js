import React, { useState, useContext } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { LanguageContext } from '../context/LanguageContext';
import '../styles/DigitalPayments.css';

function DigitalPayments() {
  const { translate } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState('upi');
  const [showQR, setShowQR] = useState(false);
  const [qrAmount, setQrAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [showScamInfo, setShowScamInfo] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizQuestions = [
    {
      question: 'What should you do before making a UPI payment?',
      options: [
        'Verify the recipient name',
        'Share your UPI PIN',
        'Share your OTP',
        'Save UPI PIN on phone'
      ],
      correct: 0,
      explanation: 'Always verify the recipient name before paying. Never share your UPI PIN or OTP.'
    },
    {
      question: 'Which is NOT safe for digital payments?',
      options: [
        'Using trusted bank apps',
        'Public Wi-Fi networks',
        'Bluetooth connections',
        'Mobile data'
      ],
      correct: 1,
      explanation: 'Avoid public Wi-Fi for payments. Always use secure networks or mobile data.'
    },
    {
      question: 'What does QR in QR Code stand for?',
      options: [
        'Quick Response',
        'Quality Response',
        'Query Response',
        'Question Response'
      ],
      correct: 0,
      explanation: 'QR stands for Quick Response. QR codes can store more data than barcodes.'
    },
    {
      question: 'If someone claims to be a bank official asking for your OTP, what should you do?',
      options: [
        'Share the OTP immediately',
        'Ask them to call official bank number',
        'Hang up and call your bank directly',
        'Both B and C'
      ],
      correct: 3,
      explanation: 'Banks never ask for OTP or PIN. Always verify by calling the official number on your card.'
    },
    {
      question: 'How should you handle a suspicious payment request?',
      options: [
        'Accept and pay',
        'Block and report it',
        'Share with a friend',
        'Ignore and retry'
      ],
      correct: 1,
      explanation: 'Block and report suspicious payment requests. This protects you and others.'
    }
  ];

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
    if (!upiId || upiId.trim() === '') {
      alert('Please enter a UPI ID');
      return;
    }
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

  const handleQuizStart = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setQuizScore(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (optionIndex) => {
    const isCorrect = optionIndex === quizQuestions[currentQuestion].correct;
    const newAnswers = [...userAnswers, optionIndex];
    setUserAnswers(newAnswers);
    
    if (isCorrect) {
      setQuizScore(quizScore + 1);
    }

    // Move to next question after 1 second
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setCurrentQuestion(0);
    setQuizScore(0);
    setUserAnswers([]);
    setQuizCompleted(false);
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
                      <div className="form-fields">
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
                      </div>
                      <div className="form-actions">
                        <button 
                          className="button button-primary"
                          onClick={simulatePayment}
                        >
                          Send Payment
                        </button>
                        <button 
                          className="button button-secondary"
                          onClick={generateQRCode}
                        >
                          Generate QR
                        </button>
                      </div>
                    </div>
                    
                    {showQR && qrAmount && upiId && (
                      <div className="qr-demo">
                        <h4>Your Payment QR Code:</h4>
                        <div className="qr-code-container">
                          <QRCodeSVG 
                            value={`upi://pay?pa=${upiId}&tn=Payment&am=${qrAmount}`}
                            size={250}
                            level="H"
                            includeMargin={true}
                            fgColor="#000000"
                            bgColor="#ffffff"
                          />
                        </div>
                        <div className="qr-details">
                          <p><strong>UPI ID:</strong> {upiId}</p>
                          <p><strong>Amount:</strong> ₹{qrAmount}</p>
                          <p className="qr-note">📲 Scan this code with any UPI app to make payment</p>
                        </div>
                      </div>
                    )}
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
                        <div className="qr-code-container">
                          <QRCodeSVG 
                            value={`upi://pay?pa=${upiId}&tn=Payment&am=${qrAmount}`}
                            size={250}
                            level="H"
                            includeMargin={true}
                            fgColor="#000000"
                            bgColor="#ffffff"
                          />
                        </div>
                        <div className="qr-details">
                          <p><strong>UPI ID:</strong> {upiId}</p>
                          <p><strong>Amount:</strong> ₹{qrAmount}</p>
                          <p className="qr-note">📲 Scan this code with any UPI app to make payment</p>
                        </div>
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
            <button 
              className="button button-primary"
              onClick={handleQuizStart}
            >
              Take Quiz
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="quiz-overlay" onClick={resetQuiz}>
          <div className="quiz-modal" onClick={(e) => e.stopPropagation()}>
            <button className="quiz-close" onClick={resetQuiz}>✕</button>

            {quizCompleted ? (
              <div className="quiz-result">
                <div className="result-icon">
                  {quizScore >= 4 ? '🎉' : quizScore >= 3 ? '😊' : '📚'}
                </div>
                <h2>Quiz Complete!</h2>
                <div className="result-score">
                  <div className="score-value">{quizScore} / {quizQuestions.length}</div>
                  <div className="score-percentage">
                    {Math.round((quizScore / quizQuestions.length) * 100)}%
                  </div>
                </div>
                
                {quizScore >= 4 && (
                  <p className="result-message">🌟 Excellent! You're a digital payment expert!</p>
                )}
                {quizScore === 3 && (
                  <p className="result-message">✨ Good! Keep learning more about payment safety.</p>
                )}
                {quizScore < 3 && (
                  <p className="result-message">📖 Keep practicing! Payment safety is important.</p>
                )}

                <div className="result-details">
                  <h3>Review Your Answers:</h3>
                  {quizQuestions.map((q, index) => (
                    <div key={index} className="answer-review">
                      <div className={`answer-status ${userAnswers[index] === q.correct ? 'correct' : 'incorrect'}`}>
                        {userAnswers[index] === q.correct ? '✓' : '✗'}
                      </div>
                      <div className="answer-info">
                        <p className="question-text">{q.question}</p>
                        <p className="answer-text">
                          Your answer: <strong>{q.options[userAnswers[index]]}</strong>
                        </p>
                        {userAnswers[index] !== q.correct && (
                          <p className="correct-text">
                            Correct: <strong>{q.options[q.correct]}</strong>
                          </p>
                        )}
                        <p className="explanation">{q.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="button button-primary" onClick={resetQuiz}>
                  Done
                </button>
              </div>
            ) : (
              <div className="quiz-question">
                <div className="question-header">
                  <span className="question-number">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="question-content">
                  <h3>{quizQuestions[currentQuestion].question}</h3>
                  
                  <div className="options-list">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        className={`option-btn ${userAnswers[currentQuestion] !== undefined ? (index === quizQuestions[currentQuestion].correct ? 'correct' : index === userAnswers[currentQuestion] ? 'incorrect' : '') : ''}`}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={userAnswers[currentQuestion] !== undefined}
                      >
                        <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                        <span className="option-text">{option}</span>
                        {userAnswers[currentQuestion] !== undefined && (
                          <span className="option-feedback">
                            {index === quizQuestions[currentQuestion].correct ? '✓' : (index === userAnswers[currentQuestion] ? '✗' : '')}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {userAnswers[currentQuestion] !== undefined && (
                    <div className="answer-feedback">
                      <p><strong>Explanation:</strong> {quizQuestions[currentQuestion].explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DigitalPayments;