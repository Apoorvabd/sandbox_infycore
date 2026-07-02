
✅ Supabase Connected
✅ PostgreSQL Connected
Schema
✅ institutions
✅ accounts
✅ transactions
✅ classification_rules
Ingestion
✅ Mock API Fetch
✅ Institutions Load
✅ Accounts Load
✅ Transactions Load
Optimization
✅ Bulk Institution Insert
✅ Bulk Account Insert
✅ Bulk Transaction Insert

Current timing:

~1.2 sec

which is good.

✅ PHASE 3 — ETL ENGINE (MOSTLY DONE)
Extract
✅ Read raw transactions
Transform
✅ Regex Matching
✅ Rule Matching
✅ Merchant Normalization
✅ Category Assignment
Load
✅ Update transaction table
Rules
✅ getAllRules()
Remaining
⏳ Add New Rule
⏳ Delete Rule
⏳ Reprocess Transactions
⏳ PHASE 4 — RULES MANAGER API

Frontend me ye required hai.

Required
GET /api/rules

Return all rules

POST /api/rules

Create new rule

Example:

{
  "keyword":"STARBUCKS",
  "cleanMerchantName":"Starbucks",
  "targetCategory":"Food & Dining"
}
DELETE /api/rules/:id

Delete rule

Bonus
POST /api/rules/test

Input:

{
  "merchant":"STARBUCKS COFFEE 2392"
}

Output:

{
  "normalizedMerchant":"Starbucks",
  "category":"Food & Dining"
}

Frontend pe bahut sexy lagega.

⏳ PHASE 5 — DASHBOARD APIs

Ye sabse important hai.

KPI Cards

Frontend requirement:

Combined Cash Balance
GET /dashboard/summary

Return:

{
  "cashBalance": 8400,
  "monthlyExpense": 1200,
  "monthlyIncome": 3500,
  "auditNotifications": 4
}
Expense Category Chart

Frontend requirement:

GET /dashboard/categories

Return:

[
  {
    "category":"Food & Dining",
    "amount":500
  },
  {
    "category":"Shopping",
    "amount":900
  }
]

For Donut Chart.

Cash Flow Chart

Frontend requirement:

GET /dashboard/cashflow

Return:

[
  {
    "date":"2026-06-01",
    "income":1000,
    "expense":300
  }
]

For Area Chart.

Ledger Table

Frontend requirement:

GET /ledger

Filters:

GET /ledger?category=Food
GET /ledger?search=starbucks
GET /ledger?page=1
⏳ PHASE 6 — AUDIT ENGINE

Assignment me:

Audit Notifications

mentioned hai.

Simple logic:

Transaction > 1000

OR

Unknown Merchant

OR

No Rule Matched

Then:

{
  "message":"Transaction requires review"
}
⏳ PHASE 7 — FRONTEND

Pure frontend ko ek hi bucket me rakh raha hoon.

Required
⏳ Login Screen (optional)
⏳ Dashboard Layout
⏳ KPI Cards
⏳ Donut Chart
⏳ Area Chart
⏳ Rules Manager
⏳ Ledger Grid
⏳ Filters
⏳ Search
⭐ ADDONS (Resume/Interview Value)

Agar time bache:

1

Transaction Detail Drawer

Click row

Show:

Raw Merchant
Normalized Merchant
Rule Applied
Institution
Account
2

Rule Testing Sandbox

Type:

AMZN MKT US*2392

See live result.

3

Manual Recategorization

User changes:

Shopping
↓
Business Expense

Store override.

4

Sync History

GET /sync/history

Show:

Last Sync
Records Processed
Duration
5

Analytics

Top merchants:j

[
  "Amazon",
  "Starbucks",
  "Uber"
]
Current Project Status
Mock Server          ✅ 100%
Database             ✅ 100%
Ingestion            ✅ 95%
ETL                  ✅ 85%
Rules API            ❌
Dashboard API        ❌
Audit Engine         ❌
Frontend             ❌
Postman Docs         ❌
Next exact task

Kal ya abhi:

1. Rules CRUD API
2. Dashboard Summary API
3. Dashboard Charts API
4. Ledger API
5. Frontend Start

Ye 4 backend APIs ban gaye to frontend bahut fast banega kyunki saara data ready hoga. 🚀

# sandbox_infycore


<!-- for mock  -->
Abhi bhi production-grade ke liye CORS config, rate limiting, logging, tests, request schema validation library, and OpenAPI docs pending hain.
<!-- mock data files: -->
institutions
accounts
transactions

<!-- ETL Output -->
normalizedMerchant
category
isAnomaly

<!-- dashboard -->
KPI Cards

- Combined Balance
- Monthly Income
- Monthly Expense
- Audit Notifications

Charts

- Category Donut
- Cash Flow Line Chart

Management

- Rules Manager

Table

- Ledger Grid



backend/

src/
│
├── config/
│   └── db.js
│
├── controllers/
│
├── services/
│
├── repositories/
│
├── routes/
│
├── middleware/
│
├── utils/
│
├── modules/
│   ├── ingestion/
│   ├── transactions/
│   ├── accounts/
│   └── rules/
│
├── app.js
└── server.js

npm install express cors dotenv pg axios zod helmet morgan express-rate-limit uuid node-cron