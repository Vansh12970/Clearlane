/* Clearlane — country phone-rule configuration
   Each rule: country name, ISO-ish short code (matched against the CSV's
   country_code column, case-insensitive), dial prefix (display only),
   and the exact digit count required for a valid local number.
*/
const DEFAULT_COUNTRY_RULES = [
  { country: "India", code: "IN", dial: "+91", digits: 10 },
  { country: "Singapore", code: "SG", dial: "+65", digits: 8 },
  { country: "United States", code: "US", dial: "+1", digits: 10 },
  { country: "United Kingdom", code: "GB", dial: "+44", digits: 10 },
  { country: "Australia", code: "AU", dial: "+61", digits: 9 },
  { country: "UAE", code: "AE", dial: "+971", digits: 9 },
];

const DEFAULT_PAYMENT_MODES = [
  "Card",
  "UPI",
  "Net Banking",
  "Wallet",
  "Cash on Delivery",
  "PayNow",
  "Bank Transfer",
];

const DATE_FORMATS = ["YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY", "DD-MM-YYYY"];
const TIME_FORMATS = ["HH:mm:ss", "HH:mm", "hh:mm A"];

const REQUIRED_FIELDS = [
  "order_id",
  "phone_number",
  "country_code",
  "product_name",
  "quantity",
  "unit_price",
  "payment_mode",
  "order_date",
];
