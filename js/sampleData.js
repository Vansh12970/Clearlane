/* Clearlane — sample dataset
   A hand-built mix of clean and intentionally broken rows so anyone opening
   the app (a reviewer, or you recording the walkthrough) can see every
   validation rule fire without hunting for a real file first.
*/

const SAMPLE_ROWS = [
  { order_id: "ORD-1001", customer_name: "Ananya Rao", phone_number: "9876543210", country_code: "IN", email: "ananya.rao@mail.com", product_id: "P-22", product_name: "Wireless Mouse", quantity: "2", unit_price: "799", payment_mode: "UPI", order_date: "2025-04-01", order_time: "10:15:00" },
  { order_id: "ORD-1002", customer_name: "Liam Tan", phone_number: "98765432", country_code: "SG", email: "liam.tan@mail.com", product_id: "P-08", product_name: "Mechanical Keyboard", quantity: "1", unit_price: "3499", payment_mode: "Card", order_date: "2025-04-01", order_time: "11:02:00" },
  { order_id: "ORD-1003", customer_name: "Priya Nair", phone_number: "70123", country_code: "IN", email: "priya.nair@mail.com", product_id: "P-11", product_name: "USB-C Hub", quantity: "3", unit_price: "1299", payment_mode: "Wallet", order_date: "2025-04-02", order_time: "09:40:00" },
  { order_id: "ORD-1004", customer_name: "Jonas Weber", phone_number: "5551234567", country_code: "DE", email: "jonas.weber@mail.com", product_id: "P-14", product_name: "Laptop Stand", quantity: "1", unit_price: "1899", payment_mode: "Bank Transfer", order_date: "2025-04-02", order_time: "14:21:00" },
  { order_id: "ORD-1005", customer_name: "Meera Iyer", phone_number: "9123456780", country_code: "IN", email: "meera.iyer@mail.com", product_id: "P-22", product_name: "Wireless Mouse", quantity: "0", unit_price: "799", payment_mode: "UPI", order_date: "2025-04-03", order_time: "16:05:00" },
  { order_id: "ORD-1006", customer_name: "Daniel Smith", phone_number: "2025550181", country_code: "US", email: "daniel.smith@mail.com", product_id: "P-30", product_name: "Noise Cancelling Headphones", quantity: "1", unit_price: "8999", payment_mode: "Card", order_date: "2025-04-03", order_time: "08:55:00" },
  { order_id: "ORD-1007", customer_name: "Chloe Wright", phone_number: "7700900123", country_code: "GB", email: "chloe.wright[at]mail.com", product_id: "P-05", product_name: "Webcam 1080p", quantity: "1", unit_price: "2599", payment_mode: "Card", order_date: "2025-04-04", order_time: "12:30:00" },
  { order_id: "ORD-1008", customer_name: "Rahul Verma", phone_number: "9988776655", country_code: "IN", email: "rahul.verma@mail.com", product_id: "P-11", product_name: "USB-C Hub", quantity: "2", unit_price: "-200", payment_mode: "UPI", order_date: "2025-04-04", order_time: "17:45:00" },
  { order_id: "ORD-1009", customer_name: "Sara Lim", phone_number: "91234567", country_code: "SG", email: "sara.lim@mail.com", product_id: "P-08", product_name: "Mechanical Keyboard", quantity: "1", unit_price: "3499", payment_mode: "PayNow", order_date: "2025-04-05", order_time: "13:18:00" },
  { order_id: "ORD-1010", customer_name: "Oliver Brown", phone_number: "412345678", country_code: "AU", email: "oliver.brown@mail.com", product_id: "P-30", product_name: "Noise Cancelling Headphones", quantity: "1", unit_price: "8999", payment_mode: "Crypto", order_date: "2025-04-05", order_time: "19:00:00" },
  { order_id: "ORD-1011", customer_name: "Kavya Pillai", phone_number: "9090909090", country_code: "IN", email: "kavya.pillai@mail.com", product_id: "P-14", product_name: "Laptop Stand", quantity: "1", unit_price: "1899", payment_mode: "Net Banking", order_date: "05-04-2025", order_time: "10:10:00" },
  { order_id: "ORD-1012", customer_name: "Ethan Clark", phone_number: "2025550199", country_code: "US", email: "ethan.clark@mail.com", product_id: "P-05", product_name: "Webcam 1080p", quantity: "2", unit_price: "2599", payment_mode: "Card", order_date: "2025-04-06", order_time: "15:50:00" },
  { order_id: "ORD-1013", customer_name: "Naveen Kumar", phone_number: "9876543210", country_code: "IN", email: "naveen.kumar@mail.com", product_id: "P-22", product_name: "Wireless Mouse", quantity: "1", unit_price: "799", payment_mode: "UPI", order_date: "2025-04-06", order_time: "11:25:00" },
  { order_id: "ORD-1014", customer_name: "Grace Tan", phone_number: "81234567", country_code: "SG", email: "grace.tan@mail.com", product_id: "P-11", product_name: "USB-C Hub", quantity: "4", unit_price: "1299", payment_mode: "Card", order_date: "2025-04-07", order_time: "09:05:00" },
  { order_id: "ORD-1015", customer_name: "", phone_number: "9012345678", country_code: "IN", email: "missingname@mail.com", product_id: "P-30", product_name: "Noise Cancelling Headphones", quantity: "1", unit_price: "8999", payment_mode: "UPI", order_date: "2025-04-07", order_time: "20:40:00" },
  { order_id: "ORD-1016", customer_name: "Henry Wilson", phone_number: "7911123456", country_code: "GB", email: "henry.wilson@mail.com", product_id: "P-08", product_name: "Mechanical Keyboard", quantity: "1", unit_price: "3499", payment_mode: "Card", order_date: "2025/04/08", order_time: "14:00:00" },
  { order_id: "ORD-1017", customer_name: "Diya Shah", phone_number: "9876501234", country_code: "IN", email: "diya.shah@mail.com", product_id: "P-14", product_name: "Laptop Stand", quantity: "2", unit_price: "1899", payment_mode: "Wallet", order_date: "2025-04-08", order_time: "10:55:00" },
  { order_id: "ORD-1018", customer_name: "James Lee", phone_number: "412987654", country_code: "AU", email: "james.lee@mail.com", product_id: "P-22", product_name: "Wireless Mouse", quantity: "3", unit_price: "799", payment_mode: "Card", order_date: "2025-04-09", order_time: "18:12:00" },
  { order_id: "ORD-1009", customer_name: "Duplicate Test", phone_number: "91234567", country_code: "SG", email: "dup@mail.com", product_id: "P-08", product_name: "Mechanical Keyboard", quantity: "1", unit_price: "3499", payment_mode: "PayNow", order_date: "2025-04-09", order_time: "13:18:00" },
  { order_id: "ORD-1020", customer_name: "Ishaan Bedi", phone_number: "9090012345", country_code: "IN", email: "ishaan.bedi@mail.com", product_id: "P-05", product_name: "Webcam 1080p", quantity: "1", unit_price: "2599", payment_mode: "UPI", order_date: "2025-04-10", order_time: "31:10:00" },
];

function getSampleCSV() {
  return Papa.unparse(SAMPLE_ROWS);
}
