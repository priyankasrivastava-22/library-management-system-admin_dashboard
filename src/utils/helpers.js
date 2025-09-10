// src/utils/helpers.js
export function calcFine(issueDateStr, returnDateStr, perDay = 5) {
  if (!issueDateStr || !returnDateStr) return 0;
  const issue = new Date(issueDateStr);
  const ret = new Date(returnDateStr);
  const diff = Math.max(0, Math.floor((ret - issue) / (1000 * 60 * 60 * 24)));
  return diff * perDay;
}
