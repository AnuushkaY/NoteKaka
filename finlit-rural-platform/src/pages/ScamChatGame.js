import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserSecret, FaShieldAlt, FaCircle, FaRedo, FaRandom, FaBrain, FaHome } from 'react-icons/fa';
import './ScamChatGame.css';

function ScamChatGame() {
  const navigate = useNavigate();
  
  // Game State
  const [gameState, setGameState] = useState({
    trustPoints: 3,
    currentStep: 0,
    playerPath: [],
    gameOver: false,
    scamType: null,
    scamData: null,
    scamProgress: {
      stage: 'initial',
      askedFor: [],
      received: [],
      pressureLevel: 0
    }
  });

  const [chatMessages, setChatMessages] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [showEducationalScreen, setShowEducationalScreen] = useState(false);
  const [gameResult, setGameResult] = useState({ isWin: false, isPartial: false });
  const [showNotification, setShowNotification] = useState({ visible: false, message: '', type: 'info' });
  const [scamCount, setScamCount] = useState(0);
  const [showScamSelector, setShowScamSelector] = useState(true);
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);

  // Scam Templates - Updated with more scams
  const scamTemplates = {
    kyc: {
      name: 'Fake KYC/Bank Update Scam',
      icon: '🏦',
      description: 'Scammer pretends to be from your bank, claiming your account will be frozen',
      difficulty: 'medium',
      scammerPersona: {
        name: 'Bank Security Alert',
        authorityLevel: 'high',
        emotion: 'urgent',
        tactics: ['urgency', 'authority', 'fear']
      },
      stages: {
        initial: {
          messages: [
            "Hello! This is {name} from Customer Service, {bank}. Our records show your account KYC is pending update. To avoid account suspension today, please confirm your details immediately.",
            "URGENT: Your {bank} account requires immediate KYC verification. Failure to update within 2 hours will result in account freeze. Please respond now.",
            "Security Alert: {bank} has detected incomplete KYC for your account {accountNumber}. Immediate action required to prevent suspension."
          ],
          objectives: ['establish_authority', 'create_urgency'],
          nextStage: 'information_gathering'
        },
        information_gathering: {
          messages: [
            "Thank you for responding. To verify your identity, I need your registered mobile number first.",
            "I need to pull up your file. Please share your account number for verification.",
            "For security purposes, I need to confirm your date of birth and PAN number."
          ],
          objectives: ['collect_personal_info', 'build_trust'],
          nextStage: 'otp_request'
        },
        otp_request: {
          messages: [
            "Perfect! Now I'm sending an OTP to your mobile {phone} for verification. Please share the 6-digit code within 60 seconds.",
            "OTP sent to ******{lastDigits}. Share it now to complete verification before account freeze.",
            "Final step: I need the OTP sent to your number for security confirmation. Account suspension in progress!"
          ],
          objectives: ['get_otp', 'increase_pressure'],
          nextStage: 'money_request'
        },
        money_request: {
          messages: [
            "OTP verified! I see suspicious transaction of ₹{amount}. To secure funds, transfer ₹1 to this QR code for verification.",
            "Security check complete. Now transfer ₹{amount} to this secure account to activate protection.",
            "Account secured! Final step: Pay ₹{amount} processing fee to unlock full account access."
          ],
          objectives: ['get_money', 'final_pressure'],
          nextStage: 'end'
        }
      },
      responses: {
        safe: [
          "I'll contact my bank directly through their official helpline.",
          "I don't share personal information over unsolicited messages.",
          "Banks never ask for OTP. I'm reporting this to cybercrime.gov.in",
          "I'll visit my bank branch to verify this information.",
          "This sounds like a scam. I'm ending this conversation."
        ],
        risky: [
          "I never received any official notice about this.",
          "How can I verify you're really from the bank?",
          "Can you send official verification first?",
          "I'm not comfortable sharing this information.",
          "What's the official procedure for KYC update?"
        ],
        dangerous: [
          "Oh no! What do I need to do to prevent freeze?",
          "Here's my account number: {account}",
          "My mobile number is {phone}",
          "OTP received: {otp}",
          "I'll transfer the money immediately!"
        ]
      },
      variables: {
        banks: ['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak'],
        names: ['Priya Sharma', 'Rajesh Kumar', 'Anjali Mehta', 'Vikram Singh', 'Neha Patel'],
        amounts: ['5,000', '10,000', '25,000', '50,000', '1,00,000'],
        phones: ['9876543210', '9898989898'],
        accounts: ['12345678901', '98765432109']
      }
    },

    lottery: {
      name: 'Lottery/Reward Scam',
      icon: '🎰',
      description: 'You\'ve won a prize but need to pay fees first',
      difficulty: 'easy',
      scammerPersona: {
        name: 'Mega Lottery Department',
        authorityLevel: 'medium',
        emotion: 'exciting',
        tactics: ['greed', 'exclusivity', 'urgency']
      },
      stages: {
        initial: {
          messages: [
            "🎉 CONGRATULATIONS! 🎉 You've won ₹{amount} in our Mega Lucky Draw! Ticket number {ticket} was selected!",
            "YOU ARE A WINNER! ₹{amount} prize money approved! Claim within 24 hours.",
            "Official Notification: You've been selected for ₹{amount} reward! Limited time offer!"
          ],
          objectives: ['create_excitement', 'establish_prize'],
          nextStage: 'fee_request'
        },
        fee_request: {
          messages: [
            "To release your ₹{amount} prize, pay ₹{fee} processing fee via UPI to {upi}",
            "Government requires ₹{fee} TDS payment before prize transfer. Pay now!",
            "Bank clearance needs ₹{fee} verification charge. Last step to get your money!"
          ],
          objectives: ['get_initial_payment', 'build_momentum'],
          nextStage: 'additional_fees'
        },
        additional_fees: {
          messages: [
            "Great! Now need ₹{fee2} insurance fee for secure transfer. Final payment!",
            "Verification complete. Final step: ₹{fee2} document processing charge.",
            "Almost done! Pay ₹{fee2} GST charges to receive your prize immediately!"
          ],
          objectives: ['get_more_money', 'increase_pressure'],
          nextStage: 'end'
        }
      },
      responses: {
        safe: [
          "I never entered any lottery. This is a scam.",
          "Real lotteries don't ask for upfront payments.",
          "I'll verify this with the official lottery department.",
          "This sounds too good to be true.",
          "I'm reporting this fraudulent message."
        ],
        risky: [
          "Which lottery is this? I don't remember entering.",
          "Can you deduct fees from the prize money?",
          "What's the official procedure to claim?",
          "Send me official lottery documents first.",
          "Why do I need to pay to receive prize?"
        ],
        dangerous: [
          "Wow! How do I claim my prize?",
          "Here's the payment for fees.",
          "I'll pay immediately! Don't give my prize to others!",
          "Sending money now! Hurry with my prize!",
          "Take the fees and send my money quickly!"
        ]
      },
      variables: {
        amounts: ['25,00,000', '50,00,000', '10,00,000'],
        fees: ['2,500', '5,000', '10,000'],
        fee2s: ['10,000', '25,000', '50,000'],
        tickets: ['789456123', '123789456'],
        upiIds: ['lottery@okbank', 'prize@upi']
      }
    },

    emergency: {
      name: 'Emergency Money Request',
      icon: '🚨',
      description: 'Someone pretending to be family/friend needs urgent money',
      difficulty: 'medium',
      scammerPersona: {
        name: 'Family Emergency',
        authorityLevel: 'personal',
        emotion: 'desperate',
        tactics: ['fear', 'sympathy', 'urgency']
      },
      stages: {
        initial: {
          messages: [
            "Hi {relation}, this is {name}. Lost my phone, using friend's. Need ₹{amount} urgently for {emergency}!",
            "Emergency! {name} here. Need ₹{amount} immediately for {emergency}. Can't call, please help!",
            "{relation}, it's {name}. Terrible emergency! Need ₹{amount} now for {emergency}. Don't tell anyone!"
          ],
          objectives: ['establish_relationship', 'create_urgency'],
          nextStage: 'money_request'
        },
        money_request: {
          messages: [
            "Send to UPI: {upi}\nI'll repay tomorrow when I get new phone. Hurry!",
            "Transfer to {account}\nThis is life or death! Please!",
            "Use this QR code. Need within 30 minutes or {consequence}!"
          ],
          objectives: ['get_money', 'increase_pressure'],
          nextStage: 'more_money'
        },
        more_money: {
          messages: [
            "Actually need ₹{amount2} more for {reason}. Last request, promise!",
            "Complication: Need additional ₹{amount2}. Situation worse than thought.",
            "They said need ₹{amount2} more. My life depends on you!"
          ],
          objectives: ['get_more_money', 'maximize_gain'],
          nextStage: 'end'
        }
      },
      responses: {
        safe: [
          "Let me call your original number to verify.",
          "Which hospital/place are you at? I'll come directly.",
          "I need to speak with you in person first.",
          "This sounds suspicious. Verifying with family.",
          "I'll contact other relatives to confirm."
        ],
        risky: [
          "Which friend's phone are you using?",
          "Why can't I call you back?",
          "What exactly happened?",
          "I can only send partial amount.",
          "Send me a voice note to confirm."
        ],
        dangerous: [
          "Oh no! Sending money right away!",
          "Here's the UPI payment.",
          "Don't worry, I'll help immediately!",
          "Transferring now! Stay safe!",
          "Sending full amount! Get well soon!"
        ]
      },
      variables: {
        relations: ['beta', 'dear', 'bro', 'sis'],
        names: ['Seema', 'Ramesh', 'Anil', 'Sunita'],
        emergencies: ['hospital operation', 'accident treatment', 'police bail'],
        amounts: ['50,000', '25,000', '1,00,000'],
        amounts2: ['25,000', '50,000'],
        consequences: ['I\'ll lose my job', 'they\'ll arrest me'],
        reasons: ['medicines', 'doctor fees'],
        accounts: ['HDFC123456789', 'ICICI987654321']
      }
    }
  };

  // Helper Functions
  const generateScammerMessage = (scamType, stage) => {
    const template = scamTemplates[scamType];
    if (!template || !template.stages[stage]) return "Error generating message";
    
    const stageData = template.stages[stage];
    const messages = stageData.messages;
    const variables = template.variables;
    
    let message = messages[Math.floor(Math.random() * messages.length)];
    
    message = message.replace(/{(\w+)}/g, (match, variable) => {
      if (variables[variable]) {
        const options = variables[variable];
        return options[Math.floor(Math.random() * options.length)];
      }
      
      if (variable === 'lastDigits') {
        return Math.floor(Math.random() * 90 + 10).toString();
      }
      if (variable === 'otp') {
        return Math.floor(100000 + Math.random() * 900000).toString();
      }
      
      return match;
    });
    
    return message;
  };

  const generateResponseOptions = (scamType, stage, trustPoints) => {
    const template = scamTemplates[scamType];
    if (!template) return [];
    
    const responses = template.responses;
    
    const safeResponses = [...responses.safe];
    const riskyResponses = [...responses.risky];
    const dangerousResponses = [...responses.dangerous];
    
    const selectedSafe = safeResponses[Math.floor(Math.random() * safeResponses.length)];
    const selectedRisky = riskyResponses[Math.floor(Math.random() * riskyResponses.length)];
    const selectedDangerous = dangerousResponses[Math.floor(Math.random() * dangerousResponses.length)];
    
    const options = [
      {
        text: selectedSafe,
        type: "safe",
        trustEffect: 1,
        nextAction: getNextActionForResponse('safe', stage, scamType, trustPoints)
      },
      {
        text: selectedRisky,
        type: "risky",
        trustEffect: 0,
        nextAction: getNextActionForResponse('risky', stage, scamType, trustPoints)
      },
      {
        text: selectedDangerous,
        type: "danger",
        trustEffect: -1,
        nextAction: getNextActionForResponse('danger', stage, scamType, trustPoints)
      }
    ];
    
    if (trustPoints <= 1) {
      return options.filter(opt => opt.type !== 'safe');
    }
    
    return shuffleArray(options);
  };

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const getNextActionForResponse = (responseType, currentStage, scamType, trustPoints) => {
    const template = scamTemplates[scamType];
    const stageData = template.stages[currentStage];
    
    if (responseType === 'safe') {
      if (currentStage === 'initial') {
        return { type: 'next_stage', stage: stageData.nextStage, winChance: 0.2 };
      } else if (trustPoints >= 2) {
        return { type: 'win', probability: 0.6 + (trustPoints * 0.1) };
      } else {
        return { type: 'next_stage', stage: stageData.nextStage, winChance: 0.3 };
      }
    } else if (responseType === 'risky') {
      return { type: 'next_stage', stage: stageData.nextStage, winChance: 0.1 };
    } else {
      if (currentStage === 'money_request') {
        return { type: 'lose', probability: 0.5 + ((3 - trustPoints) * 0.1) };
      }
      return { type: 'next_stage', stage: stageData.nextStage, winChance: 0 };
    }
  };

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#666';
    }
  };

  const getPressureMessage = (scamType) => {
    const messages = {
      kyc: ["FINAL WARNING: Account freeze in 10 minutes!"],
      lottery: ["LAST CHANCE: Prize forfeiture in 30 minutes!"],
      emergency: ["URGENT: Situation critical now!"]
    };
    
    const msgList = messages[scamType] || messages.kyc;
    return msgList[Math.floor(Math.random() * msgList.length)];
  };

  // Game Functions
  const initGame = (scamId = null) => {
    let selectedScam;
    
    if (scamId && scamTemplates[scamId]) {
      selectedScam = scamId;
    } else {
      const availableScams = Object.keys(scamTemplates);
      selectedScam = availableScams[Math.floor(Math.random() * availableScams.length)];
    }
    
    const template = scamTemplates[selectedScam];
    
    setGameState({
      trustPoints: 3,
      currentStep: 0,
      playerPath: [],
      gameOver: false,
      scamType: selectedScam,
      scamData: template,
      scamProgress: {
        stage: 'initial',
        askedFor: [],
        received: [],
        pressureLevel: 0
      }
    });
    setChatMessages([]);
    setCurrentOptions([]);
    setShowEducationalScreen(false);
    setShowScamSelector(false);
    
    setTimeout(() => {
      const initialMessage = generateScammerMessage(selectedScam, 'initial');
      addScammerMessage(initialMessage, template.scammerPersona.name);
      setTimeout(() => {
        showOptionsForStage(selectedScam, 'initial', 3);
      }, 1500);
    }, 500);
  };

  const addScammerMessage = (message, senderName) => {
    const newMessage = {
      id: Date.now(),
      type: 'scammer',
      content: String(message),
      time: getCurrentTime(),
      sender: senderName
    };
    
    setChatMessages(prev => [...prev, newMessage]);
  };

  const addPlayerMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      type: 'player',
      content: String(message),
      time: getCurrentTime()
    };
    
    setChatMessages(prev => [...prev, newMessage]);
  };

  const showOptionsForStage = (scamType, stage, trustPoints) => {
    const options = generateResponseOptions(scamType, stage, trustPoints);
    setCurrentOptions(options);
  };

  const handleOptionClick = (option) => {
    if (gameState.gameOver || isGeneratingMessage) return;
    
    setIsGeneratingMessage(true);
    
    addPlayerMessage(option.text);
    
    const newTrustPoints = Math.max(0, Math.min(3, gameState.trustPoints + option.trustEffect));
    
    const updatedProgress = { ...gameState.scamProgress };
    
    if (option.type === 'danger') {
      if (option.text.includes('account') || option.text.includes('mobile') || option.text.includes('PAN')) {
        updatedProgress.received.push('personal_info');
      }
      if (option.text.includes('OTP') || option.text.includes('code')) {
        updatedProgress.received.push('otp');
      }
      if (option.text.includes('send') || option.text.includes('transfer') || option.text.includes('payment')) {
        updatedProgress.received.push('money');
      }
    }
    
    updatedProgress.pressureLevel += option.type === 'danger' ? 1 : option.type === 'safe' ? -0.5 : 0;
    
    setGameState(prev => ({
      ...prev,
      trustPoints: newTrustPoints,
      playerPath: [...prev.playerPath, {
        choice: option.text,
        type: option.type
      }],
      scamProgress: updatedProgress
    }));
    
    setCurrentOptions([]);
    
    setTimeout(() => {
      processNextAction(option.nextAction, gameState.scamType, gameState.scamProgress.stage);
      setIsGeneratingMessage(false);
    }, 1500);
  };

  const processNextAction = (action, scamType, currentStage) => {
    const template = scamTemplates[scamType];
    
    switch (action.type) {
      case 'next_stage':
        const nextStage = action.stage;
        const updatedProgress = { 
          ...gameState.scamProgress, 
          stage: nextStage,
          pressureLevel: gameState.scamProgress.pressureLevel + 1
        };
        
        setGameState(prev => ({
          ...prev,
          scamProgress: updatedProgress
        }));
        
        if (Math.random() < action.winChance) {
          endGame(true, false);
          return;
        }
        
        if (nextStage === 'end') {
          endGame(false, gameState.scamProgress.received.length > 0);
          return;
        }
        
        setTimeout(() => {
          const nextMessage = generateScammerMessage(scamType, nextStage);
          addScammerMessage(nextMessage, template.scammerPersona.name);
          
          setTimeout(() => {
            showOptionsForStage(scamType, nextStage, gameState.trustPoints);
          }, 1500);
        }, 1000);
        break;
        
      case 'win':
        if (Math.random() < action.probability) {
          endGame(true, false);
        } else {
          const nextMessage = generateScammerMessage(scamType, currentStage);
          addScammerMessage(nextMessage + "\n" + getPressureMessage(scamType), template.scammerPersona.name);
          
          setTimeout(() => {
            showOptionsForStage(scamType, currentStage, gameState.trustPoints);
          }, 1500);
        }
        break;
        
      case 'lose':
        if (Math.random() < action.probability) {
          endGame(false, gameState.scamProgress.received.length > 0);
        } else {
          const nextMessage = generateScammerMessage(scamType, currentStage);
          addScammerMessage(nextMessage, template.scammerPersona.name);
          
          setTimeout(() => {
            showOptionsForStage(scamType, currentStage, gameState.trustPoints);
          }, 1500);
        }
        break;
    }
  };

  const endGame = (isWin, isPartial) => {
    setGameResult({ isWin, isPartial });
    setGameState(prev => ({ ...prev, gameOver: true }));
    
    const finalMessage = getFinalMessage(gameState.scamType, isWin, isPartial);
    addScammerMessage(finalMessage, scamTemplates[gameState.scamType]?.scammerPersona.name || "Scammer");
    
    setTimeout(() => {
      setShowEducationalScreen(true);
      setScamCount(prev => prev + 1);
    }, 2000);
  };

  const getFinalMessage = (scamType, isWin, isPartial) => {
    if (isWin) {
      const wins = {
        kyc: "[Scam detected and blocked]\nYou successfully protected your bank account!",
        lottery: "[Lottery scam avoided]\nYou didn't fall for fake prize promises!",
        emergency: "[Emergency verified as fake]\nYou checked before sending money!"
      };
      return wins[scamType] || wins.kyc;
    } else {
      if (isPartial) {
        const partials = {
          kyc: "Partial information shared. Account may be at risk. Learn and try again!",
          lottery: "Some fees paid but prize never arrives. You lost money to lottery scam!",
          emergency: "Partial payment sent. The emergency was completely fake!"
        };
        return partials[scamType] || partials.kyc;
      } else {
        const losses = {
          kyc: "All payments completed! Your bank account has been emptied. Lesson learned!",
          lottery: "All fees paid! Your 'prize' is imaginary. Money lost to scam!",
          emergency: "All money transferred! The emergency was entirely fictional!"
        };
        return losses[scamType] || losses.kyc;
      }
    }
  };

  // Render Functions
  const renderMessages = () => {
    return chatMessages.map((msg) => {
      const content = String(msg.content || '');
      
      return (
        <div
          key={msg.id}
          className={`chat-message ${msg.type === 'scammer' ? 'scammer-message' : 'player-message'}`}
        >
          {msg.type === 'scammer' && (
            <div className="scammer-name">
              <FaUserSecret /> {msg.sender || 'Unknown'}
            </div>
          )}
          <div className="message-content">
            {content.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < content.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
          <div className={`message-time ${msg.type === 'scammer' ? 'scammer-time' : 'player-time'}`}>
            {msg.time}
          </div>
        </div>
      );
    });
  };

  const renderOptions = () => {
    return currentOptions.map((option, index) => {
      const isFaded = option.type === 'safe' && gameState.trustPoints <= 1;
      
      return (
        <button
          key={index}
          className={`option-button ${isFaded ? 'faded-option' : ''}`}
          onClick={() => !isFaded && handleOptionClick(option)}
          disabled={isFaded || isGeneratingMessage}
          title={isFaded ? "This option is unavailable due to low trust" : ""}
        >
          {option.text}
        </button>
      );
    });
  };

  const renderEducationalScreen = () => {
  if (!showEducationalScreen) return null;
  
  const { isWin, isPartial } = gameResult;
  const scamData = gameState.scamData;
  
  const analyzeChoices = () => {
    const choices = gameState.playerPath;
    const goodChoices = choices.filter(c => c.type === 'safe').map(c => c.choice);
    const badChoices = choices.filter(c => c.type === 'danger').map(c => c.choice);
    const riskyChoices = choices.filter(c => c.type === 'risky').map(c => c.choice);
    
    return { goodChoices, badChoices, riskyChoices };
  };
  
  const { goodChoices, badChoices, riskyChoices } = analyzeChoices();
  
  // Get a different random scam than the current one
  const getDifferentRandomScam = () => {
    const availableScams = Object.keys(scamTemplates);
    if (availableScams.length <= 1) return gameState.scamType;
    
    let randomScam;
    do {
      randomScam = availableScams[Math.floor(Math.random() * availableScams.length)];
    } while (randomScam === gameState.scamType && availableScams.length > 1);
    
    return randomScam;
  };
  
  return (
    <div className="educational-screen">
      <div className="educational-content">
        <div className={`educational-icon ${isWin ? 'win-icon' : 'lose-icon'}`}>
          {isWin ? '🎉' : '💀'}
        </div>
        
        <h1 className={`educational-title ${isWin ? 'win-title' : 'lose-title'}`}>
          {isWin ? (isPartial ? '⚠️ Partial Success' : '✅ Scam Defeated!') : 
                   (isPartial ? '💸 Partial Loss' : '💀 Scam Succeeded')}
        </h1>
        
        <div className="educational-details">
          <h3 className="educational-details-title">{scamData?.name || 'Scam'}</h3>
          
          {/* Result Summary */}
          <div className="result-summary-box">
            <div className="result-summary">
              <div className="result-stat">
                <span className="result-stat-label">Final Result:</span>
                <span className={`result-stat-value ${isWin ? 'win-text' : 'lose-text'}`}>
                  {isWin ? (isPartial ? 'Partial Win' : 'Complete Win') : 
                          (isPartial ? 'Partial Loss' : 'Complete Loss')}
                </span>
              </div>
              <div className="result-stat">
                <span className="result-stat-label">Trust Level:</span>
                <span className={`result-stat-value trust-${gameState.trustPoints}`}>
                  {gameState.trustPoints}/3
                </span>
              </div>
              <div className="result-stat">
                <span className="result-stat-label">Choices Made:</span>
                <span className="result-stat-value">{gameState.playerPath.length}</span>
              </div>
            </div>
          </div>
          
          {/* Choice Analysis */}
          <div className="choice-analysis">
            {badChoices.length > 0 && (
              <div className="choice-category">
                <h4 className="dangerous-choices-title">⚠️ Dangerous Choices ({badChoices.length})</h4>
                <div className="choice-list-container">
                  <ul className="educational-list dangerous-list">
                    {badChoices.slice(0, 3).map((choice, index) => (
                      <li key={index} className="dangerous-item">
                        ❌ {choice.length > 80 ? choice.substring(0, 80) + '...' : choice}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {riskyChoices.length > 0 && (
              <div className="choice-category">
                <h4 className="risky-choices-title">⚠️ Risky Choices ({riskyChoices.length})</h4>
                <div className="choice-list-container">
                  <ul className="educational-list risky-list">
                    {riskyChoices.slice(0, 3).map((choice, index) => (
                      <li key={index} className="risky-item">
                        ⚠️ {choice.length > 80 ? choice.substring(0, 80) + '...' : choice}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            {goodChoices.length > 0 && (
              <div className="choice-category">
                <h4 className="good-choices-title">✅ Smart Choices ({goodChoices.length})</h4>
                <div className="choice-list-container">
                  <ul className="educational-list good-list">
                    {goodChoices.slice(0, 3).map((choice, index) => (
                      <li key={index} className="good-item">
                        ✓ {choice.length > 80 ? choice.substring(0, 80) + '...' : choice}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          <div className="protection-tips">
            <h4 className="protection-title">💡 Protection Tips:</h4>
            <div className="tips-list">
              <div className="tip-item">✅ Never share OTP, password, or PIN</div>
              <div className="tip-item">✅ Verify through official channels</div>
              <div className="tip-item">✅ Real institutions don't create false urgency</div>
              <div className="tip-item">✅ If it sounds too good to be true, it probably is</div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons - All in one row */}
        <div className="educational-action-buttons">
          <div className="button-row">
            {/* Try Same Scam */}
            <button 
              className="educational-button try-again-button"
              onClick={() => {
                initGame(gameState.scamType);
              }}
              title="Play the same scam again"
            >
              <FaRedo /> Same Scam
            </button>
            
            {/* Try Different Scam */}
            <button 
              className="educational-button different-button"
              onClick={() => {
                const differentScam = getDifferentRandomScam();
                initGame(differentScam);
              }}
              title="Try a different scam"
              disabled={Object.keys(scamTemplates).length <= 1}
            >
              <FaRandom /> Different Scam
            </button>
            
            {/* Random Scam */}
            <button 
              className="educational-button random-button"
              onClick={() => {
                const availableScams = Object.keys(scamTemplates);
                const randomScam = availableScams[Math.floor(Math.random() * availableScams.length)];
                initGame(randomScam);
              }}
              title="Try a completely random scam"
            >
              <FaRandom /> Random Scam
            </button>
            
            {/* HOME BUTTON - Added here */}
            <button 
              className="educational-button home-button"
              onClick={() => setShowScamSelector(true)}
              title="Return to scam selection screen"
            >
              <FaHome /> Home
            </button>
          </div>
          
          {/* Back to Games button */}
          <div className="back-to-game-button">
            <button 
              className="educational-button back-button"
              onClick={() => navigate('/games')}
              title="Go back to games menu"
            >
              ← Back to Games Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
  const renderScamSelector = () => {
  if (!showScamSelector) return null;
  
  return (
    <div className="scam-selector-overlay">
      <div className="scam-selector">
        {/* Header with title and home button */}
        <div className="selector-header">
          <h1 className="selector-title">🎮 Scam Defense Trainer</h1>
          <button 
            className="selector-home-button"
            onClick={() => navigate('/games')}
            title="Go back to games menu"
          >
            <FaHome /> Back to Games
          </button>
        </div>
        
        <p className="selector-description">
          Learn to identify and avoid online scams through realistic chat simulations.
          No hints during gameplay - you'll learn from your choices at the end!
        </p>
        
        <div className="selector-stats">
          <div className="selector-stat">
            <span className="stat-label">Scams Played:</span>
            <span className="stat-value">{scamCount}</span>
          </div>
          <div className="selector-stat">
            <span className="stat-label">Scam Types:</span>
            <span className="stat-value">{Object.keys(scamTemplates).length}</span>
          </div>
          <div className="selector-stat">
            <span className="stat-label">Goal:</span>
            <span className="stat-value">Recognize patterns!</span>
          </div>
        </div>
        
        <div className="scam-grid">
          {Object.entries(scamTemplates).map(([id, template]) => (
            <div
              key={id}
              className="scam-card"
              onClick={() => {
                initGame(id);
              }}
              style={{
                borderColor: getDifficultyColor(template.difficulty)
              }}
            >
              <div className="scam-icon">{template.icon}</div>
              <div className="scam-name">{template.name}</div>
              <div className="scam-description">{template.description}</div>
              <div 
                className="difficulty-badge"
                style={{
                  backgroundColor: getDifficultyColor(template.difficulty)
                }}
              >
                {template.difficulty.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="random-scam-button"
          onClick={() => {
            initGame();
          }}
        >
          <FaRandom /> Random Scam
        </button>
        
        {/* Alternative home button at bottom */}
        <div className="selector-bottom-buttons">
          <button 
            className="selector-home-bottom"
            onClick={() => navigate('/games')}
          >
            <FaHome /> Return to Games Menu
          </button>
        </div>
        
        <div className="selector-info">
          <p className="info-title">🎯 How to Play:</p>
          <p className="info-text">
            <strong>During gameplay:</strong> No hints or icons - just read carefully and choose what you think is best.<br/>
            <strong>After the game:</strong> You'll see which choices were safe (✅), risky (⚠️), or dangerous (❌), with explanations.
          </p>
        </div>
      </div>
    </div>
  );
};

  // Initialize on component mount
  useEffect(() => {
    setShowScamSelector(true);
  }, []);

  return (
    <div className="scam-chat-container">
      <div className="game-header">
        <button className="back-button" onClick={() => navigate('/games')}>
          ← Back
        </button>
        <h1>🛡️ Scam Defense Trainer</h1>
        <div className="game-stats">
          <div className="stat">
            <span className="stat-label">Scams:</span>
            <span className="stat-value">{scamCount}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Trust:</span>
            <span className="stat-value">{gameState.trustPoints}/3</span>
          </div>
          <div className="stat">
            <span className="stat-label">Stage:</span>
            <span className="stat-value">
              {gameState.scamProgress?.stage?.replace('_', ' ') || 'Start'}
            </span>
          </div>
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <div className="scammer-info">
            <div className="scammer-avatar">
              <FaUserSecret />
            </div>
            <div className="scammer-details">
              <h3 className="scammer-name-display">
                {gameState.scamData?.scammerPersona?.name || 'Select a Scam'}
              </h3>
              <p className="scammer-status">
                <FaCircle className="online-indicator" /> Online
              </p>
            </div>
          </div>
          <div className="trust-display">
            <FaShieldAlt className="shield-icon" />
            <span className={`trust-value trust-${gameState.trustPoints}`}>
              Trust: {gameState.trustPoints}/3
            </span>
          </div>
        </div>

        <div className="chat-area">
          {renderMessages()}
        </div>

        <div className="options-area">
          {renderOptions()}
        </div>
      </div>

      {isGeneratingMessage && (
        <div className="generating-overlay">
          <div className="generating-indicator">
            <FaBrain className="brain-icon" />
            <span className="generating-text">Person is typing...</span>
          </div>
        </div>
      )}

      {renderEducationalScreen()}
      {renderScamSelector()}
    </div>
  );
  
}

export default ScamChatGame;