export const stories = [
  {
    id: 1,
    title: 'Ram Singh\'s Harvest Savings',
    character: 'Ram Singh, Farmer',
    location: 'Rajasthan Village',
    category: 'farmer',
    icon: '👨‍🌾',
    duration: '10 min',
    lessons: 4,
    description: 'A farmer learns to save from each harvest for seeds and emergencies.',
    keyLessons: [
      'Save 10% from every harvest immediately',
      'Separate savings for different needs',
      'Plan for festival expenses in advance',
      'Keep emergency fund for crop failure'
    ],
    steps: [
      {
        situation: 'Ram just sold his wheat crop for ₹40,000. He needs to buy seeds for next season (₹10,000), save for Diwali (₹5,000), and has other expenses.',
        choices: [
          {
            text: 'Spend everything now on immediate needs',
            reason: 'Needs are urgent, can save later',
            consequence: 'Ram faces shortage during next sowing season',
            isGood: false
          },
          {
            text: 'Save 10% first, then spend the rest',
            reason: 'Pay yourself first, then manage expenses',
            consequence: 'Ram has ₹4,000 saved and learns to manage with ₹36,000',
            isGood: true
          },
          {
            text: 'Take a loan for seeds and spend cash on festival',
            reason: 'Enjoy now, pay later',
            consequence: 'Ram gets trapped in debt cycle with high interest',
            isGood: false
          }
        ]
      },
      {
        situation: 'Three months later, monsoon is weak and crops need irrigation. Water pump repair costs ₹3,000.',
        choices: [
          {
            text: 'Use savings for repair',
            reason: 'Emergency situation needs immediate attention',
            consequence: 'Crops saved, emergency fund used properly',
            isGood: true
          },
          {
            text: 'Ignore repair, hope for rain',
            reason: 'Save money, maybe rain will come',
            consequence: 'Crop yield reduces by 50%',
            isGood: false
          },
          {
            text: 'Take high-interest loan from local lender',
            reason: 'Quick money without touching savings',
            consequence: 'Ends up paying back ₹5,000 for ₹3,000 loan',
            isGood: false
          }
        ]
      },
      {
        situation: 'Diwali is coming. Ram has saved ₹2,000 but needs ₹5,000 for celebrations.',
        choices: [
          {
            text: 'Celebrate simply with available money',
            reason: 'Live within means, avoid debt',
            consequence: 'Happy festival without financial stress',
            isGood: true
          },
          {
            text: 'Buy on credit from shopkeeper',
            reason: 'Festival comes once a year, enjoy fully',
            consequence: 'Pays 25% extra due to credit prices',
            isGood: false
          },
          {
            text: 'Use remaining seed money for festival',
            reason: 'Will manage seeds somehow later',
            consequence: 'Next season planting delayed, lower yield',
            isGood: false
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Asha\'s Tailoring Shop',
    character: 'Asha Devi, Tailor',
    location: 'Uttar Pradesh Town',
    category: 'shopkeeper',
    icon: '👩‍🏭',
    duration: '12 min',
    lessons: 5,
    description: 'A homemaker starts a tailoring business with a micro-loan.',
    keyLessons: [
      'Separate business and personal money',
      'Keep simple records of income/expenses',
      'Save for equipment maintenance',
      'Plan for seasonal variations in business'
    ],
    steps: [
      {
        situation: 'Asha gets ₹20,000 micro-loan to buy sewing machine. She earns ₹8,000 monthly from tailoring.',
        choices: [
          {
            text: 'Mix business and household money',
            reason: 'All money is same, easier to manage',
            consequence: 'Cannot track business profit, loan repayment becomes difficult',
            isGood: false
          },
          {
            text: 'Keep separate boxes for business and home',
            reason: 'Clear separation helps tracking',
            consequence: 'Asha knows exactly her business earnings',
            isGood: true
          },
          {
            text: 'Spend all on fancy equipment first',
            reason: 'Better equipment means more business',
            consequence: 'No money left for thread, cloth, and daily expenses',
            isGood: false
          }
        ]
      },
      {
        situation: 'After 6 months, machine needs servicing (₹1,500) and wedding season is starting.',
        choices: [
          {
            text: 'Ignore servicing, keep working',
            reason: 'Cannot afford downtime during busy season',
            consequence: 'Machine breaks during peak season, loses customers',
            isGood: false
          },
          {
            text: 'Get servicing, offer discounts to keep customers',
            reason: 'Prevent bigger breakdown, maintain trust',
            consequence: 'Small loss now prevents big loss later',
            isGood: true
          },
          {
            text: 'Buy new machine on credit',
            reason: 'New machine will be more efficient',
            consequence: 'Trapped in multiple loan repayments',
            isGood: false
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Rohan\'s College Fund',
    character: 'Rohan Kumar, Student',
    location: 'Bihar Village',
    category: 'student',
    icon: '🎓',
    duration: '8 min',
    lessons: 3,
    description: 'A student learns to save from part-time work for college expenses.',
    keyLessons: [
      'Save small amounts regularly',
      'Prioritize education expenses',
      'Avoid unnecessary spending',
      'Use digital tools for tracking'
    ],
    steps: [
      {
        situation: 'Rohan earns ₹3,000 monthly from tutoring. College fee is ₹15,000 per year.',
        choices: [
          {
            text: 'Spend all on phone, clothes, outings',
            reason: 'Youth should enjoy life',
            consequence: 'No money saved for college, drops out',
            isGood: false
          },
          {
            text: 'Save ₹1,000 monthly in bank RD',
            reason: 'Automatic savings with interest',
            consequence: 'Has ₹12,000 + interest after one year',
            isGood: true
          },
          {
            text: 'Keep cash at home for saving',
            reason: 'Easy access when needed',
            consequence: 'Money gets spent on small things',
            isGood: false
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'The UPI Scam Alert',
    character: 'Priya Sharma, Housewife',
    location: 'Tamil Nadu Town',
    category: 'savings',
    icon: '👩',
    duration: '7 min',
    lessons: 2,
    description: 'Learning to identify and avoid digital payment scams.',
    keyLessons: [
      'Never share OTP or UPI PIN',
      'Verify before any payment',
      'Beware of fake customer care',
      'Check transaction alerts immediately'
    ],
    steps: [
      {
        situation: 'Priya gets call from "bank executive" saying her UPI is blocked. He asks for OTP to unblock.',
        choices: [
          {
            text: 'Give OTP to unblock quickly',
            reason: 'Need UPI for daily payments',
            consequence: '₹10,000 stolen from account',
            isGood: false
          },
          {
            text: 'Say no and call bank official number',
            reason: 'Banks never ask for OTP on call',
            consequence: 'Account remains safe, scam avoided',
            isGood: true
          },
          {
            text: 'Share last 4 digits of debit card instead',
            reason: 'Maybe partial info is safe',
            consequence: 'Scammer uses info for social engineering',
            isGood: false
          }
        ]
      }
    ]
  }
];