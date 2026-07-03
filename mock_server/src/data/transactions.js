const transactions = [
  // ===== APRIL =====
  { transactionId: "tx_001", accountId: "acc_001", rawMerchant: "TECHCORP Payroll DIR DEP", amount: 4200.00, direction: "credit", clearedDate: "2026-04-01" },
  { transactionId: "tx_002", accountId: "acc_001", rawMerchant: "installment APRIL", amount: 450.00, direction: "debit", clearedDate: "2026-04-02" },
  { transactionId: "tx_003", accountId: "acc_001", rawMerchant: "SELF TRANSFER TO ACC002", amount: 1200.00, direction: "debit", clearedDate: "2026-04-03" },
  { transactionId: "tx_004", accountId: "acc_001", rawMerchant: "SELF TRANSFER TO ACC003", amount: 600.00, direction: "debit", clearedDate: "2026-04-03" },
  { transactionId: "tx_005", accountId: "acc_001", rawMerchant: "CASHBACK REWARD", amount: 20.00, direction: "credit", clearedDate: "2026-04-10" },

  { transactionId: "tx_006", accountId: "acc_002", rawMerchant: "AMZN Mktp US*HJ291", amount: 114.99, direction: "debit", clearedDate: "2026-04-05" },
  { transactionId: "tx_007", accountId: "acc_002", rawMerchant: "STARBUCKS COFFEE", amount: 8.75, direction: "debit", clearedDate: "2026-04-06" },
  { transactionId: "tx_008", accountId: "acc_002", rawMerchant: "UBER RIDE TRIP", amount: 21.40, direction: "debit", clearedDate: "2026-04-08" },

  { transactionId: "tx_009", accountId: "acc_003", rawMerchant: "NETFLIX SUBSCRIPTION", amount: 9.99, direction: "debit", clearedDate: "2026-04-04" },
  { transactionId: "tx_010", accountId: "acc_003", rawMerchant: "SPOTIFY PREMIUM", amount: 2.99, direction: "debit", clearedDate: "2026-04-07" },

  { transactionId: "tx_011", accountId: "acc_004", rawMerchant: "INDIAN OIL FUEL", amount: 46.30, direction: "debit", clearedDate: "2026-04-09" },
  { transactionId: "tx_012", accountId: "acc_005", rawMerchant: "SWIGGY ORDER", amount: 13.90, direction: "debit", clearedDate: "2026-04-11" },

  // ===== MAY =====
  { transactionId: "tx_013", accountId: "acc_001", rawMerchant: "TECHCORP Payroll DIR DEP", amount: 4200.00, direction: "credit", clearedDate: "2026-05-01" },
  { transactionId: "tx_014", accountId: "acc_001", rawMerchant: "SELF TRANSFER TO ACC002", amount: 1000.00, direction: "debit", clearedDate: "2026-05-02" },
  { transactionId: "tx_015", accountId: "acc_001", rawMerchant: "SELF TRANSFER TO ACC005", amount: 500.00, direction: "debit", clearedDate: "2026-05-02" },
  { transactionId: "tx_016", accountId: "acc_001", rawMerchant: "ELECTRICITY BILL PAYMENT", amount: 82.00, direction: "debit", clearedDate: "2026-05-05" },
  { transactionId: "tx_017", accountId: "acc_001", rawMerchant: "INTEREST CREDIT", amount: 9.50, direction: "credit", clearedDate: "2026-05-31" },

  { transactionId: "tx_018", accountId: "acc_002", rawMerchant: "FLIPKART ORDER", amount: 89.99, direction: "debit", clearedDate: "2026-05-04" },
  { transactionId: "tx_019", accountId: "acc_002", rawMerchant: "DOMINOS PIZZA", amount: 17.80, direction: "debit", clearedDate: "2026-05-06" },
  { transactionId: "tx_020", accountId: "acc_002", rawMerchant: "REFUND AMAZON", amount: 35.00, direction: "credit", clearedDate: "2026-05-15" },

  { transactionId: "tx_021", accountId: "acc_003", rawMerchant: "APPLE STORE", amount: 299.00, direction: "debit", clearedDate: "2026-05-03" },
  { transactionId: "tx_022", accountId: "acc_003", rawMerchant: "GITHUB SUBSCRIPTION", amount: 10.00, direction: "debit", clearedDate: "2026-05-08" },

  { transactionId: "tx_023", accountId: "acc_004", rawMerchant: "BOOKMYSHOW MOVIE", amount: 18.00, direction: "debit", clearedDate: "2026-05-09" },

  // ===== JUNE =====
  { transactionId: "tx_024", accountId: "acc_001", rawMerchant: "TECHCORP Payroll DIR DEP", amount: 4200.00, direction: "credit", clearedDate: "2026-06-01" },
  { transactionId: "tx_025", accountId: "acc_001", rawMerchant: "installment JUNE", amount: 450.00, direction: "debit", clearedDate: "2026-06-02" },
  { transactionId: "tx_026", accountId: "acc_001", rawMerchant: "SELF TRANSFER TO ACC004", amount: 900.00, direction: "debit", clearedDate: "2026-06-03" },
  { transactionId: "tx_027", accountId: "acc_001", rawMerchant: "CASHBACK REWARD", amount: 25.00, direction: "credit", clearedDate: "2026-06-11" },

  { transactionId: "tx_028", accountId: "acc_002", rawMerchant: "ZOMATO FOOD", amount: 19.50, direction: "debit", clearedDate: "2026-06-05" },
  { transactionId: "tx_029", accountId: "acc_002", rawMerchant: "BHARAT PETROLEUM", amount: 51.20, direction: "debit", clearedDate: "2026-06-07" },
  { transactionId: "tx_030", accountId: "acc_002", rawMerchant: "ATM CASH WITHDRAWAL", amount: 150.00, direction: "debit", clearedDate: "2026-06-15" },

  { transactionId: "tx_031", accountId: "acc_003", rawMerchant: "GOOGLE PLAY", amount: 4.99, direction: "debit", clearedDate: "2026-06-04" },
  { transactionId: "tx_032", accountId: "acc_003", rawMerchant: "CRYPTOXCHANGE XYZ", amount: 72.50, direction: "debit", clearedDate: "2026-06-18" },

  { transactionId: "tx_033", accountId: "acc_004", rawMerchant: "APPLE STORE", amount: 999.00, direction: "debit", clearedDate: "2026-06-16" },
  { transactionId: "tx_034", accountId: "acc_004", rawMerchant: "REFUND APPLE", amount: 50.00, direction: "credit", clearedDate: "2026-06-20" },

  { transactionId: "tx_035", accountId: "acc_005", rawMerchant: "UNKNOWN MERCHANT TEST", amount: 12.00, direction: "debit", clearedDate: "2026-06-22" },

  // ===== JULY =====
  { transactionId: "tx_036", accountId: "acc_001", rawMerchant: "TECHCORP Payroll DIR DEP", amount: 4200.00, direction: "credit", clearedDate: "2026-07-01" },
  { transactionId: "tx_037", accountId: "acc_001", rawMerchant: "SELF TRANSFER TO ACC003", amount: 700.00, direction: "debit", clearedDate: "2026-07-02" },
  { transactionId: "tx_038", accountId: "acc_001", rawMerchant: "SELF TRANSFER TO ACC005", amount: 400.00, direction: "debit", clearedDate: "2026-07-02" },
  { transactionId: "tx_039", accountId: "acc_001", rawMerchant: "INTEREST CREDIT", amount: 11.20, direction: "credit", clearedDate: "2026-07-31" },

  { transactionId: "tx_040", accountId: "acc_002", rawMerchant: "AMZN Mktp US*HJ291", amount: 149.99, direction: "debit", clearedDate: "2026-07-05" },
  { transactionId: "tx_041", accountId: "acc_002", rawMerchant: "STARBUCKS COFFEE", amount: 9.10, direction: "debit", clearedDate: "2026-07-06" },

  { transactionId: "tx_042", accountId: "acc_003", rawMerchant: "NETFLIX SUBSCRIPTION", amount: 9.99, direction: "debit", clearedDate: "2026-07-04" },
  { transactionId: "tx_043", accountId: "acc_003", rawMerchant: "DARKWEB SERVICES", amount: 450.00, direction: "debit", clearedDate: "2026-07-14" },

  { transactionId: "tx_044", accountId: "acc_004", rawMerchant: "ABCDPAYMENT9283", amount: 45.00, direction: "debit", clearedDate: "2026-07-18" },

  { transactionId: "tx_045", accountId: "acc_005", rawMerchant: "OLA CAB", amount: 7.20, direction: "debit", clearedDate: "2026-07-20" }
];

export default transactions;