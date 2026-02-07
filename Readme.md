## NoteKaka
# 🌱 Rural Financial Literacy & Empowerment Platform

A **simple, accessible, multi-page ReactJS website** designed to help **rural users, students, youth, farmers, and small shopkeepers** understand money, digital payments, savings, government schemes, and basic financial decision-making — **without fear, jargon, or pressure**.

This platform focuses on **confidence, trust, local psychology, and learning by stories & simulations**, not real money.

---

## 🎯 Vision

> “Learn money safely, in your language.”

Many first-time users are scared of banks, loans, and digital payments.  
This project removes fear by using:
- Stories instead of lectures
- Icons instead of text-heavy UI
- Simulations instead of real money
- Consistency instead of competition

---

## 👥 Target Users

- Rural students
- Youth (18–30)
- Farmers
- Small shopkeepers (kirana, tailor, vendors)
- First-time banking & UPI users

---

## 🧱 Pages & Features

### 1️⃣ Landing Page (No Login)
- Language selector (Indian regional languages)
- Voice mode toggle (mic icon)
- Simple intro message
- Trust indicators (“People near you are learning”)
- CTA: **Start Learning / Explore Without Login**

---

### 2️⃣ Financial Personality Test
- Very simple questions (text + voice)
- Examples:
  - Who are you? (Student / Farmer / Shopkeeper)
  - What scares you more? (Bank / Loan / Losing Money)
  - Do you earn regularly?
- Output:
  - Risk level
  - Awareness level
  - Financial needs (savings, loan, schemes)

---

### 3️⃣ Learning Dashboard
- Visual cards with icons
- Sections:
  - Basic terms (Debit, Credit, EMI, Interest)
  - Daily micro-actions
  - Progress tracker (consistency-based)
  - Badges & points
  - Sandbox leaderboard (no real money)

---

### 4️⃣ Story-Based Learning
- Short village stories:
  - Farmer Ram saving for seeds
  - Asha opening a tailor shop
- Format:
  - Choice → Consequence
  - Wrong choices show shrinking money timeline
- No real money involved

---

### 5️⃣ Digital Payments (UPI)
- Visual explanation of UPI
- Dummy QR code generator
- Wallet simulation
- Do’s & Don’ts
- Scam & rumor buster

---

### 6️⃣ Savings & Investment Simulator
- Simple sliders:
  - Income
  - Saving habit
- Festival & crop-cycle budgeting
- Visual growth vs bad habits
- No real money used

---

### 7️⃣ Government Scheme Recommendations
- AI-based scheme matching using:
  - User profile
  - Personality test
- Shows:
  - Scheme name
  - Eligibility
  - Required documents
  - “Should you worry?” explanation
- Data source: `myscheme.gov.in` (assumed API)

---

### 8️⃣ AI Finance Coach (Chatbot)
- Text + voice chat
- Daily tips
- Simple explanations
- Warns before risky decisions
- Says **“Talk to a human”** when unsure

---

### 9️⃣ NGO & Human Help
- Location-based NGO listing
- One-tap call / website visit
- “Ask human help” option

---

## 🧠 AI Capabilities (Assumed APIs)

- Speech-to-Text
- Text-to-Speech
- Google Translate API
- AI chatbot (finance coach)
- Rule + ML hybrid recommendation engine

> ⚠️ No translations are hardcoded.  
> All language conversion is assumed via APIs.

---

## 🧩 UX & Psychology Principles

- Minimal text, maximum visuals
- No fear-based or shaming language
- Stories > lectures
- Trust via:
  - “People near you learned this”
  - Familiar village scenarios
- Measure **learning consistency**, not money
- Gentle reminder after 5 days of inactivity

---

## 🛠️ Tech Stack

- **ReactJS** (Functional Components + Hooks)
- **React Router** (multi-page navigation)
- **Context API** (language & user profile)
- **Plain CSS / CSS Modules**
- Mobile-first design

🚫 No Next.js  
🚫 No Tailwind  
🚫 No Material UI  

---


---
## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
1. Fork the Repository

2. *Clone the repository*
```bash
git clone https://github.com/AnuushkaY/NoteKaka
cd notekaka-financial-literacy4

## ▶️ Running the Project

```bash
npm install react-router-dom
npm install react-icons
npm start
