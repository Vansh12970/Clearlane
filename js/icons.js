/* Clearlane — inline icon set
   Stroke-based line icons, hand-built (no external icon font/library dependency).
   All icons share: viewBox 0 0 24 24, 1.75 stroke, round caps/joins, currentColor.
*/
const ICONS = {
  upload: `<path d="M12 15.5V4"/><path d="M7.5 8.5 12 4l4.5 4.5"/><path d="M4.5 15.5v3a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3"/>`,

  download: `<path d="M12 4v11.5"/><path d="M7.5 11l4.5 4.5L16.5 11"/><path d="M4.5 16.5v3a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3"/>`,

  fileText: `<path d="M7 3h6l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M13 3v5h5"/><path d="M9 13h6"/><path d="M9 17h6"/>`,

  checkCircle: `<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.6 2.6L16.2 9"/>`,

  alertTriangle: `<path d="M10.6 4.2 2.9 18.4A1.6 1.6 0 0 0 4.3 20.7h15.4a1.6 1.6 0 0 0 1.4-2.3L13.4 4.2a1.6 1.6 0 0 0-2.8 0Z"/><path d="M12 9.8v4.2"/><circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none"/>`,

  xCircle: `<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6"/><path d="M15 9l-6 6"/>`,

  globe: `<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.6 2.6 4 5.8 4 9s-1.4 6.4-4 9c-2.6-2.6-4-5.8-4-9s1.4-6.4 4-9Z"/>`,

  sliders: `<path d="M5 6h6"/><circle cx="15" cy="6" r="2"/><path d="M19 6h0"/><path d="M5 12h0"/><circle cx="9" cy="12" r="2"/><path d="M13 12h6"/><path d="M5 18h10"/><circle cx="17" cy="18" r="2"/>`,

  search: `<circle cx="11" cy="11" r="7"/><path d="M20.5 20.5 16 16"/>`,

  filter: `<path d="M3.5 4.5h17l-6.5 7.6v6.1l-4 2.1v-8.2Z"/>`,

  plus: `<path d="M12 5v14"/><path d="M5 12h14"/>`,

  trash: `<path d="M4.5 7h15"/><path d="M9.5 7V4.5h5V7"/><path d="M6.5 7l1 13h9l1-13"/>`,

  chevronDown: `<path d="M6 9l6 6 6-6"/>`,

  externalLink: `<path d="M14.5 4.5h5v5"/><path d="M19.5 4.5 10 14"/><path d="M18.5 13v6a1.2 1.2 0 0 1-1.2 1.2H5.7A1.2 1.2 0 0 1 4.5 19V7.2A1.2 1.2 0 0 1 5.7 6h6"/>`,

  clock: `<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2.2"/>`,

  calendar: `<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17"/><path d="M8 3v4"/><path d="M16 3v4"/>`,

  creditCard: `<rect x="2.5" y="5.5" width="19" height="13" rx="2"/><path d="M2.5 10h19"/><path d="M6 14.5h4"/>`,

  package: `<path d="M12 3.5 20.5 8 12 12.5 3.5 8Z"/><path d="M3.5 8v8.5L12 21l8.5-4.5V8"/><path d="M12 12.5V21"/>`,

  hash: `<path d="M9 3.5 7 20.5"/><path d="M17 3.5 15 20.5"/><path d="M4 9h17"/><path d="M3 15h17"/>`,

  info: `<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><circle cx="12" cy="7.7" r="1" fill="currentColor" stroke="none"/>`,

  layers: `<path d="M12 3.2 21 8l-9 4.8L3 8Z"/><path d="M3 13.2 12 18l9-4.8"/><path d="M3 17.8 12 22.6l9-4.8"/>`,

  database: `<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v6.2c0 1.66 3.6 3 8 3s8-1.34 8-3V5.5"/><path d="M4 11.7v6.2c0 1.66 3.6 3 8 3s8-1.34 8-3v-6.2"/>`,

  refresh: `<path d="M4 12a8 8 0 0 1 13.4-5.9L20 8.5"/><path d="M20 4.5v4h-4"/><path d="M20 12a8 8 0 0 1-13.4 5.9L4 15.5"/><path d="M4 19.5v-4h4"/>`,

  x: `<path d="M6 6l12 12"/><path d="M18 6 6 18"/>`,

  user: `<circle cx="12" cy="8.2" r="3.6"/><path d="M4.8 20c1-3.6 3.9-5.8 7.2-5.8s6.2 2.2 7.2 5.8"/>`,

  zip: `<path d="M7 3h6l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M13 3v5h5"/><path d="M11 9.5h2v2h-2z"/><path d="M11 13.5h2v2h-2z"/>`,

  sparkle: `<path d="M12 3.5 13.4 9 19 10.4l-5.6 1.4L12 17.3l-1.4-5.5L5 10.4 10.6 9Z"/>`,
};

function icon(name, cls = "") {
  const body = ICONS[name] || "";
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}
