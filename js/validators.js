/* Clearlane — validation engine
   Pure functions: given a row + the active configuration, return a list
   of human-readable issue strings. An empty list means the row is clean.
*/

function normalisePhoneDigits(value) {
  return String(value ?? "").replace(/\D/g, "");
}

function validatePhone(phoneRaw, countryCodeRaw, rules) {
  if (!phoneRaw || !String(phoneRaw).trim()) return "Missing phone number";
  const code = String(countryCodeRaw ?? "").trim().toUpperCase();
  if (!code) return "Missing country code for phone validation";

  const rule = rules.find((r) => r.code.trim().toUpperCase() === code);
  if (!rule) return `No phone rule configured for country code "${countryCodeRaw}"`;

  const digits = normalisePhoneDigits(phoneRaw);
  const expected = Number(rule.digits);
  if (digits.length !== expected) {
    return `Phone must be ${expected} digits for ${rule.country} (got ${digits.length})`;
  }
  return null;
}

// Build a regex + token order for a small set of supported date tokens.
function dateFormatToParts(format) {
  const order = [];
  const regexParts = format.replace(/YYYY|MM|DD/g, (token) => {
    order.push(token);
    return token === "YYYY" ? "(\\d{4})" : "(\\d{2})";
  });
  return { regex: new RegExp(`^${regexParts}$`), order };
}

function validateDate(value, format) {
  if (!value || !String(value).trim()) return "Missing date";
  const { regex, order } = dateFormatToParts(format);
  const match = String(value).trim().match(regex);
  if (!match) return `Date "${value}" does not match expected format ${format}`;

  const parts = {};
  order.forEach((token, i) => (parts[token] = Number(match[i + 1])));
  const { YYYY: y, MM: m, DD: d } = parts;

  const dateObj = new Date(y, m - 1, d);
  const roundTrips =
    dateObj.getFullYear() === y && dateObj.getMonth() === m - 1 && dateObj.getDate() === d;
  if (!roundTrips) return `"${value}" is not a real calendar date`;
  return null;
}

function timeFormatToParts(format) {
  if (format === "hh:mm A") {
    return { regex: /^(\d{2}):(\d{2}) ?(AM|PM)$/i, hasMeridian: true, hasSeconds: false };
  }
  if (format === "HH:mm:ss") {
    return { regex: /^(\d{2}):(\d{2}):(\d{2})$/, hasMeridian: false, hasSeconds: true };
  }
  return { regex: /^(\d{2}):(\d{2})$/, hasMeridian: false, hasSeconds: false }; // HH:mm
}

function validateTime(value, format) {
  if (!value || !String(value).trim()) return "Missing time";
  const { regex, hasMeridian, hasSeconds } = timeFormatToParts(format);
  const match = String(value).trim().match(regex);
  if (!match) return `Time "${value}" does not match expected format ${format}`;

  let hh = Number(match[1]);
  const mm = Number(match[2]);
  const ss = hasSeconds ? Number(match[3]) : 0;
  const maxHour = hasMeridian ? 12 : 23;
  const minHour = hasMeridian ? 1 : 0;

  if (hh < minHour || hh > maxHour) return `"${value}" has an out-of-range hour`;
  if (mm < 0 || mm > 59) return `"${value}" has an out-of-range minute`;
  if (ss < 0 || ss > 59) return `"${value}" has an out-of-range second`;
  return null;
}

function validateEmail(value) {
  if (!value) return null; // optional field
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
  return ok ? null : `Invalid email format: "${value}"`;
}

function validateRow(row, config) {
  const errors = [];

  REQUIRED_FIELDS.forEach((field) => {
    if (!row[field] || !String(row[field]).trim()) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  const phoneErr = validatePhone(row.phone_number, row.country_code, config.countryRules);
  if (phoneErr) errors.push(phoneErr);

  if (row.order_date) {
    const dateErr = validateDate(row.order_date, config.dateFormat);
    if (dateErr) errors.push(dateErr);
  }

  if (row.order_time) {
    const timeErr = validateTime(row.order_time, config.timeFormat);
    if (timeErr) errors.push(timeErr);
  }

  if (row.quantity !== undefined && row.quantity !== "") {
    const q = Number(row.quantity);
    if (!Number.isFinite(q) || q <= 0 || !Number.isInteger(q)) {
      errors.push(`Quantity must be a positive whole number (got "${row.quantity}")`);
    }
  }

  if (row.unit_price !== undefined && row.unit_price !== "") {
    const p = Number(row.unit_price);
    if (!Number.isFinite(p) || p <= 0) {
      errors.push(`Unit price must be a positive number (got "${row.unit_price}")`);
    }
  }

  if (row.payment_mode) {
    const allowed = config.paymentModes.map((m) => m.trim().toLowerCase());
    if (!allowed.includes(String(row.payment_mode).trim().toLowerCase())) {
      errors.push(`Unrecognized payment mode: "${row.payment_mode}"`);
    }
  }

  const emailErr = validateEmail(row.email);
  if (emailErr) errors.push(emailErr);

  return errors;
}

function findDuplicateOrderIds(rows) {
  const seen = new Map();
  const duplicates = new Set();
  rows.forEach((row, i) => {
    const id = String(row.order_id ?? "").trim();
    if (!id) return;
    if (seen.has(id)) duplicates.add(id);
    else seen.set(id, i);
  });
  return duplicates;
}

function validateDataset(rows, config) {
  const duplicateIds = findDuplicateOrderIds(rows);

  return rows.map((row) => {
    const errors = validateRow(row, config);
    const id = String(row.order_id ?? "").trim();
    if (id && duplicateIds.has(id)) errors.push(`Duplicate order_id: "${id}"`);
    return { row, errors, valid: errors.length === 0 };
  });
}
