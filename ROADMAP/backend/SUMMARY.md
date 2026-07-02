Assignment ka Actual Goal

<!--  -->
abhi na muje db m ekuch verify karana hai 
kuch categories or add krni hai kyuki db me abhi bhi bahut jgh uncategorised aa rhi hai rules me kr lunga


Assignment ka goal Plaid integration banana nahi hai.

Goal hai:

Mock Banking API
        ↓
ETL Pipeline
        ↓
PostgreSQL
        ↓
React Dashboard

Real world me:

Bank
 ↓
Plaid/Yodlee
 ↓
App

Assignment me:

Mock Bank
 ↓
ETL
 ↓
Database
 ↓
Dashboard

Ye Plaid ecosystem ka simulation hai.

2. Repository Structure Final Decision

Ek hi GitHub Repo.

nexus-finance/

├── frontend/
├── backend/
└── mock-bank-server/

Reason:

Easy submission
Easy setup
Production style
Future me split kar sakte ho
3. Mock Server Architecture

Mock Server ka kaam:

Only provide banking data

No:

MongoDB
PostgreSQL
Authentication

Required:

Express
JSON files
4. Mock Server Data Files

Final decision:

mock-bank-server/src/data/

├── institutions.json
├── accounts.json
└── transactions.json

Merchants file required nahi.

institutions.json

Purpose:

Connected banks list

Example:

{
  "id": "ins_apex",
  "name": "Apex Bank & Trust"
}
accounts.json

Purpose:

Bank accounts
Current balances

Example:

{
  "accountId": "acc_001",
  "institutionId": "ins_apex",
  "accountName": "Primary Checking",
  "accountType": "Checking",
  "currentBalance": 4872.25
}
transactions.json

Purpose:

Raw transaction history

Example:

{
  "transactionId": "tx_001",
  "accountId": "acc_001",
  "rawMerchant": "TECHCORP PAYROLL DIR DEP",
  "amount": 3200,
  "direction": "credit",
  "clearedDate": "2026-04-01"
}
5. Important Design Decision

Never store these in Mock Server:

category
normalizedMerchant
isAnomaly
status

Reason:

These are ETL outputs.

Assignment explicitly wants regex classification and normalization.

6. Mock Server Endpoints

Current recommended design:

Institutions
GET /api/sandbox/institutions

Returns:

All banks
Accounts
GET /api/sandbox/accounts

Returns:

All accounts
Transactions
GET /api/sandbox/accounts/:accountId/transactions

Supports:

?start_date=2026-05-01
&end_date=2026-06-01

Production-like behavior.

7. How Plaid Works (Important Understanding)

Plaid generally provides:

Accounts
Account Name
Account Type
Current Balance
Transactions
Amount
Date
Merchant
Account ID

Plaid gives balance directly.

Balance normally transaction history se calculate nahi kiya jata.

Isliye:

currentBalance

accounts.json me rahega.

8. ETL Pipeline Responsibilities

Assignment ke hisab se ETL is the heart of the system.

Flow:

Fetch Transactions
       ↓
Regex Matching
       ↓
Merchant Normalization
       ↓
Category Assignment
       ↓
Anomaly Detection
       ↓
Store PostgreSQL
9. Classification Rules Table

Assignment schema:

classification_rules

Contains:

keyword
target_category
clean_merchant_name

Example:

starbucks
Food & Dining
Starbucks

If:

TST* STARBUCKS NYC

comes from bank

ETL converts it to:

Merchant: Starbucks
Category: Food & Dining

10. Anomaly Detection

Assignment requires:

Amount > $100
Rapid duplicate transactions

Flag:

is_anomaly = true

11. PostgreSQL Tables

Assignment schema:

accounts
Connected accounts
transactions
Processed transactions
classification_rules
Regex mappings

12. Frontend Requirements
KPI Cards
Card 1
Combined Cash Balance

Source:

accounts.currentBalance
Card 2
Monthly Expenditure

Source:

debit transactions
Card 3
Monthly Gross Income

Source:

credit transactions
Card 4
Audit Notifications

Source:

is_anomaly count

13. Charts
Donut Chart

Shows:

Food & Dining
Shopping
Utilities
Transportation
Entertainment

Based on categorized transactions.

Cash Flow Line Chart

Shows:

Income vs Expense

over time.

Uses:

transaction date
direction
amount

14. Rules Manager

Frontend must allow:

Add Rule
keyword
category
merchant
Delete Rule
Test Rule

Example:

AMZN Mktp US*HJ291

Returns:

Amazon
Shopping

15. Ledger Grid

Table columns:

Date
Merchant
Category
Amount
Anomaly

Must support filtering and sorting.

16. Backend Folder Structure

Planned:

backend/src/

├── modules/
│   ├── accounts/
│   ├── transactions/
│   ├── rules/
│   └── ingestion/
│
├── services/
│   ├── normalization.service.js
│   ├── classification.service.js
│   └── anomaly.service.js
│
├── providers/
│   └── mock-provider.js
│
├── jobs/
│
├── db/
│
└── config/
17. Current Progress
Completed Decisions

✅ Single Repo

✅ Mock Server separate from backend

✅ No MongoDB for mock server

✅ Three JSON files

institutions
accounts
transactions

✅ ETL responsible for categorization

✅ ETL responsible for anomaly detection

✅ Dashboard requirements understood

18. Immediate Next Step

Do NOT start PostgreSQL or Frontend yet.

Current task:

Build Mock Bank Server

Create:

institutions.json
accounts.json
transactions.json

Then create routes:

GET /api/sandbox/institutions

GET /api/sandbox/accounts

GET /api/sandbox/accounts/:accountId/transactions

with support for:

?start_date=
&end_date=

Once mock server is working in Postman, then move to:

Backend PostgreSQL Setup
       ↓
ETL Sync Endpoint
       ↓
Regex Engine
       ↓
Dashboard APIs
       ↓
React Frontend

Ye roadmap follow karoge to project production-minded bhi rahega aur assignment ke rubric ke saath bhi perfectly aligned rahega.