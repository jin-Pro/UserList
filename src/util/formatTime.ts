export default function formatDateToYYMMDDHHMM(isoString: string): string {
  const date = new Date(isoString);

  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // month는 0-based
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const MM = String(date.getMinutes()).padStart(2, '0');

  return `${yy}-${mm}-${dd} ${hh}:${MM}`;
}
