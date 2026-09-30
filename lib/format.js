/**
 * Format an ISO date string (YYYY-MM-DD) into a readable long-form date,
 * e.g. "May 4, 2026". Falls back to the raw value if it cannot be parsed.
 */
export function formatDate(iso) {
  if (!iso) return '';
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
