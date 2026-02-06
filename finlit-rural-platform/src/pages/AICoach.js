import React, { useState, useContext, useRef, useEffect } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { VoiceContext } from '../context/VoiceContext';
import '../styles/AICoach.css';

function AICoach() {
  const { translate } = useContext(LanguageContext);
  const { isVoiceMode, speakText } = useContext(VoiceContext);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI Finance Coach. I can help you with savings, loans, digital payments, and more. Ask me anything!", sender: 'ai', timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "How to save ₹100 daily?",
    "Is taking a loan for festival shopping good?",
    "How to check if a UPI payment is safe?",
    "What documents needed for PM Kisan?",
    "Best way to save for my child's education"
  ];

  const tips = [
    "Save before you spend, not after.",
    "Small regular savings grow bigger than occasional large amounts.",
    "Always verify UPI ID before sending money.",
    "Keep 3 months' expenses as emergency fund.",
    "Read loan documents carefully before signing."
  ];

  const warningTriggers = ['loan shark', 'high interest', 'quick money', 'investment doubling', 'no documents loan'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSlideClick = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Check for warning triggers
    const hasWarning = warningTriggers.some(trigger => 
      inputText.toLowerCase().includes(trigger)
    );

    // Simulate AI thinking
    setTimeout(() => {
      let aiResponse = generateAIResponse(inputText, hasWarning);
      
      // Add AI message
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        warning: hasWarning
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Speak response if voice mode is on
      if (isVoiceMode) {
        speakText(aiResponse.substring(0, 200)); // Limit speech length
      }
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setInputText(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
    setShowQuickQuestions(false);
  };

  const generateAIResponse = (userQuestion, hasWarning) => {
    const question = userQuestion.toLowerCase();
    
    if (hasWarning) {
      return "⚠️ WARNING: This sounds risky! I strongly advise you to consult with a trusted human advisor or visit your local bank before proceeding. Never share personal documents with unknown agents. If you're unsure, always choose the safer option and talk to someone you trust.";
    }

    if (question.includes('save') || question.includes('saving')) {
      return "For saving ₹100 daily: 1) Keep a piggy bank at home 2) Use digital savings apps 3) Round up purchases and save the change 4) Save first thing in the morning. Remember: ₹100 daily = ₹36,500 yearly! Start small, stay consistent.";
    } else if (question.includes('loan') || question.includes('debt')) {
      return "Loans for festivals or wants are usually not recommended. Good loans are for: 1) Education 2) Business expansion 3) Emergency medical needs. Bad loans: 1) Shopping 2) Parties 3) Status symbols. Always check interest rates and read terms carefully.";
    } else if (question.includes('upi') || question.includes('payment')) {
      return "To check UPI safety: 1) Verify recipient name matches exactly 2) Check UPI ID format (name@bank) 3) Never share UPI PIN 4) Use trusted networks only 5) Enable transaction alerts. If in doubt, ask the person to confirm their UPI ID verbally.";
    } else if (question.includes('document') || question.includes('kisan')) {
      return "For PM Kisan scheme: Documents needed: 1) Aadhaar card 2) Bank account details 3) Land ownership records 4) Mobile number linked to Aadhaar. Visit your nearest CSC or agriculture department office for help. Never pay anyone for scheme applications.";
    } else if (question.includes('education') || question.includes('child')) {
      return "For child's education savings: 1) Start a recurring deposit 2) Explore Sukanya Samriddhi for girls 3) Consider PPF for long-term 4) Save 10% of income specifically for education. Even ₹500/month for 18 years can grow significantly with interest.";
    } else {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      return `I understand you're asking about "${userQuestion}". Here's what I suggest: Start by speaking with someone you trust about this. For specific guidance, I recommend visiting your local bank or talking to a financial counselor. \n\n💡 Daily Tip: ${randomTip}\n\nIf you need more detailed help, please click the "Talk to Human" button below.`;
    }
  };

  const handleTalkToHuman = () => {
    const aiMessage = {
      id: messages.length + 1,
      text: "Good decision! I'm connecting you with human help options. Please visit the 'Help' page for contact details of local NGOs, banks, and government offices who can provide personalized assistance. They can help with complex situations that need human judgment.",
      sender: 'ai',
      timestamp: new Date(),
      isHumanRedirect: true
    };
    setMessages(prev => [...prev, aiMessage]);
  };

  const clearChat = () => {
    setMessages([
      { id: 1, text: "Hello! I'm your AI Finance Coach. I can help you with savings, loans, digital payments, and more. Ask me anything!", sender: 'ai', timestamp: new Date() }
    ]);
    setShowQuickQuestions(true);
  };

  return (
    <div className="ai-coach">
      <div className="coach-header">
        <h1>AI Finance Coach</h1>
        <p>Your friendly guide for financial questions. Simple answers in your language.</p>
        <div className="coach-status">
          <div className="status-indicator online">
            <span className="status-dot"></span>
            Available 24/7
          </div>
          <div className="voice-status">
            {isVoiceMode ? '🎤 Voice Mode Active' : '🔊 Tap mic icon to enable voice'}
          </div>
        </div>
      </div>

      <div className="intro-video-section">
        <div className="video-container">
          <div className="animated-intro">
            <div className="intro-animation">
              <div className={`animation-slide slide-1 ${currentSlide === 0 ? 'active' : ''}`}>
                <div className="slide-content">
                  <div className="slide-icon">📚</div>
                  <h3>Learn at Your Pace</h3>
                  <p>Interactive lessons on savings, loans, digital payments, and government schemes</p>
                </div>
              </div>
              
              <div className={`animation-slide slide-2 ${currentSlide === 1 ? 'active' : ''}`}>
                <div className="slide-content">
                  <div className="slide-icon">🤖</div>
                  <h3>AI Coach 24/7</h3>
                  <p>Get instant answers to your financial questions anytime</p>
                </div>
              </div>
              
              <div className={`animation-slide slide-3 ${currentSlide === 2 ? 'active' : ''}`}>
                <div className="slide-content">
                  <div className="slide-icon">🎯</div>
                  <h3>Personalized Guidance</h3>
                  <p>Learning paths tailored to your financial situation</p>
                </div>
              </div>
              
              <div className={`animation-slide slide-4 ${currentSlide === 3 ? 'active' : ''}`}>
                <div className="slide-content">
                  <div className="slide-icon">🛡️</div>
                  <h3>Stay Safe</h3>
                  <p>Protection against scams and risky financial decisions</p>
                </div>
              </div>
            </div>
            <div className="slide-indicators">
              <button 
                className={`indicator ${currentSlide === 0 ? 'active' : ''}`} 
                onClick={() => handleSlideClick(0)}
              ></button>
              <button 
                className={`indicator ${currentSlide === 1 ? 'active' : ''}`} 
                onClick={() => handleSlideClick(1)}
              ></button>
              <button 
                className={`indicator ${currentSlide === 2 ? 'active' : ''}`} 
                onClick={() => handleSlideClick(2)}
              ></button>
              <button 
                className={`indicator ${currentSlide === 3 ? 'active' : ''}`} 
                onClick={() => handleSlideClick(3)}
              ></button>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '0.95rem' }}>
            ✨ How our platform helps you with financial literacy
          </p>
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender} ${message.warning ? 'warning' : ''}`}
            >
              <div className="message-header">
                <div className="sender-avatar">
                  {message.sender === 'ai' ? '🤖' : '👤'}
                </div>
                <div className="sender-name">
                  {message.sender === 'ai' ? 'AI Coach' : 'You'}
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              <div className="message-content">
                {message.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                {message.isHumanRedirect && (
                  <div className="human-redirect">
                    <button 
                      className="button button-primary"
                      onClick={() => window.location.href = '/help'}
                    >
                      Go to Help Page
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message ai typing">
              <div className="message-header">
                <div className="sender-avatar">🤖</div>
                <div className="sender-name">AI Coach</div>
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {showQuickQuestions && (
          <div className="quick-questions">
            <h3>Quick Questions to Ask:</h3>
            <div className="questions-grid">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  className="question-chip"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="chat-input-area">
          <div className="input-container">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your financial question here..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="chat-input"
            />
            <div className="input-actions">
              <button 
                className="send-button"
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
              >
                Send
              </button>
            </div>
          </div>
          
          <div className="chat-actions">
            <button 
              className="action-button human-help"
              onClick={handleTalkToHuman}
            >
              👥 Talk to Human
            </button>
            <button 
              className="action-button clear"
              onClick={clearChat}
            >
              🗑️ Clear Chat
            </button>
            <button className="action-button tips">
              💡 Get Daily Tip
            </button>
          </div>
          
          <div className="chat-disclaimer">
            <p>⚠️ Disclaimer: I'm an AI assistant. For complex financial decisions, loans, or investments, please consult with a qualified human advisor.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AICoach;