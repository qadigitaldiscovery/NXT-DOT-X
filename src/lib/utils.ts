/* ------------------------------------------------------------------
   Date / currency / numeric helpers
   Add any new formatters here so every module can re-use them.
-------------------------------------------------------------------*/

/**
 * formatDate
 * ----------
 * Converts a JS Date (or date-serialisable value) into
 *   2025-05-20  |  20 May 2025  |  20/05/2025
 * depending on the supplied options.
 *
 * @param input   Date | string | number
 * @param locale  BCP-47 locale tag (default 'en-ZA')
 * @param opts    Intl.DateTimeFormatOptions overrides
 */
export function formatDate(
  input: Date | string | number,
  locale: string = 'en-ZA',
  opts: Intl.DateTimeFormatOptions = {}
): string {
  const date = input instanceof Date ? input : new Date(input);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...opts,
  }).format(date);
}

/* ---------- example sibling helpers (already requested earlier) ---------- */

export function formatCurrency(
  value: number,
  currency: string = 'ZAR',
  locale: string = 'en-ZA'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}
 