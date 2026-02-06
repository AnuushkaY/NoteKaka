export const dummyData = {
  users: [
    {
      id: 1,
      name: 'Ram Singh',
      type: 'farmer',
      location: 'Rajasthan',
      incomeRange: '15000-25000',
      savings: 1850,
      streak: 12,
      completedLessons: [1],
      personality: {
        riskLevel: 'medium',
        awarenessLevel: 'beginner',
        needs: ['savings', 'crop_insurance', 'government_schemes']
      }
    },
    {
      id: 2,
      name: 'Asha Devi',
      type: 'shopkeeper',
      location: 'Uttar Pradesh',
      incomeRange: '8000-12000',
      savings: 3200,
      streak: 8,
      completedLessons: [1, 2],
      personality: {
        riskLevel: 'low',
        awarenessLevel: 'intermediate',
        needs: ['business_management', 'digital_payments', 'micro_loans']
      }
    }
  ],

  villages: [
    {
      name: 'Sikar District',
      state: 'Rajasthan',
      learners: 1250,
      successStories: 45,
      activeThisWeek: 120
    },
    {
      name: 'Gorakhpur District',
      state: 'Uttar Pradesh',
      learners: 980,
      successStories: 32,
      activeThisWeek: 85
    },
    {
      name: 'Madurai District',
      state: 'Tamil Nadu',
      learners: 1560,
      successStories: 67,
      activeThisWeek: 142
    }
  ],

  dailyTips: [
    "Put aside savings money before spending on wants.",
    "Check UPI ID twice before sending money.",
    "Save ₹10 daily = ₹3,650 yearly with just one cup of tea less.",
    "Never share OTP or UPI PIN with anyone, even bank staff.",
    "Keep emergency fund equal to 3 months expenses.",
    "Read loan documents carefully before signing.",
    "Verify government scheme details on official websites only.",
    "Start saving for festivals at least 6 months in advance.",
    "Keep business and personal money separate.",
    "Teach one family member about digital payments safety."
  ],

  notifications: [
    {
      id: 1,
      type: 'reminder',
      title: 'Continue your learning streak!',
      message: 'You have a 12-day streak. Learn today to keep it going!',
      timestamp: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Lesson Completed!',
      message: 'You completed "Smart Savings" and earned 50 points',
      timestamp: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'tip',
      title: 'Daily Tip',
      message: 'Save ₹100 first thing in morning before any spending',
      timestamp: '2 days ago',
      read: true
    }
  ],

  leaderboard: [
    { rank: 1, name: 'Ramesh Patel', points: 1250, village: 'Gujarat', streak: 21 },
    { rank: 2, name: 'Sunita Devi', points: 980, village: 'Bihar', streak: 18 },
    { rank: 3, name: 'Kumar Reddy', points: 875, village: 'Andhra', streak: 15 },
    { rank: 4, name: 'Priya Sharma', points: 760, village: 'Tamil Nadu', streak: 12 },
    { rank: 5, name: 'Ajay Singh', points: 650, village: 'Rajasthan', streak: 10 }
  ],

  quizQuestions: [
    {
      id: 1,
      question: 'What is the safest way to save small amounts daily?',
      options: [
        'Keep cash in different hiding places at home',
        'Use a locked piggy bank or digital savings app',
        'Give money to a trusted neighbor for safekeeping',
        'Convert to gold immediately'
      ],
      correctAnswer: 1,
      explanation: 'A locked piggy bank or digital app helps prevent casual spending while keeping money safe.'
    },
    {
      id: 2,
      question: 'When should you share your UPI PIN?',
      options: [
        'With family members for emergency',
        'With bank executive on phone',
        'With shopkeeper for quick payment',
        'Never share with anyone'
      ],
      correctAnswer: 3,
      explanation: 'UPI PIN is like your ATM PIN. Never share it with anyone, including bank staff or family.'
    }
  ],

  paymentMethods: {
    upi: {
      name: 'UPI',
      steps: [
        'Open UPI app (Google Pay, PhonePe, Paytm)',
        'Select "Send Money"',
        'Enter UPI ID or mobile number',
        'Enter amount and purpose',
        'Enter UPI PIN to confirm'
      ],
      safetyTips: [
        'Verify recipient name before paying',
        'Check UPI ID format (name@bank)',
        'Never share UPI PIN',
        'Use trusted network only'
      ]
    },
    qr: {
      name: 'QR Code',
      steps: [
        'Open UPI app',
        'Tap "Scan QR Code"',
        'Point camera at merchant QR',
        'Enter amount and verify',
        'Enter UPI PIN'
      ],
      safetyTips: [
        'Check shop name on QR code',
        'Avoid scanning random QR codes',
        'Verify amount before paying',
        'Get payment confirmation'
      ]
    }
  }
};