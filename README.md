# Gullak - Intelligent Personal Finance Management  ![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)

Gullak is a professional financial assistant designed to bridge the gap between simple expense tracking and strategic financial planning. The platform provides a comprehensive ecosystem to manage income, optimise debt, and build long-term wealth through data-driven insights.

---

## Technical Overview

Gullak is built as a complete financial toolkit with a decoupled architecture, ensuring scalability and performance across web and mobile platforms.

### Architecture
- **Client**: A high-performance React 19 application built with Vite and Tailwind CSS.
- **Server**: A robust Node.js and Express backend handling data persistence, authentication, and AI integrations.
- **Mobile**: A cross-platform React Native application (Expo SDK 52) shared with the core business logic.

---

## How it Works

The platform operates through a seamless flow of data between the user interface and the analytical backend:-

### 1. Data Collection and Processing
Users input financial data—including expenses, income sources, and loan details—through the React-based frontend. This data is validated in real-time and transmitted via secure REST APIs to the central server.

### 2. Intelligent Persistence
The server employs a flexible storage strategy:
- **Production Mode**: Connects to a MongoDB database for high-scale data management.
- **Local/Development Mode**: Utilises a persistent JSON-based file system (db.json) to ensure zero-configuration setup for new developers while maintaining data across sessions.

### 3. Expert Analysis Engine
When a user requests financial insights:
- The server aggregates historical spending patterns and debt structures.
- It interfaces with the Gemini AI API to generate "Expert Advice," providing contextual recommendations on money leaks and saving opportunities.
- The Debt Optimiser module executes mathematical algorithms to calculate amortisation schedules and simulate prepayment impacts.

### 4. Security Layer
Account security is managed through a multi-tier authentication system:
- Standard credential-based login.
- Two-Factor Authentication (2FA) utilising TOTP (Time-based One-Time Passwords) via apps like Google Authenticator.
- Fallback Email OTP (One-Time Password) systems for recovery and verification.

---

## Core Features

### Advanced Debt Optimiser
- Amortization Visualization: Detailed breakdown of principal vs. interest payments.
- Prepayment Simulator: Real-time calculation of interest and time savings from extra payments.
- Repayment Roadmap: Algorithmic prioritisation of loans using Avalanche or Snowball methods.

### Intelligent Expense Tracking
- Modern Dashboard: Real-time visibility into cash flow and spending categories.
- Leak Detection: Automated identification of unused subscriptions and inefficient spending habits.
- Financial Health Score: A proprietary metric calculated from savings rates and debt-to-income ratios.

---

## Directory Structure

```text
.
├── client/           # React + Vite Web Frontend
├── server/           # Node.js + Express Backend
├── App/              # Expo + React Native Mobile Application
├── render.yaml       # Infrastructure as Code for Deployment
└── vercel.json       # Frontend Deployment Configuration
```

---

## Getting Started

### Prerequisites
- Node.js (Version 18.0.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Gautam-Bharadwaj/Gullak.git
   cd Gullak
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in the server directory:
   ```bash
   # Create server/.env with:
   PORT=5001
   MONGODB_URI=your_mongodb_uri
   GEMINI_API_KEY=your_api_key
   EMAIL_USER=your_email
   EMAIL_PASS=your_app_password
   ```

### Running the Platform

To start the full stack (Frontend and Backend) simultaneously:
```bash
npm run dev
```
- Web Frontend: http://localhost:5173
- API Backend: http://localhost:5001

To run the mobile application:
```bash
cd App
npm install
npx expo start
```

---

## Deployment

The platform is designed for automated deployment:
- **Backend**: Pre-configured for Render via `render.yaml`.
- **Frontend**: Optimised for Vercel via `vercel.json`.

---

## ⚖️ License

Copyright (c) 2026 **Gautam Jha  & Mohit Kourav **. All Rights Reserved.

Yeh project proprietary hai. Iska source code, design, aur logic bina author ki explicit permission ke:
* Copy nahi kiya ja sakta.
* Modify ya distribute nahi kiya ja sakta.
* Kisi bhi commercial project mein use nahi kiya ja sakta.

Aap is code ko sirf educational purposes ke liye dekh (view) sakte hain. Agar aap ise kisi aur tarah se use karna chahte hain, toh kripya permission ke liye contact karein.

---
📧 **Contact:** [kr.gautamjha03@gmail.com] / 
{https://www.linkedin.com/in/kumar-gautam-2bb399263/}
{https://www.linkedin.com/in/mohit-kourav-a03215338/}
