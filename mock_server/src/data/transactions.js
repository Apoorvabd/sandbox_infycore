const transactions =[
  { "transactionId": "tx_001", "accountId": "acc_001", "rawMerchant": "TECHCORP PAYROLL DIR DEP", "amount": 3200, "direction": "credit", "clearedDate": "2026-04-01" },
  { "transactionId": "tx_002", "accountId": "acc_001", "rawMerchant": "AMZN Mktp US*HJ291", "amount": 114.99, "direction": "debit", "clearedDate": "2026-04-03" },
  { "transactionId": "tx_003", "accountId": "acc_001", "rawMerchant": "STARBUCKS COFFEE", "amount": 8.75, "direction": "debit", "clearedDate": "2026-04-05" },
  { "transactionId": "tx_004", "accountId": "acc_001", "rawMerchant": "UBER RIDE TRIP", "amount": 24.50, "direction": "debit", "clearedDate": "2026-04-07" },
  { "transactionId": "tx_005", "accountId": "acc_001", "rawMerchant": "CASHBACK REWARD", "amount": 15.00, "direction": "credit", "clearedDate": "2026-04-10" },

  { "transactionId": "tx_006", "accountId": "acc_002", "rawMerchant": "SALARY CREDIT APRIL", "amount": 2800, "direction": "credit", "clearedDate": "2026-04-01" },
  { "transactionId": "tx_007", "accountId": "acc_002", "rawMerchant": "SWIGGY ORDER", "amount": 12.40, "direction": "debit", "clearedDate": "2026-04-04" },
  { "transactionId": "tx_008", "accountId": "acc_002", "rawMerchant": "ZOMATO FOOD", "amount": 18.90, "direction": "debit", "clearedDate": "2026-04-06" },
  { "transactionId": "tx_009", "accountId": "acc_002", "rawMerchant": "REFUND AMAZON", "amount": 22.00, "direction": "credit", "clearedDate": "2026-04-12" },

  { "transactionId": "tx_010", "accountId": "acc_003", "rawMerchant": "PAYROLL APRIL", "amount": 3500, "direction": "credit", "clearedDate": "2026-04-01" },
  { "transactionId": "tx_011", "accountId": "acc_003", "rawMerchant": "NETFLIX SUBSCRIPTION", "amount": 9.99, "direction": "debit", "clearedDate": "2026-04-03" },
  { "transactionId": "tx_012", "accountId": "acc_003", "rawMerchant": "GOOGLE YOUTUBE", "amount": 11.99, "direction": "debit", "clearedDate": "2026-04-05" },

  { "transactionId": "tx_013", "accountId": "acc_001", "rawMerchant": "SALARY CREDIT MAY", "amount": 3200, "direction": "credit", "clearedDate": "2026-05-01" },
  { "transactionId": "tx_014", "accountId": "acc_001", "rawMerchant": "FLIPKART ORDER", "amount": 89.99, "direction": "debit", "clearedDate": "2026-05-03" },
  { "transactionId": "tx_015", "accountId": "acc_001", "rawMerchant": "DOMINOS PIZZA", "amount": 16.75, "direction": "debit", "clearedDate": "2026-05-05" },
  { "transactionId": "tx_016", "accountId": "acc_001", "rawMerchant": "CASHBACK MAY", "amount": 20.00, "direction": "credit", "clearedDate": "2026-05-10" },

  { "transactionId": "tx_017", "accountId": "acc_002", "rawMerchant": "PAYROLL MAY", "amount": 2800, "direction": "credit", "clearedDate": "2026-05-01" },
  { "transactionId": "tx_018", "accountId": "acc_002", "rawMerchant": "IRCTC TRAIN TICKET", "amount": 32.50, "direction": "debit", "clearedDate": "2026-05-04" },
  { "transactionId": "tx_019", "accountId": "acc_002", "rawMerchant": "BOOKMYSHOW MOVIE", "amount": 10.00, "direction": "debit", "clearedDate": "2026-05-06" },

  { "transactionId": "tx_020", "accountId": "acc_003", "rawMerchant": "SALARY MAY", "amount": 3500, "direction": "credit", "clearedDate": "2026-05-01" },
  { "transactionId": "tx_021", "accountId": "acc_003", "rawMerchant": "APPLE STORE", "amount": 999.00, "direction": "debit", "clearedDate": "2026-05-03" },
  { "transactionId": "tx_022", "accountId": "acc_003", "rawMerchant": "SPOTIFY PREMIUM", "amount": 2.99, "direction": "debit", "clearedDate": "2026-05-05" },

  { "transactionId": "tx_023", "accountId": "acc_001", "rawMerchant": "PAYROLL JUNE", "amount": 3200, "direction": "credit", "clearedDate": "2026-06-01" },
  { "transactionId": "tx_024", "accountId": "acc_001", "rawMerchant": "UBER EATS", "amount": 13.60, "direction": "debit", "clearedDate": "2026-06-03" },
  { "transactionId": "tx_025", "accountId": "acc_001", "rawMerchant": "STARBUCKS", "amount": 7.20, "direction": "debit", "clearedDate": "2026-06-04" },
  { "transactionId": "tx_026", "accountId": "acc_001", "rawMerchant": "REFUND CASHBACK", "amount": 18.00, "direction": "credit", "clearedDate": "2026-06-10" },

  { "transactionId": "tx_027", "accountId": "acc_002", "rawMerchant": "SALARY JUNE", "amount": 2800, "direction": "credit", "clearedDate": "2026-06-01" },
  { "transactionId": "tx_028", "accountId": "acc_002", "rawMerchant": "INDIAN OIL FUEL", "amount": 45.30, "direction": "debit", "clearedDate": "2026-06-03" },
  { "transactionId": "tx_029", "accountId": "acc_002", "rawMerchant": "ZOMATO ORDER", "amount": 18.90, "direction": "debit", "clearedDate": "2026-06-05" },

  { "transactionId": "tx_030", "accountId": "acc_003", "rawMerchant": "SALARY JUNE", "amount": 3500, "direction": "credit", "clearedDate": "2026-06-01" },
  { "transactionId": "tx_031", "accountId": "acc_003", "rawMerchant": "NETFLIX", "amount": 9.99, "direction": "debit", "clearedDate": "2026-06-02" },
  { "transactionId": "tx_032", "accountId": "acc_003", "rawMerchant": "GOOGLE PLAY", "amount": 1.99, "direction": "debit", "clearedDate": "2026-06-03" },
  { "transactionId": "tx_033", "accountId": "acc_003", "rawMerchant": "CASHBACK JUNE", "amount": 25.00, "direction": "credit", "clearedDate": "2026-06-12" },

  { "transactionId": "tx_034", "accountId": "acc_004", "rawMerchant": "PAYROLL JUNE", "amount": 4000, "direction": "credit", "clearedDate": "2026-06-01" },
  { "transactionId": "tx_035", "accountId": "acc_004", "rawMerchant": "AMAZON PRIME", "amount": 14.99, "direction": "debit", "clearedDate": "2026-06-03" },
  { "transactionId": "tx_036", "accountId": "acc_004", "rawMerchant": "APPLE STORE", "amount": 999.00, "direction": "debit", "clearedDate": "2026-06-05" },
  { "transactionId": "tx_037", "accountId": "acc_004", "rawMerchant": "REFUND APPLE", "amount": 50.00, "direction": "credit", "clearedDate": "2026-06-10" },

  { "transactionId": "tx_038", "accountId": "acc_005", "rawMerchant": "SALARY JUNE", "amount": 3000, "direction": "credit", "clearedDate": "2026-06-01" },
  { "transactionId": "tx_039", "accountId": "acc_005", "rawMerchant": "OLA CAB", "amount": 6.30, "direction": "debit", "clearedDate": "2026-06-02" },
  { "transactionId": "tx_040", "accountId": "acc_005", "rawMerchant": "BHARAT PETROLEUM", "amount": 48.60, "direction": "debit", "clearedDate": "2026-06-04" },
  {
  "transactionId": "tx_041",
  "accountId": "acc_001",
  "rawMerchant": "AMZN Mktp US*HJ291",
  "amount": 114.99,
  "direction": "debit",
  "clearedDate": "2026-06-15"
},
{
  "transactionId": "tx_042",
  "accountId": "acc_002",
  "rawMerchant": "APPLE STORE",
  "amount": 999.00,
  "direction": "debit",
  "clearedDate": "2026-06-16"
},
{
  "transactionId": "tx_043",
  "accountId": "acc_003",
  "rawMerchant": "CRYPTOXCHANGE XYZ",
  "amount": 72.50,
  "direction": "debit",
  "clearedDate": "2026-06-18"
},
{
  "transactionId": "tx_044",
  "accountId": "acc_004",
  "rawMerchant": "ABCDPAYMENT9283",
  "amount": 45.00,
  "direction": "debit",
  "clearedDate": "2026-06-19"
},
{
  "transactionId": "tx_045",
  "accountId": "acc_005",
  "rawMerchant": "UNKNOWN MERCHANT TEST",
  "amount": 12.00,
  "direction": "debit",
  "clearedDate": "2026-06-20"
},
{
  "transactionId": "tx_046",
  "accountId": "acc_001",
  "rawMerchant": "DARKWEB SERVICES",
  "amount": 450.00,
  "direction": "debit",
  "clearedDate": "2026-06-21"
},
{
  "transactionId": "tx_047",
  "accountId": "acc_001",
  "rawMerchant": "GITHUB SUBSCRIPTION",
  "amount": 450.00,
  "direction": "debit",
  "clearedDate": "2026-06-21"
}

];
export default transactions;