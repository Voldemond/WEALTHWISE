Full-Stack Crypto Trading & Portfolio Management Platform

Overview

A powerful full-stack crypto trading and portfolio management platform designed for users to trade cryptocurrencies, manage their portfolio, and track live market data in real-time.

Tech Stack

Frontend: React.js (Vite, Redux for state management, TailwindCSS for UI)

Backend: .NET 8 Web API (C# with Entity Framework Core)

Database: MySQL

Authentication: JWT (JSON Web Token) with Two-Factor Authentication (OTP via Email/Mobile)

Third-Party API: CoinGecko (for live crypto prices and market data)

Charting: Stock and crypto price visualization using Chart.js

Hosting & Deployment: (AWS, Azure, Vercel, or Firebase)

Key Features & Functionality

1️⃣ User Authentication & Profile Management

Secure user registration, login, and logout.

Two-Factor Authentication (2FA) for added security.

Password reset via OTP on Email/Mobile.

2️⃣ Wallet & Transactions

Users have a wallet to hold funds.

Deposit and withdraw funds.

View wallet transaction history.

3️⃣ Watchlist & Portfolio

Users can track their favorite cryptocurrencies.

Add and remove coins from the watchlist.

Portfolio page displaying owned assets and their value.

4️⃣ Trading & Orders

Users can place buy/sell orders.

Orders can be executed or canceled.

Trading history is recorded.

5️⃣ Withdrawals & Payments

Users can request withdrawals of their funds.

View withdrawal history.

Save payment details for transactions.

6️⃣ Notifications System

Users receive alerts on trades, transactions, and deposits.

7️⃣ Live Crypto Market Data & Charts

Real-time stock & crypto prices via CoinGecko API.

Interactive charts to visualize price trends.

Data Flow & System Workflow

🔁 Authentication Flow

User Registers → Data is saved in MySQL.

Login → JWT Token is issued (if 2FA is enabled, OTP is sent).

Session Management → JWT is used for authentication in API requests.

💰 Wallet & Transactions

Users can add funds to their wallet (handled via backend).

Withdraw funds (request sent to backend for processing).

Track transactions in the database.

📊 Crypto Trading

User selects a cryptocurrency from real-time data.

Places an order (buy/sell).

Order execution (price is checked, and balance is deducted).

Wallet balance and portfolio are updated.

📈 Charts & Market Data

CoinGecko API fetches live market prices.

Stock details are displayed in real-time with an interactive chart.

Database Schema Summary

🔹 Users Table

Stores user information, authentication, and roles.

🔹 Wallets & Transactions

Handles wallet balance and all transactions.

🔹 Orders & Trading

Stores buy/sell orders and execution details.

🔹 Watchlist

Stores cryptocurrencies the user wants to track.

🔹 Payments & Withdrawals

Handles user deposits, withdrawals, and payment details.

🔹 Notifications

Sends alerts about trades, deposits, and transactions.
